import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Col, Grid, Row } from 'react-bootstrap'
import { withFormik } from 'formik'
import { func, number, object, string, bool } from 'prop-types'
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement
} from 'react-stripe-elements'
import Spinner from 'react-spinner-material'
import 'react-flags-select/scss/react-flags-select.scss'

import {
	STREET_ADDRESS,
	CITY_ADDRESS,
	ZIP_CODE,
	COUNTRY,
	STATE,
	ORGANISATION_NAME
} from '../../validationSchemas/stripeSourceRegistrationValidationSchema'
import CountryList from 'country-list'
import { stripeSourceRegistrationValidationSchema } from '../../validationSchemas'
import {
	createStripeSource,
	clearStripeError,
	setStripeError
} from '../../store/payment/actions'
import './stripe-souce-registration.css'
import { stripeErrorSelector } from '../../store/payment/selectors'
import ErrorPanel from '../ErrorPanel/ErrorPanel'
import {
	emailSelector,
	isLoadingSelector,
	initialCompanyNameSelector
} from '../../store/user/selectors'
import ReactFlagsSelect from 'react-flags-select'

const countries = CountryList.getData()

class StripeSourceRegistration extends Component {
	state = {
		shouldErrorBeDisplayed: false,
		searchLetter: ''
	}

	componentWillUnmount() {
		this.finishLetterListening()
	}

	handleInputChange = event => {
		event.persist()
		const { handleChange } = this.props
		this.cleanUpError()
		handleChange(event)
	}

	handleSubmit = event => {
		event.preventDefault()
		this.setState({
			shouldErrorBeDisplayed: true
		})
		const { isValid, values, email, createStripeSource } = this.props
		if (!isValid) {
			return
		}
		createStripeSource({
			type: 'card',
			owner: {
				name: values[ORGANISATION_NAME],
				email,
				address: {
					city: values[CITY_ADDRESS],
					state: values[STATE],
					postal_code: values[ZIP_CODE],
					country: values[COUNTRY],
					line1: values[STREET_ADDRESS],
					line2: ''
				}
			}
		})
	}

	filterCountries = () => {
		return this.state.searchLetter
			? countries.filter(countryName => {
					return countryName[0].toLowerCase() === this.state.searchLetter
			  })
			: countries
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

	startLetterListening = () => {
		document.addEventListener('keypress', this.keyPressListener)
	}

	finishLetterListening = () => {
		document.removeEventListener('keypress', this.keyPressListener)
	}

	keyPressListener = event => {
		const key = event.key.toLowerCase()
		const testRegEx = /[a-z]/
		const isValid = testRegEx.test(key)
		if (isValid) {
			this.setState({
				searchLetter: key
			})
		}
	}

	styleCustomFields = {
		fontSize: '18px',
		color: '#6d8994',
		'::-webkit-input-placeholder': {
			color: '#c5c8c9',
			fontStyle: 'normal'
		},
		'::placeholder': {
			color: '#c5c8c9',
			fontStyle: 'normal'
		}
	}

	handleBlur = ({ target: { name } }) => {
		const { setFieldTouched } = this.props
		setFieldTouched(name)
	}

	onSelectFlag = countryCode => {
		const { setFieldValue } = this.props
		setFieldValue(COUNTRY, countries.find(k => k.code === countryCode).name)
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
			<div className={'signUp-registration'}>
				<form
					onSubmit={this.handleSubmit}
					autoComplete="off"
					className="form-container-stripe"
				>
					<Grid>
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
							<Col xs={12} className="col">
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
						</Row>
						<Row>
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
							<Col xs={12} md={6} className="col">
								<label>
									<span className="labelForm">CVV</span>
									<CardCVCElement
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
									<span className="labelForm">Street address</span>
									<input
										type="text"
										placeholder="Enter"
										className="inputField"
										onChange={handleChange}
										onBlur={this.handleBlur}
										name={STREET_ADDRESS}
										values={values[STREET_ADDRESS]}
									/>
								</label>
							</Col>
							<Col xs={12} md={6} className="col">
								<label>
									<span className="labelForm">Legal Company Name</span>
									<input
										type="text"
										placeholder="Enter"
										className="inputField"
										onChange={handleChange}
										onBlur={this.handleBlur}
										name={ORGANISATION_NAME}
										values={values[ORGANISATION_NAME]}
									/>
								</label>
							</Col>
						</Row>
						<Row>
							<Col xs={12} md={6} className="col">
								<label>
									<span className="labelForm">Country</span>

									<ReactFlagsSelect
										defaultCountry="US"
										searchable={true}
										onSelect={this.onSelectFlag}
										className="inputField countrySelect"
									/>
								</label>
							</Col>
							<Col xs={12} md={6} className="col">
								<label>
									<span className="labelForm">City</span>
									<input
										type="text"
										placeholder="Enter"
										className="inputField"
										onBlur={this.handleBlur}
										onChange={handleChange}
										name={CITY_ADDRESS}
										value={values[CITY_ADDRESS]}
									/>
								</label>
							</Col>
						</Row>
						<Row>
							<Col xs={12} md={6} className="col">
								<label>
									<span className="labelForm">State</span>
									<input
										type="text"
										placeholder="Enter"
										className="inputField"
										onBlur={this.handleBlur}
										onChange={handleChange}
										name={STATE}
										value={values[STATE]}
									/>
								</label>
							</Col>
							<Col xs={12} md={6} className="Col">
								<label>
									<span className="labelForm">Billing Zipcode</span>
									<input
										type="text"
										placeholder="Enter"
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
								{isLoading ? (
									<Spinner spinnerColor="#4986c5" />
								) : (
									<div className="submit-container">
										<input type="submit" value="Submit" />
									</div>
								)}
							</Col>
						</Row>
					</Grid>
				</form>
			</div>
		)
	}
}

StripeSourceRegistration.propTypes = {
	createStripeSource: func.isRequired,
	selectedIndex: number.isRequired,
	componentIndex: number.isRequired,
	stripe: object.isRequired,
	stripeError: string.isRequired,
	email: string.isRequired,
	values: object.isRequired,
	isValid: bool.isRequired,
	clearStripeError: func.isRequired,
	setFieldTouched: func.isRequired,
	handleChange: func.isRequired,
	errors: object.isRequired,
	setFieldValue: func.isRequired,
	isLoading: bool.isRequired
}

const mapStateToProps = state => ({
	stripeError: stripeErrorSelector(state),
	email: emailSelector(state),
	isLoading: isLoadingSelector(state),
	initialCompanyName: initialCompanyNameSelector(state)
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			createStripeSource,
			clearStripeError,
			setStripeError
		},
		dispatch
	)

export default compose(
	injectStripe,
	withFormik({
		mapPropsToValues: () => ({
			[CITY_ADDRESS]: '',
			[STREET_ADDRESS]: '',
			[ZIP_CODE]: '',
			[COUNTRY]: 'United States',
			[ORGANISATION_NAME]: '',
			[STATE]: ''
		}),
		validationSchema: stripeSourceRegistrationValidationSchema,
		displayName: 'stripeSourceRegistrationForm'
	}),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(StripeSourceRegistration)
