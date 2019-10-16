import { get } from 'lodash'
import { createSelector } from 'reselect'

export const userSelector = state => get(state, ['user'])
export const emailSelector = createSelector(
	userSelector,
	user => get(user, ['email'])
)
export const isLoadingSelector = createSelector(
	userSelector,
	user => get(user, ['isLoading'])
)

export const errorSelector = createSelector(
	userSelector,
	user => get(user, ['error'])
)

export const authSelector = state => get(state, ['auth'])

export const isAuthenticatedSelector = createSelector(
	authSelector,
	auth => get(auth, ['isAuthenticated'])
)

export const isActivatedSelector = createSelector(
	userSelector,
	user => get(user, ['isActivated'])
)

export const isEmailConfirmedSelector = createSelector(
	userSelector,
	user => get(user, ['isEmailConfirmed'])
)

export const isEulaAcceptedSelector = createSelector(
	userSelector,
	user => get(user, ['eulaAccepted'])
)

export const initialCompanyNameSelector = createSelector(
	userSelector,
	user => get(user, ['initialCompanyName'])
)

export const customersSelector = createSelector(
	authSelector,
	({ customers }) => customers
)
