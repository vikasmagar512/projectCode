import { call, put, select } from 'redux-saga/effects'
import get from 'lodash/fp/get'

import {
	startLoading,
	finishLoading,
	setInitCompanyName,
	setError
} from '../user/actions'
import history from '../../history'
import { registerPasswordCall, loginUserCall, updateUserCall } from './apiCalls'
import {
	extractResponseErrorStatus,
	createResponseErrorMessage
} from '../../utils/responseErrorHandler'

function* completeUserSaga({ payload }) {
	yield put(startLoading())
	const {
		firstName,
		lastName,
		mobilePhone,
		organisationName,
		password
	} = payload
	const {
		user: { email }
	} = yield select()
	try {
		yield call(() =>
			registerPassword({
				email,
				password
			})
		)
		const responseAfterLogin = yield call(() =>
			loginUser({
				username: email,
				password
			})
		)
		const token = get(['data', 'accessToken'], responseAfterLogin)
		localStorage.setItem('wedge_access_token', token)
		yield call(() =>
			updateUserCall({
				mobilePhone,
				firstName,
				lastName,
				email
			})
		)
		yield put(setInitCompanyName(organisationName))
		history.replace('/auth/sign-up/billing')
	} catch (err) {
		yield put(setError(err))
	} finally {
		yield put(finishLoading())
	}
}

export default completeUserSaga

export function* registerPassword({ email, password }) {
	try {
		const response = yield call(() => registerPasswordCall({ email, password }))
		return response
	} catch (error) {
		const status = extractResponseErrorStatus(error)
		const specificErrorHandler = {
			400: 'Wrong payload',
			401: 'Token Is Required!',
			403: 'You Don`t Have Permission To Provide This Operation',
			404: 'User Not Found!',
			default: 'Error While Registering Password!'
		}
		const errorMessage = createResponseErrorMessage({
			specificErrorHandler,
			status
		})
		yield call(() => {
			throw errorMessage
		})
	}
}

export function* loginUser({ username, password }) {
	try {
		const response = yield call(() => loginUserCall({ username, password }))
		return response
	} catch (error) {
		const status = extractResponseErrorStatus(error)
		const specificErrorHandler = {
			400: 'Wrong payload',
			401: 'Token Is Required!',
			403: 'You Don`t Have Permission To Provide This Operation',
			404: 'User Not Found!',
			default: 'Error While Registering Password!'
		}
		const errorMessage = createResponseErrorMessage({
			specificErrorHandler,
			status
		})
		yield call(() => {
			throw errorMessage
		})
	}
}

export function* updateUser({ email, firstName, lastName, mobilePhone }) {
	try {
		yield call(() =>
			updateUserCall({ email, firstName, lastName, mobilePhone })
		)
	} catch (error) {
		const status = extractResponseErrorStatus(error)
		const specificErrorHandler = {
			400: 'Wrong payload',
			401: 'Token Is Required!',
			403: 'You Don`t Have Permission To Provide This Operation',
			404: 'User Not Found!',
			default: 'Error While Registering Password!'
		}
		const errorMessage = createResponseErrorMessage({
			specificErrorHandler,
			status
		})
		yield call(() => {
			throw errorMessage
		})
	}
}
