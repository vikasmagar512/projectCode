import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import CountryList from 'country-list'
import { bindActionCreators } from 'redux'
import { Col, Grid, Row } from 'react-bootstrap'
import { withFormik } from 'formik'
import Spinner from 'react-spinner-material'
import { number, func, bool, object, string } from 'prop-types'

import {
	registerCustomerWithContractId,
	clearContractIdError
} from '../../store/payment/actions'
import { contractIdErrorSelector } from '../../store/payment/selectors'
import ErrorPanel from '../ErrorPanel/ErrorPanel'
import {
	COMPANY_NAME,
	ACRETO_CONTRACT_ID,
	STATE,
	STREET_ADDRESS,
	CITY_ADDRESS,
	COUNTRY,
	ZIP_CODE
} from '../../validationSchemas/contractIdRegistrationValidationSchema'
import contractIdRegistrationValidationSchema from '../../validationSchemas/contractIdRegistrationValidationSchema'
import './contract-id-registration.scss'
import 'react-flags-select/scss/react-flags-select.scss'
import ReactFlagsSelect from 'react-flags-select'

import {
	isLoadingSelector,
	initialCompanyNameSelector
} from '../../store/user/selectors'

const countries = CountryList.getData()

class ContractIdRegistration extends Component {
	state = {
		shouldErrorBeDisplayed: false,
		searchLetter: ''
	}

	handleSubmit = event => {
		event.preventDefault()
		this.setState({
			shouldErrorBeDisplayed: true
		})
		const { isValid, values, registerCustomerWithContractId } = this.props
		if (!isValid) {
			return
		}
		const companyData = {
			name: values[COMPANY_NAME],
			payment_ref: values[ACRETO_CONTRACT_ID],
			payment_channel: 'contract',
			address: {
				city: values[CITY_ADDRESS],
				state: values[STATE],
				postal_code: values[ZIP_CODE],
				country: CountryList.getCode(values[COUNTRY]).toLowerCase(),
				line1: values[STREET_ADDRESS],
				line2: 'test line'
			}
		}
		registerCustomerWithContractId(companyData)
	}

	handleBlur = ({ target: { name } }) => {
		const { setFieldTouched } = this.props
		setFieldTouched(name)
	}

	onSelectFlag = countryCode => {
		const { setFieldValue } = this.props
		setFieldValue(COUNTRY, countries.find(k => k.code === countryCode).name)
	}

	handleInputChange = event => {
		const { handleChange } = this.props
		this.cleanUpError()
		handleChange(event)
	}

	cleanUpError = () => {
		const { shouldErrorBeDisplayed } = this.state
		if (shouldErrorBeDisplayed === true) {
			this.setState(({ shouldErrorBeDisplayed }) => ({
				shouldErrorBeDisplayed: !shouldErrorBeDisplayed
			}))
		}
		const { contractIdError, clearContractIdError } = this.props
		if (contractIdError) clearContractIdError()
	}

	render() {
		const {
			selectedIndex,
			componentIndex,
			values,
			handleChange,
			errors,
			contractIdError,
			isLoading
		} = this.props
		const { shouldErrorBeDisplayed } = this.state
		if (selectedIndex !== componentIndex) return null
		return (
			<form
				className="form-container-contract"
				autoComplete="off"
				onSubmit={this.handleSubmit}
			>
				<Grid>
					<Row>
						{!!contractIdError && (
							<Row>
								<Col xs={12} className="col">
									<ErrorPanel
										message={contractIdError}
										buttonClickHandler={this.cleanUpError}
									/>
								</Col>
							</Row>
						)}
					</Row>
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
								<span className="labelForm">Legal company name</span>
								<input
									type="text"
									placeholder="Enter"
									className="inputField"
									name={COMPANY_NAME}
									onChange={handleChange}
									onBlur={this.handleBlur}
									value={values[COMPANY_NAME]}
								/>
							</label>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Acreto contract</span>
								<input
									value={values[ACRETO_CONTRACT_ID]}
									type="text"
									placeholder="Contract Id"
									className="inputField"
									name={ACRETO_CONTRACT_ID}
									onChange={handleChange}
									onBlur={this.handleBlur}
								/>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Street address</span>
								<input
									value={values[STREET_ADDRESS]}
									type="text"
									placeholder="Enter"
									className="inputField"
									name={STREET_ADDRESS}
									onChange={handleChange}
									onBlur={this.handleBlur}
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
									value={values[CITY_ADDRESS]}
									type="text"
									placeholder="City"
									className="inputField"
									onChange={handleChange}
									onBlur={this.handleBlur}
									name={CITY_ADDRESS}
								/>
							</label>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">State</span>
								<input
									value={values[STATE]}
									type="text"
									placeholder="State"
									className="inputField"
									onChange={handleChange}
									onBlur={this.handleBlur}
									name={STATE}
								/>
							</label>
						</Col>
						<Col xs={12} md={6} className="col">
							<label>
								<span className="labelForm">Zipcode</span>
								<input
									value={values[ZIP_CODE]}
									type="string"
									maxLength="6"
									placeholder="ZIP"
									className="inputField"
									onChange={handleChange}
									onBlur={this.handleBlur}
									name={ZIP_CODE}
								/>
							</label>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={12} className="submitHolder">
							{isLoading ? (
								<Spinner spinnerColor="#4986c5" />
							) : (
								<input type="submit" value="Submit" className="submit" />
							)}
						</Col>
					</Row>
				</Grid>
			</form>
		)
	}
}

ContractIdRegistration.propTypes = {
	selectedIndex: number.isRequired,
	componentIndex: number.isRequired,
	isLoading: bool.isRequired,
	registerCustomerWithContractId: func.isRequired,
	clearContractIdError: func.isRequired,
	isValid: bool.isRequired,
	values: object.isRequired,
	setFieldTouched: func.isRequired,
	setFieldValue: func.isRequired,
	handleChange: func.isRequired,
	contractIdError: string.isRequired,
	errors: object.isRequired
}

const mapStateToProps = state => ({
	contractIdError: contractIdErrorSelector(state),
	isLoading: isLoadingSelector(state),
	initialCompanyName: initialCompanyNameSelector(state)
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			registerCustomerWithContractId,
			clearContractIdError
		},
		dispatch
	)

export default compose(
	injectStripe,
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withFormik({
		mapPropsToValues: ({ initialCompanyName }) => {
			return {
				[ACRETO_CONTRACT_ID]: '',
				[CITY_ADDRESS]: '',
				[STREET_ADDRESS]: '',
				[ZIP_CODE]: '',
				[COUNTRY]: 'United States',
				[STATE]: '',
				[COMPANY_NAME]: initialCompanyName
			}
		},
		validationSchema: contractIdRegistrationValidationSchema,
		displayName: 'contractIdRegistrationForm'
	})
)(ContractIdRegistration)
