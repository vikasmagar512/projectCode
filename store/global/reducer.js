import { FINISH_STARTUP, HIDE_LOADER, SHOW_LOADER } from './action-types'
const initialState = {
	startupFinished: false,
	loadingState: false
}

export function globalReducer(state = initialState, { type }) {
	switch (type) {
		case FINISH_STARTUP:
			return {
				startupFinished: true
			}
		case SHOW_LOADER:
			return {
				...state,
				loadingState: true
			}
		case HIDE_LOADER:
			return {
				...state,
				loadingState: false
			}
		default:
			return state
	}
}
