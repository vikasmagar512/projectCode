import { call, put, select } from 'redux-saga/effects'

import { getGatewayToken } from './apiCalls'
import { updateObjectSuccess } from '../objects/actions'

function* getGatewayTokenSaga({ payload: gatewayUUID }) {
	const globalState = yield select()
	const customerUUID = globalState.auth.selectedCustomer.uuid
	const ecosystemUUID = globalState.ecosystems.currentEcosystem.uuid

	const response = yield call(() =>
		getGatewayToken({
			gatewayUUID,
			customerUUID,
			ecosystemUUID
		})
	)
	const { token } = response.data
	const previousObject = globalState.objects[ecosystemUUID].objects.find(
		obj => obj.uuid === gatewayUUID
	)
	const desiredObject = {
		...previousObject,
		token
	}
	const ecosystem = globalState.ecosystems.currentEcosystem
	yield put(updateObjectSuccess(desiredObject, ecosystem))
}

export default getGatewayTokenSaga
