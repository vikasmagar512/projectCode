import * as REST from '../../api/rest'
import {
	creationPolicyFailed,
	creationPolicyStarted,
	creationPolicySuccess,
	fetchingPoliciesFailed,
	fetchingPoliciesStarted,
	fetchingPoliciesSuccess,
	updatePolicyFailed,
	updatePolicyStarted,
	updatePolicySuccess,
	deletePolicyFailed,
	deletePolicyStarted,
	deletePolicySuccess,
	reorderPolicyFailed,
	reorderPolicyStarted,
	reorderPolicySuccess
} from '../../store/policies/actions'
import {
	fetchingAddressFailed,
	fetchingAddressStarted,
	fetchingAddressSuccess
} from '../../store/objects/actions'

export function fetchPolicies() {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			dispatch(fetchingPoliciesStarted())
			const policies = await REST.fetchPolicies({
				customer: getState().auth.selectedCustomer,
				ecosystem
			})
			dispatch(fetchingPoliciesSuccess(policies, ecosystem))
		} catch (err) {
			dispatch(fetchingPoliciesFailed(err))
		}
	}
}

export function createPolicy(policy) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			dispatch(creationPolicyStarted())
			const createdPolicy = await REST.createPolicy({
				entity: policy,
				ecosystem,
				customer: getState().auth.selectedCustomer
			})
			dispatch(creationPolicySuccess(createdPolicy, ecosystem))
		} catch (err) {
			dispatch(creationPolicyFailed(err))
		}
	}
}

export function updatePolicy(entity, uuid) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			dispatch(updatePolicyStarted())
			const policy = await REST.updatePolicy({
				entity,
				uuid,
				ecosystem,
				customer: getState().auth.selectedCustomer
			})
			dispatch(updatePolicySuccess(policy, ecosystem))
		} catch (err) {
			dispatch(updatePolicyFailed(err))
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

export function deletePolicy(entity) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			const customer = getState().auth.selectedCustomer
			dispatch(deletePolicyStarted())
			await REST.deletePolicy({
				policy: entity,
				ecosystem: ecosystem.uuid,
				customer: customer.uuid
			})
			dispatch(deletePolicySuccess())
		} catch (err) {
			dispatch(deletePolicyFailed(err))
		}
	}
}

export function reorderPolicy(policy, after) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			const customer = getState().auth.selectedCustomer
			dispatch(reorderPolicyStarted())
			await REST.reorderPolicy({
				policy: policy,
				after: after,
				ecosystem: ecosystem.uuid,
				customer: customer.uuid
			})
			dispatch(reorderPolicySuccess())
		} catch (err) {
			dispatch(reorderPolicyFailed(err))
		}
	}
}
