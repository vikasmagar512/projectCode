import { CLEAR_DATA } from '../common-action-types'
import {
	FETCHING_REPORTS_SUCCESS,
	FETCHING_REPORTS_FAILURE
} from './action-types'
import orderBy from 'lodash/orderBy'

const initialState = {
	reports: {
		isLoading: true,
		items: [],
		success: true
	}
}

export function reportsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCHING_REPORTS_SUCCESS: {
			if (state.items && state.items.length > 200) {
				if (payload.append === 1) {
					state.items = state.items.slice(50)
				} else if (payload.append === -1) {
					state.items = state.items.slice(-1 * (state.items.length - 50))
				}
			}

			const items =
				payload.append !== 0
					? [...payload.results, ...state.items]
					: payload.results

			return {
				...state,
				items: orderBy(items, ['date'], ['desc']),
				isLoading: false,
				success: payload.success
			}
		}
		case FETCHING_REPORTS_FAILURE: {
			return {
				...state,
				isLoading: false,
				success: payload.success
			}
		}
		case CLEAR_DATA: {
			return initialState
		}
		default:
			return state
	}
}
