import * as REST from '../api/rest'
import { clearData, logoutUser } from './auth/actions'
/*
import {
	fetchingEcosystemsStarted,
	fetchingEcosystemsSuccess,
	fetchingEcosystemsFailure
} from './ecosystems/actions'
*/
import { finishStartup } from './global/actions'
import { setError } from './user/actions'

export function startup() {
	return async dispatch => {
		/*if (getState().auth.isAuthenticated) {
			try {
				dispatch(fetchingEcosystemsStarted())
				const results = await REST.fetchEcosystems({
					customer: getState().auth.selectedCustomer
				})
				dispatch(fetchingEcosystemsSuccess(results))
			} catch (err) {
				dispatch(fetchingEcosystemsFailure(err))
			} finally {
				dispatch(finishStartup())
			}
		} else {
			dispatch(finishStartup())
		}*/
		dispatch(finishStartup())
	}
}

export function acceptCommit() {
	return async (dispatch, getState) => {
		try {
			return REST.acceptCommit({
				customer: getState().auth.selectedCustomer,
				ecosystem: getState().ecosystems.currentEcosystem
			})
		} catch (err) {
			// dispatch(fetchingEcosystemsFailure(err))
		}
	}
}

export function acceptRollback() {
	return async (dispatch, getState) => {
		try {
			await REST.acceptRollback({
				customer: getState().auth.selectedCustomer,
				ecosystem: getState().ecosystems.currentEcosystem
			})
		} catch (err) {
			// dispatch(fetchingEcosystemsFailure(err))
		}
	}
}

export function logout() {
	return async dispatch => {
		try {
			await REST.logout()
		} finally {
			dispatch(logoutUser())
			dispatch(setError('You have been logged out'))
			dispatch(clearData())
		}
	}
}
