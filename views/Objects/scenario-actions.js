import * as REST from '../../api/rest'
import {
	creationObjectFailed,
	creationObjectStarted,
	creationObjectSuccess,
	fetchingObjectsFailed,
	fetchingObjectsStarted,
	fetchingObjectsSuccess,
	updateObjectFailed,
	updateObjectStarted,
	updateObjectSuccess,
	deleteObjectFailed,
	deleteObjectStarted,
	deleteObjectSuccess,
	downloadConfStarted,
	downloadConfSuccess,
	downloadConfFailed
} from '../../store/objects/actions'
import populator from '../../utils/populator'

export function fetchObjects(ecosystemUUID) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			const { groups } = getState().ecosystems.dictionaries
			dispatch(fetchingObjectsStarted())
			const things = await REST.fetchObjects({
				customer: getState().auth.selectedCustomer,
				ecosystem: ecosystemUUID,
				type: 'thing'
			})
			const addresses = await REST.fetchObjects({
				customer: getState().auth.selectedCustomer,
				ecosystem: ecosystemUUID,
				type: 'address'
			})
			const gateways = await REST.fetchObjects({
				customer: getState().auth.selectedCustomer,
				ecosystem: ecosystemUUID,
				type: 'gateway'
			})
			let remapedObjects = things.map(ob => ({
				...ob,
				profileGroup: groups.find(gr => gr.uuid === ob.profileGroup)
			}))
			remapedObjects = remapedObjects.concat(addresses, gateways)
			dispatch(fetchingObjectsSuccess(remapedObjects, ecosystem))
		} catch (err) {
			dispatch(fetchingObjectsFailed(err))
		}
	}
}

export function createObject(entity, type) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			const { groups } = getState().ecosystems.dictionaries
			dispatch(creationObjectStarted())
			const objects = await REST.createObject({
				object: populator[type](entity),
				type,
				ecosystem: ecosystem.uuid,
				customer: getState().auth.selectedCustomer
			}).then(object => ({
				...object,
				profileGroup: groups.find(gr => gr.uuid === object.profileGroup)
			}))
			dispatch(creationObjectSuccess(objects, ecosystem))
		} catch (err) {
			dispatch(creationObjectFailed(err))
		}
	}
}

export function updateObject(entity, type, uuid) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			const { groups } = getState().ecosystems.dictionaries
			dispatch(updateObjectStarted())
			let obj = populator[type](entity)
			if (type === 'address') {
				obj.uuid = uuid
			}
			const object = await REST.updateObject({
				customer: getState().auth.selectedCustomer,
				ecosystem: ecosystem.uuid,
				object: obj,
				type,
				uuid
			}).then(object => ({
				...object,
				profileGroup: groups.find(gr => gr.uuid === object.profileGroup)
			}))
			dispatch(updateObjectSuccess(object, ecosystem))
		} catch (err) {
			dispatch(updateObjectFailed(err))
		}
	}
}

export function deleteObject(entity) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			const customer = getState().auth.selectedCustomer
			dispatch(deleteObjectStarted())
			await REST.deleteObject({
				customer: customer,
				ecosystem: ecosystem.uuid,
				object: entity
			})
			dispatch(deleteObjectSuccess())
		} catch (err) {
			dispatch(deleteObjectFailed(err))
		}
	}
}

export function downloadConfig(entity) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			const customer = getState().auth.selectedCustomer
			dispatch(downloadConfStarted())
			const token = await REST.getGatewayToken({
				customer: customer.uuid,
				ecosystem: ecosystem.uuid,
				gateway: entity
			})
			await REST.downloadConf(token, entity.name)
			dispatch(downloadConfSuccess())
		} catch (err) {
			dispatch(downloadConfFailed(err))
		}
	}
}

export function gatewayConfigLink(entity) {
	return async (dispatch, getState) => {
		try {
			const ecosystem = getState().ecosystems.currentEcosystem
			const customer = getState().auth.selectedCustomer
			dispatch(downloadConfStarted())
			const token = await REST.getGatewayToken({
				customer: customer.uuid,
				ecosystem: ecosystem.uuid,
				gateway: entity
			})
			const link = REST.getConfigLink(token, entity.name)
			dispatch(downloadConfSuccess(link))
		} catch (err) {
			dispatch(downloadConfFailed(err))
		}
	}
}
