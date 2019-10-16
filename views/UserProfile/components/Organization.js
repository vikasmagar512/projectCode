import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Avatar from 'react-avatar'
import { Row, Col, Button } from 'react-bootstrap'
import CountryList from 'country-list'
import { fecthCustomerDetail } from '../senario-actions'

import '../user-profile.scss'
import 'react-flags-select/scss/react-flags-select.scss'

import ReactFlagsSelect from 'react-flags-select'
const countries = CountryList.getData()

class Organization extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			companyName: '',
			address: '',
			country: 'United States',
			city: '',
			zipCode: '',
			state: '',
			name: '',
			phone: ''
		}
	}

	async componentDidMount() {
		await this.props.fecthCustomerDetail()
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	onSelectFlag = countryCode => {
		this.setState({ country: countries.find(k => k.code === countryCode).name })
	}

	render() {
		const {
			companyName,
			address,
			country,
			city,
			zipCode,
			state,
			name,
			phone
		} = this.state

		return (
			<React.Fragment>
				<div className={'organization-profile-container'}>
					<div className={'avatar-container'}>
						<Avatar googleId="118096717852922241760" size="160" round={true} />
						<Button className={'button button-change button-change-avatar'}>
							{'Change'}
						</Button>
						<div className={'button-remove'}>{'Remove'}</div>
					</div>
					<div className={'form-container'}>
						<div className={'company-info-form'}>
							<Row>
								<Col md={12} className="col">
									<label>
										<span className="labelForm">{'COMPANY NAME'}</span>
										<input
											type="text"
											placeholder="Enter Company Name"
											className="inputField"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
											name={'companyName'}
											value={companyName}
										/>
									</label>
								</Col>
								<Col md={12} className="col">
									<label>
										<span className="labelForm">{'STREET ADDRESS'}</span>
										<input
											type="text"
											placeholder="Enter Street Address"
											className="inputField"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
											name={'address'}
											value={address}
										/>
									</label>
								</Col>
							</Row>
							<Row>
								<Col xs={12} md={6} className="col">
									<label>
										<span className="labelForm">{'COUNTRY'}</span>
										<ReactFlagsSelect
											name={'country'}
											defaultCountry={
												countries.find(k => k.name === country).code
											}
											searchable={true}
											onSelect={this.onSelectFlag}
											className="inputField countrySelect"
										/>
									</label>
								</Col>
								<Col xs={12} md={6} className="col">
									<label>
										<span className="labelForm">{'CITY'}</span>
										<input
											type="text"
											placeholder="Enter City"
											className="inputField"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
											name={'city'}
											value={city}
										/>
									</label>
								</Col>
							</Row>
							<Row>
								<Col xs={12} md={6} className="col">
									<label>
										<span className="labelForm">{'ZIPCODE'}</span>
										<input
											type="email"
											placeholder="Enter Zipcode"
											className="inputField"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
											maxLength="6"
											name={'zipCode'}
											value={zipCode}
										/>
									</label>
								</Col>
								<Col xs={12} md={6} className="col">
									<label>
										<span className="labelForm">{'STATE'}</span>
										<input
											type="text"
											placeholder="Enter state"
											className="inputField"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
											name={'state'}
											value={state}
										/>
									</label>
								</Col>
							</Row>
						</div>
						<div className={'contact-form'}>
							<h4 className={'title'}>{'Administrative Contact'}</h4>
							<div className={'divider'} />
							<Row>
								<Col xs={12} md={6}>
									<label>
										<span className="labelForm">{'NAME'}</span>
										<input
											type="text"
											placeholder="Enter Name"
											className="inputField"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
											name={'name'}
											value={name}
										/>
									</label>
								</Col>
								<Col xs={12} md={6}>
									<label>
										<span className="labelForm">{'PHONE'}</span>
										<input
											type="text"
											placeholder="Enter Number"
											className="inputField"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
											name={'phone'}
											value={phone}
										/>
									</label>
								</Col>
							</Row>
						</div>
					</div>
				</div>
				<div className={'divider'} />
				<div className={'button-container'}>
					<Button className={'button button-cancel'}>{'Cancel'}</Button>
					<Button className={'button button-update'}>{'Update'}</Button>
				</div>
			</React.Fragment>
		)
	}
}

Organization.propTypes = {
	fecthCustomerDetail: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
	return {
		fecthCustomerDetail: () => dispatch(fecthCustomerDetail())
	}
}

export default connect(
	null,
	mapDispatchToProps
)(Organization)
