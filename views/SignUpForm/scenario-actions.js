import {
	createResponseErrorMessage,
	extractResponseErrorStatus
} from '../../utils/responseErrorHandler'
import { createUser, readUserData } from '../../store/sagas/apiCalls'
import { LOCAL_ACCESS_TOKEN_KEY } from '../../enums'
import {
	startLoading,
	finishLoading,
	setError,
	setEmail,
	setUser,
	confirmEmail
} from '../../store/user/actions'
import history from '../../history'

export const registerEmail = ({ email, password }) => async dispatch => {
	dispatch(startLoading())
	try {
		await createUser({ email, password })
		dispatch(setEmail(email))
		history.replace('/auth/sign-up/email-entered')
	} catch (error) {
		const status = extractResponseErrorStatus(error)
		const specificErrorHandler = {
			409: 'This email is already taken!',
			400: 'Wrong payload, missing email!',
			default: 'Error while registering email!'
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

export const checkIfTheTokenIsValid = ({
	token,
	username
}) => async dispatch => {
	dispatch(startLoading())
	try {
		localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, token)
		const { data } = await readUserData(username)
		dispatch(setUser(data))
		dispatch(confirmEmail())
		if (data.firstName) {
			history.replace('/')
		} else {
			history.replace('/auth/sign-up/personal-info')
		}
	} catch (error) {
		const status = extractResponseErrorStatus(error)
		const specificErrorHandler = {
			403: 'Incorrect link!',
			401: `Your token has expired. We've sent you a new email.`,
			400: 'Wrong payload, missing username',
			404: 'User not found',
			default: 'Error while confirming email!'
		}
		const errorMessage = createResponseErrorMessage({
			specificErrorHandler,
			status
		})
		dispatch(setError(errorMessage))
	} finally {
		dispatch(finishLoading())
	}
}

export const removeAuthError = () => dispatch => {
	dispatch(setError(''))
}
