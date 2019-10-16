import { createAction } from 'redux-actions'
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
	COMPLETE_USER,
	UPDATE_USER
} from './actionTypes'

export const setUser = createAction(SET_USER)
export const setEmail = createAction(SET_EMAIL)
export const startLoading = createAction(START_LOADING)
export const finishLoading = createAction(FINISH_LOADING)
export const setError = createAction(SET_ERROR)
export const clearError = createAction(CLEAR_ERROR)
export const setToken = createAction(SET_TOKEN)
export const confirmEmail = createAction(CONFIRM_EMAIL)
export const setInitCompanyName = createAction(SET_INIT_COMPANY_NAME)
export const completeUser = createAction(COMPLETE_USER)
export const updateUser = createAction(UPDATE_USER)
