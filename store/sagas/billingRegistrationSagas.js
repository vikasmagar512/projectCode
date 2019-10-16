/* eslint-disable no-throw-literal */
import { call, put, select } from 'redux-saga/effects'
import get from 'lodash/get'
import CountryList from 'country-list'

import { setStripeError, setContractIdError } from '../payment/actions'
import { PAYMENT } from '../../constants/reducersNames'
import { STRIPE } from '../payment/propertiesNames'
import { startLoading, finishLoading, setError } from '../user/actions'
import { createCustomer, patchBilling } from './apiCalls'
import history from '../../history'
import {
	extractResponseErrorStatus,
	createResponseErrorMessage
} from '../../utils/responseErrorHandler'
import {
	loginSuccess,
	setCustomer,
	clearData,
	logoutUser
} from '../auth/actions'
import * as REST from '../../api/rest'
import { LOCAL_ACCESS_TOKEN_KEY } from '../../enums'

const stripeInSagaSelector = state => {
	const stripeInstance = get(state, [PAYMENT, STRIPE])
	return stripeInstance
}

const customerSelector = state => {
	const customers = get(state, ['auth', 'customers'])
	return customers
}

export function* stripeSourceSaga({ payload: userData }) {
	yield put(startLoading())
	yield put(setStripeError(''))
	try {
		const responseAfterCallingStripeApi = yield call(
			createStripeSource,
			userData
		)
		const { source: userDataVerifiedByStripe } = responseAfterCallingStripeApi
		const responseAfterRegisteringStripeSource = yield call(
			registerStripeSource,
			userDataVerifiedByStripe
		)
		const { data: customer } = responseAfterRegisteringStripeSource
		yield call(finishRegistrationProcedure, customer)
	} catch (error) {
		if (typeof error === 'string') {
			yield put(setStripeError(error))
		} else {
			const errorStatus = extractResponseErrorStatus(error)
			const errorMessage = createResponseErrorMessage({
				specificErrorHandler: {
					default: 'Error while generating Stripe Source Id'
				},
				status: errorStatus
			})
			yield put(setStripeError(errorMessage))
		}
	} finally {
		yield put(finishLoading())
	}
}

export function* updateBillingSaga({ payload: userData }) {
	yield put(startLoading())
	try {
		const responseAfterCallingStripeApi = yield call(
			createStripeSource,
			userData.billingInfo
		)
		const { source: userDataVerifiedByStripe } = responseAfterCallingStripeApi
		userDataVerifiedByStripe.customerUUID = userData.customerUUID
		yield call(patchBillingInfo, userDataVerifiedByStripe)
		history.replace(userData.redirect)
	} catch (error) {
		if (typeof error === 'string') {
			yield put(setStripeError(error))
		} else {
			const errorStatus = extractResponseErrorStatus(error)
			const errorMessage = createResponseErrorMessage({
				specificErrorHandler: {
					default: 'Error while generating Stripe Source Id'
				},
				status: errorStatus
			})
			yield put(setStripeError(errorMessage))
		}
	} finally {
		yield put(finishLoading())
	}
}

export function* createStripeSource(userData) {
	const stripe = yield select(stripeInSagaSelector)
	const response = yield stripe.createSource(userData)
	const { error } = response
	if (error) {
		const { message } = error
		yield call(() => {
			throw message
		})
	}
	return response
}

export function* registerStripeSource(userData) {
	//ATTENTION!! With payment_channel I specify,
	// if the Stripe Source Id or Contract Id is provided
	// as payment_ref
	const payment_channel = STRIPE
	const {
		id: payment_ref,
		owner: { name, address }
	} = userData
	const countryName = address.country
	address.country = CountryList.getCode(countryName).toLowerCase()
	address.line2 = 'test line'
	try {
		const requestBody = {
			payment_channel,
			payment_ref,
			name,
			address
		}
		const response = yield call(createCustomer, requestBody)
		return response
	} catch (error) {
		const message =
			error.response.data.message || 'Error While Creating Customer'
		throw message
	}
}

export function* patchBillingInfo(userData) {
	const payment_channel = STRIPE
	const { id: payment_ref } = userData

	try {
		const requestBody = {
			payment_channel,
			payment_ref
		}
		const response = yield call(patchBilling, {
			requestBody,
			customerUUID: userData.customerUUID
		})
		return response
	} catch (error) {
		const message = error.message || 'Error While Update Billing'
		throw message
	}
}

export function* contractIdSaga({ payload: companyData }) {
	yield put(startLoading())
	try {
		const { data: customer } = yield call(createCustomer, companyData)
		yield call(finishRegistrationProcedure, customer)
	} catch (error) {
		const { field } = error
		const errorStatus = extractResponseErrorStatus(error)
		const errorMessage = field
			? `Invalid Data Passed As "${field}"`
			: createResponseErrorMessage({
					specificErrorHandler: {
						default: 'Error while generating Stripe Source Id'
					},
					status: errorStatus
			  })
		yield put(setContractIdError(errorMessage))
	} finally {
		yield put(finishLoading())
	}
}

export function* finishRegistrationProcedure(customer) {
	const customers = yield select(customerSelector)

	if (customers && customers.length) {
		yield REST.logout()
		yield put(logoutUser())
		yield put(setError('Please login again to access your new organization'))
		yield put(clearData())
		history.replace('/auth/login')
	} else {
		const accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)
		yield put(setCustomer(customer))
		yield put(
			loginSuccess({
				accessToken,
				customers: [customer]
			})
		)
		history.replace({ pathname: '/', state: { openEcosystemDialog: true } })
	}
}
