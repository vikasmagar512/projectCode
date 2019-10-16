import * as REST from '../api/rest'
import { toast } from 'react-toastify'
import {
	createEcosystemGroupRequested,
	createEcosystemGroupSuccess,
	createEcosystemGroupFailure,
	createServiceRequested,
	createServiceSuccess,
	createServiceFailure
} from './ecosystems/actions'

export function createGroup(name) {
	return async (dispatch, getState) => {
		try {
			dispatch(createEcosystemGroupRequested())
			const result = await REST.createGroup({
				customer: getState().auth.selectedCustomer,
				ecosystem: getState().ecosystems.currentEcosystem,
				name
			})
			dispatch(createEcosystemGroupSuccess(result))
		} catch (error) {
			if (error.response && error.response.data) {
				toast.error(error.response.data.message)
			} else {
				toast.error('Cannot create Group')
			}
			dispatch(createEcosystemGroupFailure(error))
		}
	}
}

export function createService(service) {
	return async (dispatch, getState) => {
		try {
			dispatch(createServiceRequested())
			const result = await REST.createService({
				customer: getState().auth.selectedCustomer,
				ecosystem: getState().ecosystems.currentEcosystem,
				service
			})
			dispatch(createServiceSuccess(result))
		} catch (error) {
			if (error.response && error.response.data) {
				toast.error(error.response.data.message)
			} else {
				toast.error('Cannot create Service')
			}
			dispatch(createServiceFailure(error))
		}
	}
}
