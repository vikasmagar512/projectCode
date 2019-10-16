import {
	FETCHING_REPORTS_FAILURE,
	FETCHING_REPORTS_REQUESTED,
	FETCHING_REPORTS_SUCCESS
} from './action-types'

export function fetchingReportsStarted() {
	return {
		type: FETCHING_REPORTS_REQUESTED,
		payload: {
			isLoading: true
		}
	}
}

export function fetchingReportsSuccess(results, append = 0) {
	return {
		type: FETCHING_REPORTS_SUCCESS,
		payload: {
			results,
			append,
			success: true,
			isLoading: true
		}
	}
}

export function fetchingReportsFailed(err) {
	return {
		type: FETCHING_REPORTS_FAILURE,
		payload: {
			message: err,
			success: false,
			isLoading: true
		}
	}
}
