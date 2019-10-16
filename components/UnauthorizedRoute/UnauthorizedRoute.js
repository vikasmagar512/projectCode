import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import PropTypes from 'prop-types'

import {
	customersSelector,
	isAuthenticatedSelector
} from '../../store/user/selectors'
import { LOCAL_ACCESS_TOKEN_KEY } from '../../enums'

const UnauthorizedRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated, customers, location } = rest
	const billingRoute = '/auth/sign-up/billing'
	const personalInfoRoute = '/auth/sign-up/personal-info'
	const internalUrls = [billingRoute, personalInfoRoute]
	const checkIfInternalUrl = (pathname, internalUrls) => {
		return internalUrls.some(k => location.pathname.includes(k))
	}
	const isInternalUrl = checkIfInternalUrl(location.pathname, internalUrls)
	const accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)

	return (
		<Route
			{...rest}
			render={props => {
				if (isAuthenticated) {
					if (location.pathname.includes(billingRoute)) {
						return <Component {...props} />
					} else if (!customers || !customers.length) {
						return <Redirect push to={billingRoute} />
					}
					return <Redirect push to={'/'} />
				}
				if (isInternalUrl) {
					if (accessToken) {
						return <Component {...props} />
					}
					return <Redirect push to={'/auth/sign-up/email'} />
				}
				return <Component {...props} />
			}}
		/>
	)
}

UnauthorizedRoute.propTypes = {
	component: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	isAuthenticated: isAuthenticatedSelector(state),
	customers: customersSelector(state)
})

export default compose(
	withRouter,
	connect(mapStateToProps)
)(UnauthorizedRoute)
