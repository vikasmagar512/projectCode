import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import AddButton from '../../components/AddButton/AddButton'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import SelectWithCreate from '../../components/SelectWithCreate/SelectWithCreate'
import {
	ADDRESS_TYPE,
	EXPIRATION_TYPE,
	IP_TYPE,
	LOCATION_TYPE,
	LOCATION_TYPE_OPTIONS,
	OBJECT_CATEGORIES,
	OBJECT_TYPES
} from '../../enums'
import Translator from '../../utils/enumTranslator'
import gatewayValidateSchema from '../../validationSchemas/gatewayValidationSchema'
import { Footer } from './commons'
import './modals.scss'

function parseAdditionalNetworks(networks) {
	return networks.map(net => ({
		network: net
	}))
}

export default class NewGatewaySurvey extends React.Component {
	constructor(props) {
		super(props)
		if (props.edit) {
			this.state = {
				name: props.item.name,
				category: Translator.category(props.item.category),
				type: OBJECT_TYPES[2],
				staticAddress: props.item.peerAddress,
				additionalNetworks: parseAdditionalNetworks(props.item.peerNetworks),
				newAdditionalNetwork: '',
				newAdditionalHop: '',
				errors: []
			}
		} else {
			this.state = {
				name: '',
				staticAddress: '',
				additionalNetworks: [],
				newAdditionalNetwork: '',
				newAdditionalHop: '',
				category: OBJECT_CATEGORIES[0],
				gatewayType: 1,
				addressType: ADDRESS_TYPE.INTERNAL,
				protocolType: IP_TYPE.IPv4,
				expiryType: EXPIRATION_TYPE.HARD,
				location: LOCATION_TYPE_OPTIONS[LOCATION_TYPE.AUTO],
				type: OBJECT_TYPES[2],
				errors: []
			}
		}
	}

	changeField = (field, value) => {
		this.setState({
			[field]: value,
			errors: []
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
	onGatewayTypeChange = val => this.changeField('gatewayType', val)
	onProtocolTypeChange = val => this.changeField('protocolType', val)
	onAddressTypeChange = val => this.changeField('addressType', val)
	onStaticAddressChange = val => this.changeField('staticAddress', val)
	onStaticMaskChange = val => this.changeField('staticMask', val)
	onDefaultAddressChange = val => this.changeField('defaultAddress', val)
	onDefaultMaskChange = val => this.changeField('defaultMask', val)
	onLocalAddressChange = val => this.changeField('localAddress', val)
	onLocalMaskChange = val => this.changeField('localMask', val)
	onNewAdditionalNetworkChange = val =>
		this.changeField('newAdditionalNetwork', val)
	onNewAdditionalHopChange = val => this.changeField('newAdditionalHop', val)
	onRegionChange = val => this.changeField('region', val)

	onFinish = async () => {
		const { newAdditionalNetwork } = this.state
		if (this.validIp(newAdditionalNetwork)) {
			const newNetwork = {
				network: this.state.newAdditionalNetwork,
				hop: this.state.newAdditionalHop
			}
			await this.setState({
				additionalNetworks: this.state.additionalNetworks.some(
					k => k.network === newNetwork.network && k.hop === newNetwork.hop
				)
					? this.state.additionalNetworks
					: [...this.state.additionalNetworks, newNetwork],
				newAdditionalNetwork: '',
				newAdditionalHop: ''
			})
		}

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

	isPositiveInteger = n => 0 === n % (!isNaN(parseFloat(n)) && 0 <= ~~n)

	validIp = ip => {
		if (!ip) {
			this.setState({ errors: ['Please input IP Address'] })
			return false
		}
		const addr = ip.split('.')
		const mask = ip.split('/')
		const regex = /^((?![a-z]).)*$/
		const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
		if (
			!regex.test(ip) ||
			addr.length !== 4 ||
			!ipRegex.test(mask[0]) ||
			mask.length > 2
		) {
			this.setState({ errors: ['Invalid IP Address'] })
			return false
		}
		if (mask.length === 2) {
			const msk = Number(mask[1])
			if (!mask[1] || isNaN(msk) || msk < 0 || msk > 32) {
				this.setState({ errors: ['Invalid IP Address'] })
				return false
			}
		}
		return true
	}

	onAdd = () => {
		const { newAdditionalNetwork } = this.state
		if (!this.validIp(newAdditionalNetwork)) {
			return
		}

		const newNetwork = {
			network: this.state.newAdditionalNetwork,
			hop: this.state.newAdditionalHop
		}

		if (
			this.state.additionalNetworks.some(
				k => k.network === newNetwork.network && k.hop === newNetwork.hop
			)
		) {
			this.setState({
				additionalNetworks: this.state.additionalNetworks.some(
					k => k.network === newNetwork.network && k.hop === newNetwork.hop
				)
					? this.state.additionalNetworks
					: [...this.state.additionalNetworks, newNetwork],
				newAdditionalNetwork: '',
				newAdditionalHop: ''
			})
			return
		}

		this.setState({
			additionalNetworks: [...this.state.additionalNetworks, newNetwork],
			newAdditionalNetwork: '',
			newAdditionalHop: ''
		})
	}

	onRemove = index => {
		this.setState({
			additionalNetworks: this.state.additionalNetworks.filter(
				(val, ind) => ind !== index
			)
		})
	}

	validate() {
		try {
			gatewayValidateSchema.validateSync(this.state, { abortEarly: false })
			this.setState({ errors: [] })
			return true
		} catch (err) {
			this.setState({ errors: err.errors })
			return false
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className={'modal__content padded new-gateway-survey'}>
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

					<Card header={false}>
						<div className={'form-row'}>
							<Form.Group full label={'Allow connections from (optional)'}>
								<Form.Text
									value={this.state.staticAddress}
									onChange={this.onStaticAddressChange}
									style={{ width: '50%' }}
									placeholder={'IP address'}
								/>
							</Form.Group>
							<Form.Group self required={true} label={'Local Networks'}>
								<div className={'local-networks--container'}>
									<table>
										<tbody>
											<tr>
												<th className={'network'}>{'Network/Mask'}</th>
												<th className={'last'} />
											</tr>
											{this.state.additionalNetworks.map((net, index) => {
												return (
													<tr key={`additional-network-index-${index}`}>
														<td className={'network'}>{net.network}</td>
														<td className={'last'}>
															<i
																className={'pe-7s-close red-delete-icon'}
																onClick={() => this.onRemove(index)}
															/>
														</td>
													</tr>
												)
											})}
											<tr className={'new-entry'}>
												<td>
													<Form.Text
														value={this.state.newAdditionalNetwork}
														onChange={this.onNewAdditionalNetworkChange}
														extraClass={'light'}
														placeholder={'Network/Mask'}
													/>
												</td>
												<td className={'last'}>
													<AddButton onClick={this.onAdd} />
												</td>
											</tr>
										</tbody>
									</table>
								</div>
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

NewGatewaySurvey.propTypes = {
	onFinish: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	edit: PropTypes.bool,
	item: PropTypes.object
}

NewGatewaySurvey.Footer = Footer
