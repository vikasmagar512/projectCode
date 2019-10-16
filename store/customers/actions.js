import {
	FETCH_CUSTOMER_REQUEST,
	FETCH_CUSTOMER_SUCCESS,
	FETCH_CUSTOMER_FAILURE
} from './action-types'

export function fecthCustomerStarted() {
	return {
		type: FETCH_CUSTOMER_REQUEST
	}
}

export function fetchCustomerSuccess(result) {
	return {
		type: FETCH_CUSTOMER_SUCCESS,
		payload: result
	}
}

export function fetchCustomerFailed(error) {
	return {
		type: FETCH_CUSTOMER_FAILURE,
		payload: {
			message: error
		}
	}
}
