import {
	FETCHING_DNATS_FAILURE,
	FETCHING_DNATS_REQUESTED,
	FETCHING_DNATS_SUCCESS,
	CREATION_DNAT_FAILURE,
	CREATION_DNAT_REQUESTED,
	CREATION_DNAT_SUCCESS,
	UPDATE_DNAT_REQUESTED,
	UPDATE_DNAT_SUCCESS,
	UPDATE_DNAT_FAILURE,
	DELETE_DNAT_REQUESTED,
	DELETE_DNAT_SUCCESS,
	DELETE_DNAT_FAILURE,
	REORDER_DNAT_REQUESTED,
	REORDER_DNAT_SUCCESS,
	REORDER_DNAT_FAILURE
} from './action-types'

export function fetchingDNATsStarted() {
	return {
		type: FETCHING_DNATS_REQUESTED
	}
}

export function fetchingDNATsSuccess(results, ecosystem) {
	return {
		type: FETCHING_DNATS_SUCCESS,
		payload: {
			results,
			ecosystem
		}
	}
}

export function fetchingDNATsFailed(err) {
	return {
		type: FETCHING_DNATS_FAILURE,
		payload: {
			message: err
		}
	}
}

export function creationDNATStarted() {
	return {
		type: CREATION_DNAT_REQUESTED
	}
}

export function creationDNATSuccess(result, ecosystem) {
	return {
		type: CREATION_DNAT_SUCCESS,
		payload: {
			result,
			ecosystem
		}
	}
}

export function creationDNATFailed(err) {
	return {
		type: CREATION_DNAT_FAILURE,
		payload: {
			message: err
		}
	}
}

export function updateDNATStarted() {
	return {
		type: UPDATE_DNAT_REQUESTED
	}
}

export function updateDNATSuccess(result, ecosystem) {
	return {
		type: UPDATE_DNAT_SUCCESS,
		payload: {
			result,
			ecosystem
		}
	}
}

export function updateDNATFailed(err) {
	return {
		type: UPDATE_DNAT_FAILURE,
		payload: {
			message: err
		}
	}
}

export function deleteDNATStarted() {
	return {
		type: DELETE_DNAT_REQUESTED
	}
}

export function deleteDNATSuccess() {
	return {
		type: DELETE_DNAT_SUCCESS
	}
}

export function deleteDNATFailed(err) {
	return {
		type: DELETE_DNAT_FAILURE,
		payload: {
			message: err
		}
	}
}

export function reorderDNATStarted() {
	return {
		type: REORDER_DNAT_REQUESTED
	}
}

export function reorderDNATSuccess() {
	return {
		type: REORDER_DNAT_SUCCESS
	}
}

export function reorderDNATFailed(err) {
	return {
		type: REORDER_DNAT_FAILURE,
		payload: {
			message: err
		}
	}
}
