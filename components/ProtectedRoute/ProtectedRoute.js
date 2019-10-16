import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
	customersSelector,
	isAuthenticatedSelector,
	isEulaAcceptedSelector
} from '../../store/user/selectors'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated, customers, location } = rest

	let eulaAccepted = localStorage.getItem('eulaAccepted') === 'true'
	return (
		<Route
			{...rest}
			render={props => {
				if (isAuthenticated) {
					if (!eulaAccepted) {
						if (location.pathname === '/auth/eula') {
							return <Component {...props} />
						}
						return (
							<Redirect
								push
								to={{
									pathname: '/auth/eula',
									state: { from: props.location }
								}}
							/>
						)
					}
					if (!customers || !customers.length) {
						return <Redirect push to="/auth/sign-up/billing" />
					}
					return <Component {...props} />
				}
				return (
					<Redirect
						push
						to={{
							pathname: '/auth/login',
							state: { from: props.location, warning: true }
						}}
					/>
				)
			}}
		/>
	)
}

ProtectedRoute.propTypes = {
	component: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		isAuthenticated: isAuthenticatedSelector(state),
		customers: customersSelector(state),
		eulaAccepted: isEulaAcceptedSelector(state)
	}
}

const ConnectedProtectedRoute = connect(
	mapStateToProps,
	null
)(ProtectedRoute)

export default ConnectedProtectedRoute
