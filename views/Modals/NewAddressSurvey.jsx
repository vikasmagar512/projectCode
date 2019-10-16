import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import SelectWithCreate from '../../components/SelectWithCreate/SelectWithCreate'
import {
	ADDRESS_TYPE,
	EXPIRATION_TYPE,
	IP_TYPE,
	IP_TYPE_OPTIONS,
	LOCATION_TYPE,
	LOCATION_TYPE_OPTIONS,
	OBJECT_CATEGORIES,
	OBJECT_TYPES
} from '../../enums'
import Translator from '../../utils/enumTranslator'
import addressValidationSchema from '../../validationSchemas/addressValidationSchema'
import { Footer } from './commons'
import './modals.scss'

export default class NewAddressSurvey extends React.Component {
	constructor(props) {
		super(props)
		if (props.edit) {
			this.state = {
				name: props.item.name,
				//expiryType: props.item.expiry.type,
				//expiry: props.item.expiry.date,
				category: Translator.category(props.item.category),
				type: OBJECT_TYPES[1],
				//asset: OBJECT_ASSET_VALUES[props.item.assetValue], // NOT SAFE, TODO LATED
				//location: Translator.location(props.item.location.type),
				//lat: props.item.location.latitude,
				//long: props.item.location.longitude,
				//region: Translator.region(props.item.location.region),
				description: props.item.description,
				protocolType: props.item.type,
				addressType: ADDRESS_TYPE.INTERNAL,
				address: props.item.address,
				errors: [],
				isSubmitted: false
			}
		} else {
			this.state = {
				name: '',
				addressType: ADDRESS_TYPE.INTERNAL,
				address: '',
				category: OBJECT_CATEGORIES[0],
				protocolType: IP_TYPE.IPv4,
				expiryType: EXPIRATION_TYPE.HARD,
				type: OBJECT_TYPES[1],
				location: LOCATION_TYPE_OPTIONS[LOCATION_TYPE.AUTO],
				errors: [],
				isSubmitted: false
			}
		}
	}

	changeField = (field, value) => {
		this.setState({
			[field]: value
		})
	}

	onNameChange = val => this.changeField('name', val)
	onCategoryChange = val => this.changeField('category', val)
	onTypeChange = val => this.changeField('type', val)
	onExpiryChange = val => this.changeField('expiry', val)
	onDescriptionChange = val => this.changeField('description', val)
	onLocationChange = val => this.changeField('location', val)
	onLatChange = val => this.changeField('lat', val)
	onLongChange = val => this.changeField('long', val)
	onExpiryTypeChange = val => this.changeField('expiryType', val)
	onProtocolTypeChange = val => this.changeField('protocolType', val)
	onAddressTypeChange = val => this.changeField('addressType', val)
	onAddressChange = val => this.changeField('address', val)
	onMaskChange = val => this.changeField('mask', val)
	onRegionChange = val => this.changeField('region', val)

	onFinish = () => {
		this.setState(
			{
				errors: [],
				isSubmitted: true
			},
			() => {
				if (this.validate()) {
					try {
						this.props.onFinish(this.state)
					} catch (err) {
						this.setState({
							errors: [
								this.props.edit
									? 'Failed to Update Address'
									: 'Failed to Add Address'
							]
						})
					}
				}
			}
		)
	}

	validIPV4 = ip =>
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
			ip
		)

	validFQDN = url =>
		/^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i.test(
			url
		)

	validIPV6 = ip =>
		/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))\s*$/.test(
			ip
		)
	isPositiveInteger = n => 0 === n % (!isNaN(parseFloat(n)) && 0 <= ~~n)

	validOptions = () => {
		const { errors } = this.state
		let errorSet = false
		if (!this.state.address) {
			return true
		}
		if (['ipv4', 'ipv6'].indexOf(this.state.protocolType) !== -1) {
			const ip = this.state.address.split('/')[0]
			errorSet =
				this.state.protocolType === 'ipv4' && !this.validIPV4(ip)
					? true
					: errorSet
			errorSet =
				this.state.protocolType === 'ipv6' && !this.validIPV6(ip)
					? true
					: errorSet
			let occurance = (this.state.address.match(/\//g) || []).length
			errorSet = occurance > 1 ? true : errorSet
			if (occurance === 1) {
				let str = this.state.address.split('/')[1]
				if (str === '') {
					errorSet = true
				} else {
					let mask = Number(str)
					if (!this.isPositiveInteger(mask)) {
						errorSet = true
					} else {
						errorSet =
							this.state.protocolType === 'ipv4' && (mask < 0 || mask > 32)
								? true
								: errorSet
						errorSet =
							this.state.protocolType === 'ipv6' && (mask < 0 || mask > 128)
								? true
								: errorSet
					}
				}
			}
		} else if (this.state.protocolType === 'fqdn') {
			errorSet = !this.validFQDN(this.state.address) ? true : errorSet
		}
		if (errorSet) {
			errors.push('Invalid address')
		}

		if (errors.length) {
			this.setState({ errors })
			return false
		}
		return true
	}

	validate() {
		if (!this.state.isSubmitted) {
			return true
		}
		if (!this.validOptions()) {
			return false
		}
		try {
			addressValidationSchema.validateSync(this.state, { abortEarly: false })
			this.setState({
				errors: []
			})
			return true
		} catch (err) {
			this.setState({
				errors: err.errors
			})
			return false
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className={'modal__content padded new-address-survey'}>
					{this.state.errors.map((err, index) => (
						<p className="error" key={index}>
							{err}
						</p>
					))}
					<Card header={false}>
						<div className={'form-row'}>
							<Form.Group required={true} label={'Name'}>
								<Form.Text
									value={this.state.name}
									onChange={this.onNameChange}
									placeholder={'Name'}
								/>
							</Form.Group>
						</div>
						<Form.Group center={true} label={''}>
							<Form.Toggle
								selected={this.state.protocolType}
								selectedClass={'toggle-selected'}
								onChange={this.onProtocolTypeChange}
								options={IP_TYPE_OPTIONS}
							/>
						</Form.Group>
						<Form.Group full label={''}>
							<div className={'flex-row center'}>
								<Form.Group required={true} label={'Address'}>
									<Form.Text
										value={this.state.address}
										onChange={this.onAddressChange}
										style={{ flex: 2 }}
										placeholder={'Address'}
									/>
								</Form.Group>
							</div>
						</Form.Group>
						<div className={'form-row'}>
							<Form.Group required={true} label={'Category'}>
								<SelectWithCreate
									selected={this.state.category}
									onChange={this.onCategoryChange}
									placeholder={'Select category'}
									createOpened={false}
									options={OBJECT_CATEGORIES}
								/>
							</Form.Group>
							<Form.Group label={'Type'}>
								<p className={'medium strong'}>{this.state.type.label}</p>
							</Form.Group>
						</div>
					</Card>
				</div>
				<div className={'wedge-modal__footer'}>
					<Footer
						onClick={this.onFinish}
						edit={this.props.edit}
						onDelete={this.props.onDelete}
					/>
				</div>
			</React.Fragment>
		)
	}
}

NewAddressSurvey.defaultProps = {
	edit: false
}

NewAddressSurvey.propTypes = {
	onFinish: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	edit: PropTypes.bool,
	item: PropTypes.object
}

NewAddressSurvey.Footer = Footer
