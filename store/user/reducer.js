import { assign } from 'lodash'
import { handleActions } from 'redux-actions'

import {
	SET_USER,
	SET_EMAIL,
	START_LOADING,
	FINISH_LOADING,
	SET_ERROR,
	CLEAR_ERROR,
	SET_TOKEN,
	CONFIRM_EMAIL,
	SET_INIT_COMPANY_NAME,
	UPDATE_USER
} from './actionTypes'

const initialState = {
	email: '',
	uuid: '',
	firstName: '',
	lastName: '',
	isActivated: false,
	isLoading: false,
	error: '',
	isEmailConfirmed: false,
	initialCompanyName: ''
}

export const userReducer = handleActions(
	{
		[SET_USER]: (state, { payload }) => assign({}, state, payload),
		[UPDATE_USER]: (state, { payload }) => assign({}, state, payload),
		[SET_EMAIL]: (state, { payload: email }) => assign({}, state, { email }),
		[START_LOADING]: state => assign({}, state, { isLoading: true }),
		[FINISH_LOADING]: state => assign({}, state, { isLoading: false }),
		[SET_ERROR]: (state, { payload }) => assign({}, state, { error: payload }),
		[CLEAR_ERROR]: state => assign({}, state, { error: '' }),
		[SET_TOKEN]: (state, { payload }) => assign({}, state, { token: payload }),
		[CONFIRM_EMAIL]: state => assign({}, state, { isEmailConfirmed: true }),
		[SET_INIT_COMPANY_NAME]: (state, { payload }) =>
			assign({}, state, { initialCompanyName: payload })
	},
	initialState
)
