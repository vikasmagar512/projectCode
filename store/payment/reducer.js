import { handleActions } from 'redux-actions'
import update from 'lodash/fp/update'

import {
	SET_STRIPE,
	SET_STRIPE_ERROR,
	CLEAR_STRIPE_ERROR,
	SET_CONTRACT_ID_ERROR,
	CLEAR_CONTRACT_ID_ERROR
} from './actionTypes'
import {
	STRIPE,
	ERRORS,
	STRIPE_ERROR,
	CONTRACT_ID_ERROR
} from './propertiesNames'

const initialState = {
	[STRIPE]: {},
	[ERRORS]: {
		[STRIPE_ERROR]: '',
		[CONTRACT_ID_ERROR]: ''
	}
}

const paymentReducer = handleActions(
	{
		[SET_STRIPE]: (state, { payload }) =>
			update([STRIPE], () => payload, state),
		[SET_STRIPE_ERROR]: (state, { payload }) =>
			update([ERRORS, STRIPE_ERROR], () => payload, state),
		[CLEAR_STRIPE_ERROR]: state =>
			update([ERRORS, STRIPE_ERROR], () => '', state),
		[SET_CONTRACT_ID_ERROR]: (state, { payload }) =>
			update([ERRORS, CONTRACT_ID_ERROR], () => payload, state),
		[CLEAR_CONTRACT_ID_ERROR]: (state, { payload }) =>
			update([ERRORS, CONTRACT_ID_ERROR], () => payload, state)
	},
	initialState
)

export default paymentReducer
