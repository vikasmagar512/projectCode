import { call, put, select } from 'redux-saga/effects'

import { getThingToken } from './apiCalls'
import { updateObjectSuccess } from '../objects/actions'

function* getThingTokenSaga({ payload: thingUUID }) {
	const globalState = yield select()
	const customerUUID = globalState.auth.selectedCustomer.uuid
	const ecosystemUUID = globalState.ecosystems.currentEcosystem.uuid

	const response = yield call(() =>
		getThingToken({
			thingUUID,
			customerUUID,
			ecosystemUUID
		})
	)
	const { token } = response.data
	const previousObject = globalState.objects[ecosystemUUID].objects.find(
		obj => obj.uuid === thingUUID
	)
	const desiredObject = {
		...previousObject,
		token
	}
	const ecosystem = globalState.ecosystems.currentEcosystem
	yield put(updateObjectSuccess(desiredObject, ecosystem))
}

export default getThingTokenSaga
