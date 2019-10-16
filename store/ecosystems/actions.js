import { createAction } from 'redux-actions'
import {
	CREATE_ECOSYSTEM_GROUP_REQUESTED,
	APPEND_NEW_SERVICE,
	CREATE_ECOSYSTEM_FAILURE,
	CREATE_ECOSYSTEM_REQUESTED,
	CREATE_ECOSYSTEM_SUCCESS,
	REMOVE_ECOSYSTEM_FAILURE,
	REMOVE_ECOSYSTEM_REQUESTED,
	REMOVE_ECOSYSTEM_SUCCESS,
	FETCHING_ECOSYSTEMS_FAILURE,
	FETCHING_ECOSYSTEMS_REQUESTED,
	FETCHING_ECOSYSTEMS_SUCCESS,
	SET_CURRENT_ECOSYSTEM,
	LOAD_ECOSYSTEM_REQUESTED,
	LOAD_ECOSYSTEM_SUCCESS,
	CREATE_ECOSYSTEM_GROUP_SUCCESS,
	CREATE_ECOSYSTEM_GROUP_FAILURE,
	REFRESH_ECOSYSTEM_REQUESTED,
	REFRESH_ECOSYSTEM_SUCCESS,
	FETCHING_NSP_FAILURE,
	FETCHING_NSP_SUCCESS,
	FETCHING_NSP_REQUESTED,
	CREATE_SERVICE_REQUESTED,
	CREATE_SERVICE_SUCCESS,
	CREATE_SERVICE_FAILURE
} from './action-types'

export function setCurrentEcosystem(ecosystem) {
	return {
		type: SET_CURRENT_ECOSYSTEM,
		payload: ecosystem
	}
}

export function fetchingEcosystemsStarted() {
	return {
		type: FETCHING_ECOSYSTEMS_REQUESTED
	}
}

export function fetchingEcosystemsSuccess(results) {
	return {
		type: FETCHING_ECOSYSTEMS_SUCCESS,
		payload: results
	}
}

export function fetchingEcosystemsFailure(err) {
	return {
		type: FETCHING_ECOSYSTEMS_FAILURE,
		payload: {
			message: err
		}
	}
}
export function createEcosystemStarted() {
	return {
		type: CREATE_ECOSYSTEM_REQUESTED
	}
}

export function createEcosystemSuccess(result) {
	return {
		type: CREATE_ECOSYSTEM_SUCCESS,
		payload: result
	}
}

export function createEcosystemFailed(err) {
	return {
		type: CREATE_ECOSYSTEM_FAILURE,
		payload: {
			message: err
		}
	}
}

export function removeEcosystemStarted() {
	return {
		type: REMOVE_ECOSYSTEM_REQUESTED
	}
}

export function removeEcosystemSuccess() {
	return {
		type: REMOVE_ECOSYSTEM_SUCCESS
	}
}

export function removeEcosystemFailed(err) {
	return {
		type: REMOVE_ECOSYSTEM_FAILURE,
		payload: {
			message: err
		}
	}
}

export function appendNewService(service, ecosystem) {
	return {
		type: APPEND_NEW_SERVICE,
		payload: {
			ecosystem,
			service
		}
	}
}

export function loadEcosystemStarted() {
	return {
		type: LOAD_ECOSYSTEM_REQUESTED
	}
}

export function loadEcosystemSuccess(data) {
	return {
		type: LOAD_ECOSYSTEM_SUCCESS,
		payload: data
	}
}

export function refreshEcosystemStarted() {
	return {
		type: REFRESH_ECOSYSTEM_REQUESTED
	}
}
export function refreshEcosystemSuccess(data) {
	return {
		type: REFRESH_ECOSYSTEM_SUCCESS,
		payload: data
	}
}

export const createEcosystemGroupRequested = createAction(
	CREATE_ECOSYSTEM_GROUP_REQUESTED
)

export const createEcosystemGroupSuccess = createAction(
	CREATE_ECOSYSTEM_GROUP_SUCCESS
)
export const createEcosystemGroupFailure = createAction(
	CREATE_ECOSYSTEM_GROUP_FAILURE
)
export const createServiceRequested = createAction(CREATE_SERVICE_REQUESTED)

export const createServiceSuccess = createAction(CREATE_SERVICE_SUCCESS)
export const createServiceFailure = createAction(CREATE_SERVICE_FAILURE)

export function fetchingNSPStarted() {
	return {
		type: FETCHING_NSP_REQUESTED
	}
}

export function fetchingNSPSuccess(results) {
	return {
		type: FETCHING_NSP_SUCCESS,
		payload: results
	}
}

export function fetchingNSPFailure(err) {
	return {
		type: FETCHING_NSP_FAILURE,
		payload: {
			message: err
		}
	}
}
