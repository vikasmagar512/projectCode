import { CLEAR_DATA } from '../common-action-types'
import {
	CREATION_DNAT_SUCCESS,
	FETCHING_DNATS_SUCCESS,
	UPDATE_DNAT_SUCCESS
} from './action-types'

const initialState = {}

export function DNATsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCHING_DNATS_SUCCESS: {
			return {
				...state,
				[payload.ecosystem.uuid]: {
					...state[payload.ecosystem.uuid],
					DNATs: payload.results
				}
			}
		}
		case CREATION_DNAT_SUCCESS: {
			return {
				...state,
				[payload.ecosystem.uuid]: {
					...state[payload.ecosystem.uuid],
					DNATs: [payload.result, ...state[payload.ecosystem.uuid].DNATs]
				}
			}
		}
		case UPDATE_DNAT_SUCCESS: {
			return {
				...state,
				[payload.ecosystem.uuid]: {
					...state[payload.ecosystem.uuid],
					DNATs: state[payload.ecosystem.uuid].DNATs.map(ob =>
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
