import { createSelector } from 'reselect'
import get from 'lodash/get'

import { PAYMENT } from '../../constants/reducersNames'
import { ERRORS, STRIPE_ERROR, CONTRACT_ID_ERROR } from './propertiesNames'

export const paymentErrorsSelector = state => get(state, [PAYMENT, ERRORS])

export const stripeErrorSelector = createSelector(
	paymentErrorsSelector,
	errors => errors[STRIPE_ERROR]
)

export const contractIdErrorSelector = createSelector(
	paymentErrorsSelector,
	errors => errors[CONTRACT_ID_ERROR]
)
