import * as REST from '../../api/rest'
import history from '../../history'
import Cookie from 'js-cookie'
import { toast } from 'react-toastify'
import {
	createEcosystemFailed,
	createEcosystemStarted,
	createEcosystemSuccess,
	removeEcosystemStarted,
	removeEcosystemSuccess,
	removeEcosystemFailed,
	fetchingEcosystemsFailure,
	fetchingEcosystemsStarted,
	fetchingEcosystemsSuccess,
	fetchingNSPFailure,
	fetchingNSPStarted,
	fetchingNSPSuccess,
	setCurrentEcosystem
} from '../../store/ecosystems/actions'

export function fetchEcosystems() {
	return async (dispatch, getState) => {
		try {
			dispatch(fetchingEcosystemsStarted())
			const results = await REST.fetchEcosystems({
				customer: getState().auth.selectedCustomer
			})
			dispatch(fetchingEcosystemsSuccess(results))
		} catch (err) {
			dispatch(fetchingEcosystemsFailure(err))
		}
	}
}
export function openEcosystem(ecosystem) {
	return dispatch => {
		dispatch(setCurrentEcosystem(ecosystem))
		Cookie.set('currentEcosystem', ecosystem)
		history.push(`/ecosystems/${ecosystem.uuid}/objects`) // TO BE CHANGED later
	}
}
export function removeCurrent() {
	return dispatch => {
		dispatch(setCurrentEcosystem())
		Cookie.remove('currentEcosystem')
	}
}
export function removeEcosystem(ecosystem) {
	return async (dispatch, getState) => {
		try {
			dispatch(removeEcosystemStarted())
			await REST.removeEcosystem({
				ecosystem,
				customer: getState().auth.selectedCustomer.uuid
			})
			dispatch(removeEcosystemSuccess())
		} catch (err) {
			dispatch(removeEcosystemFailed(err))
		}
	}
}
export function createEcosystem(ecosystem) {
	return async (dispatch, getState) => {
		try {
			dispatch(createEcosystemStarted())
			const results = await REST.createEcosystem({
				entity: ecosystem,
				customer: getState().auth.selectedCustomer
			})
			dispatch(createEcosystemSuccess(results))
		} catch (err) {
			dispatch(createEcosystemFailed(err))
			toast.error(err.response.data.message)
		}
	}
}

export function fetchNSPs() {
	return async dispatch => {
		try {
			dispatch(fetchingNSPStarted())
			const results = await REST.fetchNSPs()
			dispatch(fetchingNSPSuccess(results))
		} catch (err) {
			dispatch(fetchingNSPFailure(err))
		}
	}
}
