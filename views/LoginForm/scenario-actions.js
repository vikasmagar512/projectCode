import * as REST from '../../api/rest'
import history from '../../history'
import {
	loginFailed,
	loginStarted,
	loginSuccess
} from '../../store/auth/actions'
import { readUserData } from '../../store/sagas/apiCalls'
import { setUser } from '../../store/user/actions'
import { extractCustomer, parseResponseError } from '../../utils/utils'

export function login(credentials, redirect) {
	return async dispatch => {
		try {
			dispatch(loginStarted())
			const result = await REST.login({
				username: credentials.email,
				password: credentials.password
			})
			dispatch(
				loginSuccess({
					accessToken: result.accessToken,
					customers: extractCustomer(result.customers)
				})
			)
			const { data } = await readUserData(credentials.email)
			dispatch(setUser(data))

			history.push('/auth/customers', {
				from: redirect,
				afterLogin: true
			})
		} catch (err) {
			const errorMessage = parseResponseError(err, {
				400: 'Your email or password is incorrect!'
			})
			dispatch(loginFailed({ message: errorMessage }))
		}
	}
}

export function eulaAccepted(redirect) {
	localStorage.setItem('eulaAccepted', 'true')
	return async () => {
		history.push('/auth/customers', {
			from: redirect,
			afterLogin: true
		})
	}
}

export const removeAuthError = () => dispatch => {
	dispatch(loginFailed({ message: '' }))
}
