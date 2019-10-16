import {
	setCurrentEcosystem,
	loadEcosystemStarted,
	loadEcosystemSuccess,
	refreshEcosystemStarted,
	refreshEcosystemSuccess
} from '../../store/ecosystems/actions'
import * as REST from '../../api/rest'

export function loadEcosystem(ecosystemUUID) {
	return async (dispatch, getState) => {
		try {
			dispatch(loadEcosystemStarted())
			let ecosystem = getState().ecosystems.items.find(
				eco => eco.uuid === ecosystemUUID
			)

			if (ecosystem) {
				dispatch(setCurrentEcosystem(ecosystem))
			} else if (
				getState().ecosystems.currentEcosystem.uuid === ecosystemUUID
			) {
				ecosystem = getState().ecosystems.currentEcosystem
				dispatch(setCurrentEcosystem(ecosystem))
			} else {
				ecosystem = {
					status: 'inaccessible'
				}
				await dispatch(setCurrentEcosystem(ecosystem))
				return
			}
			const params = {
				ecosystem,
				customer: getState().auth.selectedCustomer
			}
			let [applications = [], groups, services, nsps] = await Promise.all([
				await REST.fetchApplications(params),
				await REST.fetchGroups(params),
				await REST.fetchServices(params),
				await REST.fetchNSPs()
			])
			if (!nsps) {
				nsps = await REST.fetchNSPs()
			}
			if (!nsps) {
				nsps = await REST.fetchNSPs()
			}

			dispatch(
				loadEcosystemSuccess({
					groups,
					applications,
					services,
					nsps
				})
			)
		} catch (err) {
			console.log(err)
		}
	}
}
export function refreshEcosystemStatus(ecosystemUUID) {
	return async (dispatch, getState) => {
		try {
			dispatch(refreshEcosystemStarted())
			const params = {
				ecosystem: ecosystemUUID,
				customer: getState().auth.selectedCustomer
			}
			const ecoSystem = await REST.fetchEcosystemStatus(params)
			dispatch(
				refreshEcosystemSuccess({
					ecoSystem
				})
			)
		} catch (err) {
			console.log(err)
		}
	}
}
