import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { bool, func, object, shape, string } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Spinner from 'react-spinner-material'
import ReactPhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

import { personalInfoValidationSchema } from '../../../validationSchemas'
import { LOGIN_PASSWORD, PERSON } from '../../../assets/Icons'
import { clearError, completeUser } from '../../../store/user/actions'
import EmailDisplay from '../../../components/EmailDisplay/EmailDisplay'
import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel'
import {
	emailSelector,
	errorSelector,
	isLoadingSelector
} from '../../../store/user/selectors'
import '../sign-up-form.scss'
import 'react-phone-number-input/style.css'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

class PersonalInfoSubForm extends Component {
	state = {
		showEmailVerificationMessage: true,
		showError: true,
		unitedErrors: [],
		phone: this.props.values.mobilePhone
	}

	componentDidUpdate(prevProps) {
		if (prevProps.serverError !== this.props.serverError) {
			this.setState({
				showError: true
			})
		}
	}

	onSubmit = event => {
		event.preventDefault()
		let { unitedErrors, phone } = this.state
		const { isValid, completeUser, serverError, errors, touched } = this.props
		let { values } = this.props
		if (isValid !== true) {
			unitedErrors = [serverError]
			for (let k in errors) {
				if (touched[k]) {
					unitedErrors.push(errors[k])
				}
			}
			this.setState({
				showError: true,
				unitedErrors
			})
			return
		} else if (this.validPhone()) {
			values.mobilePhone = phone
			completeUser(values)
		}
	}

	closeEmailVerificationMessage = () => {
		this.setState(() => ({
			showEmailVerificationMessage: false
		}))
	}

	validPhone = () => {
		const { phone } = this.state
		const regex = /^\+\d+\s*(\(\d+\))?[- \d]+$/
		if (!phone) {
			this.setState({
				unitedErrors: ['Phone Number Is Required']
			})
			return false
		} else if (!regex.test(phone) || !isValidPhoneNumber(phone)) {
			this.setState({
				unitedErrors: ['Incorrect Phone Number']
			})
			return false
		}

		return true
	}

	handleInputChange = event => {
		const { handleChange, clearError, serverError } = this.props
		if (serverError) clearError()
		const { showEmailVerificationMessage, showError } = this.state
		showEmailVerificationMessage && this.closeEmailVerificationMessage()
		showError && this.closeErrorPanel()
		handleChange(event)
	}

	closeErrorPanel = () => {
		const { clearError, serverError } = this.props
		if (serverError) clearError()
		this.setState({
			showError: false,
			unitedErrors: []
		})
	}

	render() {
		const { values, setFieldTouched, isLoading, serverError } = this.props
		const { unitedErrors, showEmailVerificationMessage } = this.state

		return (
			<form onSubmit={this.onSubmit} className="form-container">
				{showEmailVerificationMessage && (
					<>
						<SuccessPanel
							message="Your email has been successfully verified"
							buttonClickHandler={this.closeEmailVerificationMessage}
						/>
						<EmailDisplay />
					</>
				)}
				{serverError ? (
					<ErrorPanel
						message={serverError}
						buttonClickHandler={this.closeErrorPanel}
						key={serverError}
					/>
				) : (
					unitedErrors.map(error => {
						return error ? (
							<ErrorPanel
								message={error}
								buttonClickHandler={this.closeErrorPanel}
								key={error}
							/>
						) : null
					})
				)}
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img src={PERSON} className={'person-icon'} alt={'person-icon'} />
					</div>
					<input
						value={values.firstName}
						name={'firstName'}
						placeholder={'First Name'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('firstName')}
					/>
				</div>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img src={PERSON} className={'person-icon'} alt={'person-icon'} />
					</div>
					<input
						value={values.lastName}
						name={'lastName'}
						placeholder={'Last Name'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('lastName')}
					/>
				</div>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img
							src={LOGIN_PASSWORD}
							className={'person-icon'}
							alt={'person-icon'}
						/>
					</div>
					<input
						type="password"
						value={values.password}
						name={'password'}
						placeholder={'Password'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('password')}
					/>
				</div>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img
							src={LOGIN_PASSWORD}
							className={'person-icon'}
							alt={'person-icon'}
						/>
					</div>
					<input
						type="password"
						value={values.passwordConfirmation}
						name={'passwordConfirmation'}
						placeholder={'Confirm Your Password'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('passwordConfirmation')}
					/>
				</div>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<span className="icon-organization" />
					</div>
					<input
						value={values.organizationName}
						name={'organizationName'}
						placeholder={'Organization Name'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('organizationName')}
					/>
				</div>
				<OverlayTrigger
					placement="right"
					delay={250}
					overlay={
						<Tooltip id={`tooltip-right`}>
							Please enter your phone number in the international format, for
							example: <strong> +1 123-456-7890 </strong>
						</Tooltip>
					}
				>
					<div className={'input-container'}>
						<ReactPhoneInput
							country="US"
							value={this.state.phone}
							name={'mobilePhone'}
							placeholder={'Phone Number'}
							onChange={value => this.setState({ phone: value })}
							onBlur={() => setFieldTouched('mobilePhone')}
						/>
					</div>
				</OverlayTrigger>

				{isLoading ? (
					<Spinner spinnerColor="#4986c5" className="spinner" />
				) : (
					<div className="submit-button-container">
						<input type="submit" className="signup-button" value="Next" />
					</div>
				)}
			</form>
		)
	}
}

PersonalInfoSubForm.propTypes = {
	buttonTitle: string,
	values: shape({
		firstName: string,
		lastName: string
	}).isRequired,
	errors: shape({
		firstName: string,
		lastName: string
	}),
	isValid: bool.isRequired,
	setFieldTouched: func.isRequired,
	handleChange: func.isRequired,
	email: string.isRequired,
	isLoading: bool.isRequired,
	completeUser: func.isRequired,
	serverError: string.isRequired,
	clearError: func.isRequired,
	touched: object.isRequired
}

PersonalInfoSubForm.defaultProps = {
	buttonTitle: 'Sign up',
	isLoading: true
}

const mapStateToProps = state => ({
	isLoading: isLoadingSelector(state),
	serverError: errorSelector(state),
	email: emailSelector(state)
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			completeUser,
			clearError
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
			firstName: '',
			lastName: '',
			mobilePhone: '',
			organizationName: '',
			password: '',
			passwordConfirmation: ''
		}),
		validationSchema: personalInfoValidationSchema
	})
)(PersonalInfoSubForm)
