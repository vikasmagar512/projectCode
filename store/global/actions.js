import { FINISH_STARTUP, HIDE_LOADER, SHOW_LOADER } from './action-types'

export function finishStartup() {
	return {
		type: FINISH_STARTUP
	}
}

export function loading(bool) {
	return {
		type: bool ? SHOW_LOADER : HIDE_LOADER
	}
}
