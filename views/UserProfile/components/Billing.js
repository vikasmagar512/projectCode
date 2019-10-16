import React, { Component } from 'react'
import {
	CardCVCElement,
	CardExpiryElement,
	CardNumberElement,
	injectStripe
} from 'react-stripe-elements'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Col, Row, Button } from 'react-bootstrap'
import { withFormik } from 'formik'
import { bool, func, number, object, string } from 'prop-types'
import Spinner from 'react-spinner-material'

import {
	CARD_NAME,
	ZIP_CODE
} from '../../../validationSchemas/billingValidationSchema'
import history from '../../../history'
import '../user-profile.scss'

import {
	clearStripeError,
	updateStripeSource,
	setStripeError
} from '../../../store/payment/actions'
import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import {
	initialCompanyNameSelector,
	isLoadingSelector
} from '../../../store/user/selectors'
import { stripeErrorSelector } from '../../../store/payment/selectors'
import { fecthCustomerDetail } from '../senario-actions'
import billingValidationSchema from '../../../validationSchemas/billingValidationSchema'

class StripeSourceBillingProfile extends Component {
	state = {
		shouldErrorBeDisplayed: false,
		searchLetter: ''
	}

	componentDidMount() {
		this.props.fecthCustomerDetail()
	}

	handleSubmit = event => {
		event.preventDefault()
		this.setState({
			shouldErrorBeDisplayed: true
		})
		const { isValid, values, user, customer, updateStripeSource } = this.props
		if (!isValid) {
			return
		}
		updateStripeSource({
			billingInfo: {
				type: 'card',
				owner: {
					name: values[CARD_NAME],
					email: user.email,
					phone: user.mobilePhone,
					address: {
						postal_code: values[ZIP_CODE]
					}
				}
			},
			customerUUID: customer.uuid,
			redirect: this.props.from
		})
	}

	onCancel = () => {
		const { from } = this.props
		history.replace(from)
	}

	cleanUpError = () => {
		const { shouldErrorBeDisplayed } = this.state
		if (shouldErrorBeDisplayed === true) {
			this.setState(({ shouldErrorBeDisplayed }) => ({
				shouldErrorBeDisplayed: !shouldErrorBeDisplayed
			}))
		}
		const { stripeError, clearStripeError } = this.props
		if (stripeError) clearStripeError()
	}

	styleCustomFields = {
		fontSize: '18px',
		color: '#333',
		fontWeight: 'normal',
		'::-webkit-input-placeholder': {
			color: '#ccc',
			fontStyle: 'normal'
		},
		'::placeholder': {
			color: '#ccc',
			fontStyle: 'normal'
		}
	}

	handleBlur = ({ target: { name } }) => {
		const { setFieldTouched } = this.props
		setFieldTouched(name)
	}

	render() {
		const {
			componentIndex,
			selectedIndex,
			handleChange,
			values,
			errors,
			stripeError,
			isLoading
		} = this.props

		const isFormEmpty = Object.values(values).some(entry => entry === '')
		const { shouldErrorBeDisplayed } = this.state
		if (componentIndex !== selectedIndex) return null
		return (
			<form onSubmit={this.handleSubmit} autoComplete="off">
				<div className={'billing-profile-container'}>
					<div className={'form-container billing'}>
						<div className={'user-info-form'}>
							{isFormEmpty && shouldErrorBeDisplayed && (
								<Row>
									<Col xs={12} className="col">
										<ErrorPanel
											message={'Please, Enter All The Fields'}
											buttonClickHandler={this.cleanUpError}
										/>
									</Col>
								</Row>
							)}
							{!!stripeError && (
								<Row>
									<Col xs={12} className="col">
										<ErrorPanel
											message={stripeError}
											buttonClickHandler={this.cleanUpError}
										/>
									</Col>
								</Row>
							)}
							{shouldErrorBeDisplayed &&
								Object.values(errors).map(error => (
									<Row key={error}>
										<Col xs={12} className="col">
											<ErrorPanel
												message={error}
												buttonClickHandler={this.cleanUpError}
											/>
										</Col>
									</Row>
								))}
							<Row>
								<Col md={12} className="col">
									<label>
										<span className="labelForm">Name On Card</span>
										<input
											type="text"
											placeholder="Enter your name"
											className="inputField"
											onChange={handleChange}
											onBlur={this.handleBlur}
											name={CARD_NAME}
											value={values[CARD_NAME]}
										/>
									</label>
								</Col>
							</Row>
							<Row>
								<Col xs={12} md={6} className="col">
									<label>
										<span className="labelForm">Card Number</span>
										<div onClick={this.cleanUpError}>
											<CardNumberElement
												className="inputField"
												style={{ base: this.styleCustomFields }}
												onFocus={this.cleanUpError}
											/>
										</div>
									</label>
								</Col>
								<Col xs={12} md={6} className="col">
									<label>
										<span className="labelForm">Expiry Date</span>
										<CardExpiryElement
											className="inputField"
											style={{ base: this.styleCustomFields }}
											onFocus={this.cleanUpError}
										/>
									</label>
								</Col>
							</Row>
							<Row>
								<Col xs={12} md={6} className="col">
									<label>
										<span className="labelForm">CVV</span>
										<CardCVCElement
											className="inputField"
											placeholder="CVV"
											style={{ base: this.styleCustomFields }}
											onFocus={this.cleanUpError}
										/>
									</label>
								</Col>
								<Col xs={12} md={6} className="Col">
									<label>
										<span className="labelForm">Billing Zipcode</span>
										<input
											type="text"
											placeholder="Enter Zipcode"
											className="inputField"
											onBlur={this.handleBlur}
											onChange={handleChange}
											name={ZIP_CODE}
											maxLength="6"
											value={values[ZIP_CODE]}
										/>
									</label>
								</Col>
							</Row>
							<Row>
								<Col xs={12} md={12} className="submitHolder">
									{isLoading && <Spinner spinnerColor="#4986c5" />}
								</Col>
							</Row>
						</div>
					</div>
				</div>
				<div className={'divider'} />
				<div className={'button-container'}>
					<Button
						className={'button button-cancel'}
						onClick={() => this.onCancel()}
					>
						{'Cancel'}
					</Button>
					<Button type={'submit'} className={'button button-update'}>
						{'Update'}
					</Button>
				</div>
			</form>
		)
	}
}

StripeSourceBillingProfile.propTypes = {
	fecthCustomerDetail: func.isRequired,
	updateStripeSource: func.isRequired,
	selectedIndex: number.isRequired,
	componentIndex: number.isRequired,
	stripe: object.isRequired,
	stripeError: string.isRequired,
	customer: object.isRequired,
	user: object.isRequired,
	values: object.isRequired,
	isValid: bool.isRequired,
	clearStripeError: func.isRequired,
	setFieldTouched: func.isRequired,
	handleChange: func.isRequired,
	errors: object.isRequired,
	setFieldValue: func.isRequired,
	isLoading: bool.isRequired,
	from: string.isRequired
}

const mapStateToProps = state => {
	return {
		stripeError: stripeErrorSelector(state),
		customer: state.auth.selectedCustomer,
		user: state.user,
		isLoading: isLoadingSelector(state),
		initialCompanyName: initialCompanyNameSelector(state)
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			updateStripeSource,
			clearStripeError,
			setStripeError,
			fecthCustomerDetail
		},
		dispatch
	)

export default compose(
	injectStripe,
	withFormik({
		mapPropsToValues: () => ({
			[ZIP_CODE]: '',
			[CARD_NAME]: ''
		}),
		validationSchema: billingValidationSchema,
		displayName: 'stripeSourceBillingProfileForm'
	}),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(StripeSourceBillingProfile)
