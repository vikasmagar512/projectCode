import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { LOGIN_EMAIL, LOGIN_PASSWORD } from '../../assets/Icons'
import {
	createErrorMessageSelector,
	createLoadingSelector,
	needsLoginMessageSelector
} from '../../store/utils/selectors'
import './login-form.scss'
import { login, removeAuthError } from './scenario-actions'
import { cleanLoginMessage } from '../../store/auth/actions'
import { clearError as clearLogoutError } from '../../store/user/actions'
import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'
import { errorSelector as logoutErrorSelector } from '../../store/user/selectors'

require('formdata-polyfill')

class LoginForm extends Component {
	state = {
		authError: 'Please log in!',
		interval: 0
	}

	componentDidMount() {
		this.props.removeAuthError()
		const interval = setInterval(() => {
			this.clearError()
		}, 5000)
		this.setState({ interval })
	}

	static getDerivedStateFromProps({ logoutError }) {
		if (logoutError) {
			return {
				authError: logoutError
			}
		}
		return null
	}

	componentDidUpdate(prevProps) {
		if (
			!this.props.logoutError &&
			prevProps.logoutError !== this.props.logoutError
		) {
			clearInterval(this.state.interval)
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.interval)
	}

	clearError = () => {
		clearInterval(this.state.interval)
		this.props.clearLogoutError()
	}

	handleSubmit = e => {
		e.preventDefault()
		const data = new FormData(e.target)
		const { from } = this.props.location.state || { from: { pathname: '/' } }

		const email = data.get('email')
		const password = data.get('password')
		this.props.login({ email, password }, from)
	}

	removeErrorMessage = () => {
		const { logoutError, clearLogoutError } = this.props
		logoutError ? clearLogoutError() : this.setState({ authError: '' })
	}

	render() {
		const { authError } = this.state
		const { cleanLoginMessage, needsLoginMessage, logoutError } = this.props
		return (
			<div className={'login-form-page--content'}>
				<div className={'login-form'}>
					<h2 className={'title'}>Log in</h2>
					{this.props.error && (
						<div className={'alert alert-danger'}>{this.props.error}</div>
					)}
					{logoutError && (
						<div className={'alert alert-warning'}>
							{this.props.logoutError}
						</div>
					)}
					<form onSubmit={this.handleSubmit} autoComplete={'off'}>
						{needsLoginMessage && (
							<ErrorPanel
								message={authError}
								buttonClickHandler={this.removeErrorMessage}
							/>
						)}
						<div className={'input-container'}>
							<div className={'icon-container'}>
								<img
									src={LOGIN_EMAIL}
									className={'input-icon'}
									alt={'input-icon'}
								/>
							</div>
							<input
								onFocus={cleanLoginMessage && this.removeErrorMessage}
								name={'email'}
								placeholder={'Email'}
								required={true}
								autoComplete={'off'}
							/>
						</div>
						<div className={'input-container'}>
							<div className={'icon-container'}>
								<img
									src={LOGIN_PASSWORD}
									className={'input-icon'}
									alt={'input-icon'}
								/>
							</div>
							<input
								name={'password'}
								placeholder={'Password'}
								type={'password'}
								required={true}
								onFocus={cleanLoginMessage && this.removeErrorMessage}
							/>
						</div>
						<div
							className={
								'hide-component login-rememberme-container component-coming-soon'
							}
						>
							<label className={'checkbox-label wedge-checkbox-container'}>
								<input
									type="checkbox"
									checked={true}
									onChange={() => () => {}}
								/>
								<span className={'checkmark'} />
								<span className={'title'}>Remember me</span>
							</label>
							<p>Forgot your password?</p>
						</div>
						<input type="submit" className={'login-button'} value={'Log in'} />
						<span className={'sign'}>{"Don't have an account?"}</span>
						<Link to={'/auth/sign-up/email'}>
							<span className={'sign sign-link'}>{'Register here'}</span>
						</Link>
					</form>
				</div>
			</div>
		)
	}
}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired,
	removeAuthError: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired,
	clearLogoutError: PropTypes.func.isRequired,
	logoutError: PropTypes.string.isRequired,
	needsLoginMessage: PropTypes.bool.isRequired,
	cleanLoginMessage: PropTypes.func.isRequired
}

LoginForm.defaultProps = {
	error: '',
	isLoading: false
}

const loadingSelector = createLoadingSelector(['LOGIN'])
const errorSelector = createErrorMessageSelector(['LOGIN'])

const mapStateToProps = state => {
	return {
		isLoading: loadingSelector(state),
		error: errorSelector(state),
		logoutError: logoutErrorSelector(state),
		needsLoginMessage: needsLoginMessageSelector(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: (credentials, redirect) => dispatch(login(credentials, redirect)),
		clearLogoutError: () => dispatch(clearLogoutError()),
		cleanLoginMessage: () => dispatch(cleanLoginMessage),
		removeAuthError: () => dispatch(removeAuthError())
	}
}

const ConnectedLogin = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm)
export default withRouter(ConnectedLogin)
