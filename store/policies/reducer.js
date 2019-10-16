import { CLEAR_DATA } from '../common-action-types'
import {
	CREATION_POLICY_SUCCESS,
	FETCHING_POLICIES_SUCCESS,
	UPDATE_POLICY_SUCCESS
} from './action-types'

const initialState = {}

export function policyReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCHING_POLICIES_SUCCESS: {
			return {
				...state,
				[payload.ecosystem.uuid]: {
					...state[payload.ecosystem.uuid],
					policies: payload.results
				}
			}
		}
		case CREATION_POLICY_SUCCESS: {
			return {
				...state,
				[payload.ecosystem.uuid]: {
					...state[payload.ecosystem.uuid],
					policies: [payload.result, ...state[payload.ecosystem.uuid].policies]
				}
			}
		}
		case UPDATE_POLICY_SUCCESS: {
			return {
				...state,
				[payload.ecosystem.uuid]: {
					...state[payload.ecosystem.uuid],
					policies: state[payload.ecosystem.uuid].policies.map(ob =>
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
