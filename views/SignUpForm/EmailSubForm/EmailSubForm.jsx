import Spinner from 'react-spinner-material'
import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { func, string, shape, bool, object } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import { emailValidationSchema } from '../../../validationSchemas'
import { LOGIN_EMAIL } from '../../../assets/Icons'
import { checkIfTheTokenIsValid } from '../scenario-actions'
import { registerEmail } from '../scenario-actions'
import { clearError } from '../../../store/user/actions'
import {
	errorSelector,
	isLoadingSelector,
	emailSelector
} from '../../../store/user/selectors'
import '../sign-up-form.scss'

class EmailSubForm extends Component {
	state = {
		showError: false
	}

	static getDerivedStateFromProps({ serverError }) {
		if (serverError) return { showError: true }
		return null
	}

	resetError = () => {
		const { serverError, clearError } = this.props
		serverError && clearError()
	}

	disableError = () => {
		this.setState({
			showError: false
		})
		const { clearError } = this.props
		clearError()
	}

	onSubmit = event => {
		event.preventDefault()
		const { isValid, registerEmail, values, serverError } = this.props
		if (isValid !== true || serverError) {
			this.setState({
				showError: true
			})
		} else {
			const { email } = values
			registerEmail({
				email
			})
		}
	}

	handleInputChange = event => {
		const { handleChange } = this.props
		this.setState({
			showError: false
		})
		handleChange(event)
	}

	render() {
		const {
			values,
			setFieldTouched,
			isLoading,
			errors,
			serverError
		} = this.props
		const { showError } = this.state
		const error = errors.email || serverError
		const shouldErrorBeDisplayed = showError && !!error
		return (
			<form
				onSubmit={this.onSubmit}
				className={'form-container'}
				autoComplete={'off'}
			>
				{shouldErrorBeDisplayed && (
					<ErrorPanel message={error} buttonClickHandler={this.disableError} />
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
						value={values.email}
						name={'email'}
						placeholder={'Email'}
						required={true}
						onFocus={this.resetError}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('email')}
						autoComplete={'off'}
					/>
				</div>
				{isLoading ? (
					<Spinner spinnerColor="#4986c5" className="spinner" />
				) : (
					<div className="submit-button-container">
						<input type="submit" className="signup-button" value="Sign up" />
					</div>
				)}
				<div>
					<span />
				</div>
			</form>
		)
	}
}

EmailSubForm.propTypes = {
	handleSubmit: func.isRequired,
	values: shape({
		email: string
	}).isRequired,
	errors: shape({
		email: string
	}),
	isValid: bool.isRequired,
	setFieldTouched: func.isRequired,
	handleChange: func.isRequired,
	registerEmail: func.isRequired,
	serverError: string.isRequired,
	clearError: func.isRequired,
	isLoading: bool.isRequired,
	location: object.isRequired,
	email: string.isRequired,
	checkIfTheTokenIsValid: func.isRequired
}

const mapStateToProps = state => ({
	serverError: errorSelector(state),
	isLoading: isLoadingSelector(state),
	error: errorSelector(state),
	email: emailSelector(state)
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			registerEmail,
			clearError,
			checkIfTheTokenIsValid
		},
		dispatch
	)

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withFormik({
		mapPropsToValues: () => ({
			email: ''
		}),
		validationSchema: emailValidationSchema
	})
)(EmailSubForm)
