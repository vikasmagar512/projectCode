import { CLEAR_DATA } from '../common-action-types'
import {
	CREATION_OBJECT_SUCCESS,
	FETCHING_OBJECT_SUCCESS,
	FETCHING_OBJECT_FAILURE,
	FETCHING_ADDRESS_SUCCESS,
	UPDATE_OBJECT_SUCCESS,
	DOWNLOAD_CONFIG_SUCCESS,
	CREATION_OBJECT_FAILURE,
	UPDATE_OBJECT_FAILURE
} from './action-types'

const initialState = {
	isLoading: true,
	success: true,
	configLink: ''
}

export function objectsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCHING_OBJECT_SUCCESS: {
			return {
				...state,
				[payload.ecosystem.uuid]: {
					...state[payload.ecosystem.uuid],
					objects: payload.results
				},
				isLoading: payload.isLoading,
				success: payload.success
			}
		}
		case FETCHING_OBJECT_FAILURE: {
			return {
				...state,
				isLoading: payload.isLoading,
				success: payload.success
			}
		}
		case FETCHING_ADDRESS_SUCCESS: {
			return {
				...state,
				address: payload.results
			}
		}
		case DOWNLOAD_CONFIG_SUCCESS: {
			return {
				...state,
				configLink: payload.link
			}
		}
		case CREATION_OBJECT_SUCCESS: {
			return {
				...state,
				[payload.ecosystem.uuid]: {
					...state[payload.ecosystem.uuid],
					objects: [payload.result, ...state[payload.ecosystem.uuid].objects]
				}
			}
		}
		case CREATION_OBJECT_FAILURE: {
			return {
				...state,
				isLoading: payload.isLoading
			}
		}
		case UPDATE_OBJECT_FAILURE: {
			return {
				...state,
				isLoading: payload.isLoading
			}
		}
		case UPDATE_OBJECT_SUCCESS: {
			return {
				...state,
				[payload.ecosystem.uuid]: {
					...state[payload.ecosystem.uuid],
					objects: state[payload.ecosystem.uuid].objects.map(ob =>
						ob.uuid === payload.result.uuid ? payload.result : ob
					)
				}
			}
		}
		case CLEAR_DATA: {
			return initialState
		}
		default:
			return state
	}
}
