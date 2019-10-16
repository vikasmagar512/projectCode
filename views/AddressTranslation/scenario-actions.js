import * as REST from '../../api/rest'
import { appendNewService } from '../../store/ecosystems/actions'

import {
	fetchingAddressFailed,
	fetchingAddressStarted,
	fetchingAddressSuccess
} from '../../store/objects/actions'
import {
	creationDNATFailed,
	creationDNATStarted,
	creationDNATSuccess,
	deleteDNATFailed,
	deleteDNATStarted,
	deleteDNATSuccess,
	fetchingDNATsFailed,
	fetchingDNATsStarted,
	fetchingDNATsSuccess,
	reorderDNATFailed,
	reorderDNATStarted,
	reorderDNATSuccess,
	updateDNATFailed,
	updateDNATStarted,
	updateDNATSuccess
} from '../../store/dNATs/actions'

export function fetchDNATs() {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			dispatch(fetchingDNATsStarted())
			const policies = await REST.fetchDNATs({
				customer: getState().auth.selectedCustomer,
				ecosystem
			})
			dispatch(fetchingDNATsSuccess(policies, ecosystem))
		} catch (err) {
			dispatch(fetchingDNATsFailed(err))
		}
	}
}

export function createDNAT(DNAT) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			dispatch(creationDNATStarted())
			const createdPolicy = await REST.createDNAT({
				entity: DNAT,
				ecosystem,
				customer: getState().auth.selectedCustomer
			})
			dispatch(creationDNATSuccess(createdPolicy, ecosystem))
		} catch (err) {
			dispatch(creationDNATFailed(err))
		}
	}
}

export function updateDNAT(entity, uuid) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			dispatch(updateDNATStarted())
			const policy = await REST.updateDNAT({
				entity,
				uuid,
				ecosystem,
				customer: getState().auth.selectedCustomer
			})
			dispatch(updateDNATSuccess(policy, ecosystem))
		} catch (err) {
			dispatch(updateDNATFailed(err))
		}
	}
}

export function createService(service) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			// dispatch(updateObjectStarted())
			const createdService = await REST.createService(service, ecosystem)
			dispatch(appendNewService(createdService, ecosystem))
		} catch (err) {
			// dispatch(updateObjectFailed(err))
		}
	}
}

export function fetchAddress() {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			dispatch(fetchingAddressStarted())
			const address = await REST.fetchObjects({
				customer: getState().auth.selectedCustomer,
				ecosystem: ecosystem.uuid,
				type: 'address'
			})
			dispatch(fetchingAddressSuccess(address))
		} catch (err) {
			dispatch(fetchingAddressFailed(err))
		}
	}
}

export function deleteDNAT(entity) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			const customer = getState().auth.selectedCustomer
			dispatch(deleteDNATStarted())
			await REST.deleteDNAT({
				policy: entity,
				ecosystem: ecosystem.uuid,
				customer: customer.uuid
			})
			dispatch(deleteDNATSuccess())
		} catch (err) {
			dispatch(deleteDNATFailed(err))
		}
	}
}

export function reorderDNAT(policy, after) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			const customer = getState().auth.selectedCustomer
			dispatch(reorderDNATStarted())
			await REST.reorderPolicy({
				policy: policy,
				after: after,
				ecosystem: ecosystem.uuid,
				customer: customer.uuid
			})
			dispatch(reorderDNATSuccess())
		} catch (err) {
			dispatch(reorderDNATFailed(err))
		}
	}
}
