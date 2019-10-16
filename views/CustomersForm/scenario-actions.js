import history from '../../history'
import { setCustomer } from '../../store/auth/actions'
import Cookie from 'js-cookie'

export function useCustomer(customer, redirect) {
	return async dispatch => {
		const hasEcosystem = Cookie.get('currentEcosystem') !== undefined
		dispatch(setCustomer(customer))
		history.push(hasEcosystem ? redirect : '/')
	}
}
