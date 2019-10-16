import { createAction } from 'redux-actions'

import {
	FETCHING_OBJECT_FAILURE,
	FETCHING_OBJECT_REQUESTED,
	FETCHING_OBJECT_SUCCESS,
	FETCHING_ADDRESS_FAILURE,
	FETCHING_ADDRESS_REQUESTED,
	FETCHING_ADDRESS_SUCCESS,
	CREATION_OBJECT_FAILURE,
	CREATION_OBJECT_REQUESTED,
	CREATION_OBJECT_SUCCESS,
	UPDATE_OBJECT_REQUESTED,
	UPDATE_OBJECT_SUCCESS,
	UPDATE_OBJECT_FAILURE,
	DELETE_OBJECT_REQUESTED,
	DELETE_OBJECT_SUCCESS,
	DELETE_OBJECT_FAILURE,
	DOWNLOAD_CONFIG_REQUESTED,
	DOWNLOAD_CONFIG_SUCCESS,
	DOWNLOAD_CONFIG_FAILURE,
	GET_THING_TOKEN,
	GET_GATEWAY_TOKEN
} from './action-types'

export function fetchingObjectsStarted() {
	return {
		type: FETCHING_OBJECT_REQUESTED,
		payload: {
			isLoading: true
		}
	}
}

export function fetchingObjectsSuccess(results, ecosystem) {
	return {
		type: FETCHING_OBJECT_SUCCESS,
		payload: {
			results,
			ecosystem,
			success: true,
			isLoading: false
		}
	}
}

export function fetchingObjectsFailed(err) {
	return {
		type: FETCHING_OBJECT_FAILURE,
		payload: {
			message: err,
			success: false,
			isLoading: false
		}
	}
}

export function fetchingAddressStarted() {
	return {
		type: FETCHING_ADDRESS_REQUESTED
	}
}

export function fetchingAddressSuccess(results) {
	return {
		type: FETCHING_ADDRESS_SUCCESS,
		payload: {
			results
		}
	}
}

export function fetchingAddressFailed(err) {
	return {
		type: FETCHING_ADDRESS_FAILURE,
		payload: {
			message: err
		}
	}
}

export function creationObjectStarted() {
	return {
		type: CREATION_OBJECT_REQUESTED,
		payload: {
			message: ''
		}
	}
}

export function creationObjectSuccess(result, ecosystem) {
	return {
		type: CREATION_OBJECT_SUCCESS,
		payload: {
			result,
			ecosystem
		}
	}
}

export function creationObjectFailed(err) {
	return {
		type: CREATION_OBJECT_FAILURE,
		payload: {
			message: err,
			isLoading: false
		}
	}
}

export function updateObjectStarted() {
	return {
		type: UPDATE_OBJECT_REQUESTED
	}
}

export function updateObjectSuccess(result, ecosystem) {
	return {
		type: UPDATE_OBJECT_SUCCESS,
		payload: {
			result,
			ecosystem
		}
	}
}

export function updateObjectFailed(err) {
	return {
		type: UPDATE_OBJECT_FAILURE,
		payload: {
			message: err
		}
	}
}

export function deleteObjectStarted() {
	return {
		type: DELETE_OBJECT_REQUESTED
	}
}

export function deleteObjectSuccess() {
	return {
		type: DELETE_OBJECT_SUCCESS
	}
}

export function deleteObjectFailed(err) {
	return {
		type: DELETE_OBJECT_FAILURE,
		payload: {
			message: err
		}
	}
}

export function downloadConfStarted() {
	return {
		type: DOWNLOAD_CONFIG_REQUESTED
	}
}

export function downloadConfSuccess(link = '') {
	return {
		type: DOWNLOAD_CONFIG_SUCCESS,
		payload: {
			link
		}
	}
}

export function downloadConfFailed(err) {
	return {
		type: DOWNLOAD_CONFIG_FAILURE,
		payload: {
			message: err
		}
	}
}

export const getThingToken = createAction(GET_THING_TOKEN)
export const getGatewayToekn = createAction(GET_GATEWAY_TOKEN)
