import {
	createResponseErrorMessage,
	extractResponseErrorStatus
} from '../../utils/responseErrorHandler'
import * as REST from '../../api/rest'
import { updateUserCall, updatePasswordCall } from '../../store/sagas/apiCalls'
import {
	fecthCustomerStarted,
	fetchCustomerSuccess,
	fetchCustomerFailed
} from '../../store/customers/actions'
import {
	updateUser,
	startLoading,
	finishLoading,
	setError
} from '../../store/user/actions'
import history from '../../history'

export function fecthCustomerDetail() {
	return async (dispatch, getState) => {
		try {
			const { uuid } = getState().auth.selectedCustomer
			dispatch(fecthCustomerStarted())
			const customer = await REST.fecthCustomerDetail({ customer: uuid })
			dispatch(fetchCustomerSuccess(customer))
		} catch (error) {
			dispatch(fetchCustomerFailed(error))
		}
	}
}

export const updateUserProfile = ({
	email,
	firstName,
	lastName,
	mobilePhone,
	avatar,
	redirect
}) => async dispatch => {
	dispatch(startLoading())
	try {
		const result = await updateUserCall({
			email,
			firstName,
			lastName,
			mobilePhone,
			avatar
		})
		dispatch(updateUser(result))
		history.replace(redirect)
	} catch (error) {
		const status = extractResponseErrorStatus(error)
		const specificErrorHandler = {
			400: 'Wrong payload',
			401: 'Token Is Required!',
			403: 'You Don`t Have Permission To Provide This Operation',
			404: 'User Not Found!',
			default: 'Internal Server Error'
		}
		const errorMessage = createResponseErrorMessage({
			status,
			specificErrorHandler
		})
		dispatch(setError(errorMessage))
	} finally {
		dispatch(finishLoading())
	}
}

export const updateUserPassword = ({
	email,
	password,
	newPassword
}) => async dispatch => {
	dispatch(startLoading())
	try {
		await updatePasswordCall({ email, password, newPassword })
	} catch (error) {
		const status = extractResponseErrorStatus(error)
		const specificErrorHandler = {
			400: 'Wrong payload',
			401: 'Token Is Required!',
			403: 'You Don`t Have Permission To Provide This Operation',
			404: 'User Not Found!',
			default: 'Internal Server Error'
		}
		const errorMessage = createResponseErrorMessage({
			status,
			specificErrorHandler
		})
		dispatch(setError(errorMessage))
	} finally {
		dispatch(finishLoading())
	}
}
