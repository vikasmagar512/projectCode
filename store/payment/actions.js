import { createAction } from 'redux-actions'

import {
	SET_STRIPE,
	CREATE_STRIPE_SOURCE,
	UPDATE_STRIPE_SOURCE,
	SET_STRIPE_ERROR,
	CLEAR_STRIPE_ERROR,
	REGISTER_CONTRACT_ID,
	SET_CONTRACT_ID_ERROR,
	CLEAR_CONTRACT_ID_ERROR
} from './actionTypes'

export const setStripe = createAction(SET_STRIPE)
export const createStripeSource = createAction(CREATE_STRIPE_SOURCE)
export const updateStripeSource = createAction(UPDATE_STRIPE_SOURCE)
export const setStripeError = createAction(SET_STRIPE_ERROR)
export const clearStripeError = createAction(CLEAR_STRIPE_ERROR)
export const registerCustomerWithContractId = createAction(REGISTER_CONTRACT_ID)
export const setContractIdError = createAction(SET_CONTRACT_ID_ERROR)
export const clearContractIdError = createAction(CLEAR_CONTRACT_ID_ERROR)
