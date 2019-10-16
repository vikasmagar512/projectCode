import Cookie from 'js-cookie'
import sortBy from 'lodash/sortBy'
import { CLEAR_DATA } from '../common-action-types'
import {
	APPEND_NEW_SERVICE,
	CREATE_ECOSYSTEM_SUCCESS,
	FETCHING_ECOSYSTEMS_SUCCESS,
	SET_CURRENT_ECOSYSTEM,
	LOAD_ECOSYSTEM_SUCCESS,
	CREATE_ECOSYSTEM_GROUP_SUCCESS,
	REFRESH_ECOSYSTEM_SUCCESS,
	FETCHING_NSP_SUCCESS,
	CREATE_SERVICE_SUCCESS
} from './action-types'

const initialState = {
	items: [],
	currentEcosystem: Cookie.get('currentEcosystem')
		? JSON.parse(Cookie.get('currentEcosystem'))
		: null,
	dictionaries: {
		groups: [],
		nsps: [
			/*{
				name: 'EWR1',
				status: 'green'
			},
			{
				name: 'EWR2',
				status: 'yellow'
			},
			{
				name: 'EWR3',
				status: 'red'
			}*/
		],
		applications: [],
		services: []
	}
}

export function ecosystemsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case FETCHING_ECOSYSTEMS_SUCCESS: {
			return {
				...state,
				items: sortBy(payload, eco => eco.name)
			}
		}
		case FETCHING_NSP_SUCCESS: {
			return {
				...state,
				dictionaries: {
					...state.dictionaries,
					nsps: payload
				}
			}
		}
		case CREATE_ECOSYSTEM_SUCCESS: {
			return {
				...state,
				items: sortBy([payload, ...state.items], eco => eco.name)
			}
		}
		case SET_CURRENT_ECOSYSTEM: {
			return {
				...state,
				currentEcosystem: payload
			}
		}
		case REFRESH_ECOSYSTEM_SUCCESS: {
			return {
				...state,
				currentEcosystem: {
					...state.currentEcosystem,
					status: payload.ecoSystem.status
				}
			}
		}
		case APPEND_NEW_SERVICE: {
			return {
				...state,
				dictionaries: {
					...state.dictionaries,
					services: [...state.dictionaries.services, payload.service]
				}
			}
		}
		case CLEAR_DATA: {
			Cookie.remove('currentEcosystem')
			return initialState
		}
		case LOAD_ECOSYSTEM_SUCCESS: {
			return {
				...state,
				dictionaries: {
					...state.dictionaries,
					groups: payload.groups,
					applications: payload.applications,
					services: payload.services,
					nsps: payload.nsps
				}
			}
		}
		case CREATE_ECOSYSTEM_GROUP_SUCCESS: {
			return {
				...state,
				dictionaries: {
					...state.dictionaries,
					groups: [...state.dictionaries.groups, payload]
				}
			}
		}
		case CREATE_SERVICE_SUCCESS: {
			return {
				...state,
				dictionaries: {
					...state.dictionaries,
					services: [...state.dictionaries.services, payload]
				}
			}
		}
		default:
			return state
	}
}
