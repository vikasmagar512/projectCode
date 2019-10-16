import * as api from '../../api/rest'
import {
	fetchingReportsFailed,
	fetchingReportsStarted,
	fetchingReportsSuccess
} from '../../store/reports/actions'
import { toast } from 'react-toastify'

const REPORTS_PER_PAGE = process.env.REACT_APP_REPORTS_PER_PAGE || 50

export function fetchReports(ecosystemUUID, searchTerm) {
	let searchQuery = {
		multi_match: {
			query: searchTerm,
			fields: [] //all field search
		}
	}
	let k = searchTerm ? { ...searchQuery } : { match_all: {} }
	return async (dispatch, getState) => {
		try {
			dispatch(fetchingReportsStarted())
			const reports = await api.fetchReports({
				ecosystem: ecosystemUUID,
				customer: getState().auth.selectedCustomer,
				query: {
					query: {
						bool: {
							must: k
						}
					},
					sort: {
						EventDatetime: { order: 'asc' }
					},
					size: REPORTS_PER_PAGE
				}
			})
			dispatch(fetchingReportsSuccess(reports, 0))
		} catch (err) {
			dispatch(fetchingReportsFailed(err))
		}
	}
}

export function fetchNewest(ecosystemUUID, searchTerm) {
	let searchQuery = {
		multi_match: {
			query: searchTerm,
			fields: [] //all field search
		}
	}
	let k = searchTerm ? { ...searchQuery } : { match_all: {} }
	return async (dispatch, getState) => {
		if (getState().reports.items.length > 0) {
			let element = getState().reports.items[0]

			try {
				dispatch(fetchingReportsStarted())
				const results = await api.fetchReports({
					ecosystem: ecosystemUUID,
					customer: getState().auth.selectedCustomer,
					query: {
						query: {
							bool: {
								/*must: {
									...searchQuery
								},*/
								must: k,
								filter: {
									range: {
										EventDatetime: {
											gt: element.date
										}
									}
								}
							}
						},
						sort: {
							EventDatetime: { order: 'desc' }
						},
						size: REPORTS_PER_PAGE
					}
				})
				dispatch(fetchingReportsSuccess(results, -1))
			} catch (err) {
				dispatch(fetchingReportsFailed())
				toast.error('Newer reports cannot be fetched')
			}
		}
	}
}

export function fetchOlder(ecosystemUUID, searchTerm) {
	let searchQuery = {
		multi_match: {
			query: searchTerm,
			fields: [] //all field search
		}
	}
	let k = searchTerm ? { ...searchQuery } : { match_all: {} }
	return async (dispatch, getState) => {
		if (getState().reports.items.length > 0) {
			const element = getState().reports.items[
				getState().reports.items.length - 1
			]
			try {
				dispatch(fetchingReportsStarted())
				const results = await api.fetchReports({
					ecosystem: ecosystemUUID,
					customer: getState().auth.selectedCustomer,
					query: {
						query: {
							bool: {
								must: k,
								filter: {
									range: {
										EventDatetime: {
											lt: element.date
										}
									}
								}
							}
						},
						sort: {
							EventDatetime: { order: 'desc' }
						},
						size: REPORTS_PER_PAGE
					}
				})
				dispatch(fetchingReportsSuccess(results, 1))
			} catch (err) {
				dispatch(fetchingReportsFailed())
				toast.error('Older reports cannot be fetched')
			}
		}
	}
}
