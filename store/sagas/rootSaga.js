import { all, takeLatest } from 'redux-saga/effects'

import {
	CREATE_STRIPE_SOURCE,
	UPDATE_STRIPE_SOURCE,
	REGISTER_CONTRACT_ID
} from '../payment/actionTypes'
import { COMPLETE_USER } from '../user/actionTypes'
import { GET_THING_TOKEN } from '../objects/action-types'

import {
	stripeSourceSaga,
	contractIdSaga,
	updateBillingSaga
} from './billingRegistrationSagas'
import completeUserSaga from './completeUserSaga'
import getThingTokenSaga from './getThingTokenSaga'

export default function* rootSaga() {
	yield all([
		takeLatest(CREATE_STRIPE_SOURCE, stripeSourceSaga),
		takeLatest(UPDATE_STRIPE_SOURCE, updateBillingSaga),
		takeLatest(REGISTER_CONTRACT_ID, contractIdSaga),
		takeLatest(COMPLETE_USER, completeUserSaga),
		takeLatest(GET_THING_TOKEN, getThingTokenSaga)
	])
}
