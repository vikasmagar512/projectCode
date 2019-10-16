import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { Redirect, Route, Switch, withRouter, Link } from 'react-router-dom'
import { ACRETO_LOGO, LOGIN_FOOTER } from '../../assets/Icons'
import UnauthorizedRoute from '../../components/UnauthorizedRoute/UnauthorizedRoute'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import LoginForm from '../../views/LoginForm/LoginForm'
import Eula from '../../views/LoginForm/Eula/eula'
import SignUpForm from '../../views/SignUpForm/SignUpForm'
import './login.scss'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute'
import CustomersForm from '../../views/CustomersForm/CustomersForm'

class Login extends Component {
	configs = {
		signup: {
			linkRoute: '/auth/sign-up/email',
			formTitle: 'Sign up',
			authButtonTitle: 'Sign up'
		},
		login: {
			linkRoute: '/auth/login',
			formTitle: 'Log in',
			authButtonTitle: 'Log in'
		}
	}
	render() {
		const {
			location: { pathname }
		} = this.props
		let linkFlag = false
		if (
			pathname.includes(this.configs.signup.linkRoute) ||
			pathname.includes(this.configs.login.linkRoute)
		) {
			linkFlag = true
		}
		const currentConfig = pathname.includes(this.configs.signup.linkRoute)
			? this.configs.login
			: this.configs.signup
		const { linkRoute, formTitle, authButtonTitle } = currentConfig
		return (
			<div className="login-page">
				<div className={'login-page--header header'}>
					<img src={ACRETO_LOGO} alt={'acreto-logo'} className={'logo'} />
					{linkFlag && (
						<Link to={linkRoute} className={'button'}>
							{authButtonTitle}
						</Link>
					)}
				</div>

				<Switch>
					<Route exact path={'/auth/login'} render={LoginForm} />
					<ProtectedRoute
						exact
						path={'/auth/customers'}
						component={CustomersForm}
					/>
					<ProtectedRoute exact path={'/auth/eula'} component={Eula} />

					<UnauthorizedRoute
						path={'/auth/sign-up'}
						component={SignUpForm}
						formTitle={formTitle}
					/>
					<Redirect to={'/auth/login'} />
				</Switch>

				<div className={'login-page--footer footer'}>
					<img
						src={LOGIN_FOOTER}
						className={cx({
							'footer--image': true,
							'slow-shake': this.props.isLoading
						})}
						alt={'footer'}
					/>
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	location: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired
}

const loadingSelector = createLoadingSelector(['LOGIN'])
const errorSelector = createErrorMessageSelector(['LOGIN'])

const mapStateToProps = state => {
	return {
		isLoading: loadingSelector(state),
		error: errorSelector(state)
	}
}

const ConnectedLogin = connect(
	mapStateToProps,
	null
)(Login)

export default withRouter(ConnectedLogin)
