import { FETCH_CUSTOMER_SUCCESS } from './action-types'

const initialState = {
	currentCustomer: {
		name: ''
	}
}

export function customersReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_CUSTOMER_SUCCESS:
			return {
				...state,
				currentCustomer: payload
			}
		default:
			return {
				...state
			}
	}
}
