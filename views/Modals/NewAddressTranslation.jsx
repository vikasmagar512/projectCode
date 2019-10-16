import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
// import AddButton from '../../components/AddButton/AddButton'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import {
	ADDRESS_TRANSLATION_OPTIONS,
	ADDRESS_TRANSLATION_TYPES
} from '../../enums'
import { Footer } from './commons'
import {
	createGroup,
	createService
} from '../../store/creational-scenario-actions'
import populator from '../../utils/populator'
import capitalize from '../../utils/capitalize'
import './modals.scss'
import SelectWithCreateObject from '../../components/SelectWithCreateObject/SelectWithCreateObject'
import addressTranslationValidationSchema from '../../validationSchemas/addressTranslationValidationSchema'
import * as _ from 'lodash'
import dividerIcon from '../../assets/img/PNG/DNAT_arrow.png'
import CreateServiceDropdown from '../../components/CreateServiceDropdown/CreateServiceDropdown'

function isSelected(element, arr) {
	return arr.findIndex(ps => ps.value === element) !== -1
}

class NewAddressTranslation extends React.Component {
	constructor(props) {
		super(props)
		const { item } = this.props
		let { groups, objects } = this.props
		groups = this.processGroups(groups, objects)
		const any = { value: 'any', label: 'any', type: 'any' }
		this.parts = ['left', 'right']
		this.parts.forEach(part => {
			this[part] = {
				sources: [],
				potentialSources: '',
				destinations: [],
				potentialDestinations: ''
			}
			this.left = {
				...this.left,
				services: [],
				potentialServices: ''
			}
			this.right = {
				...this.right,
				destinationPort: ''
			}
		})
		if (item) {
			this.parts.forEach(part => {
				item[part].sources && item[part].sources.length
					? item[part].sources.forEach(src =>
							this[part].sources.push(
								populator.group(groups.find(gr => gr.uuid === src.uuid))
							)
					  )
					: (this[part].potentialSources = any)

				item[part].destinations && item[part].destinations.length
					? item[part].destinations.forEach(dst =>
							this[part].destinations.push(
								populator.group(groups.find(gr => gr.uuid === dst.uuid))
							)
					  )
					: (this[part].potentialDestinations = any)
			})
			item['left'].services && item['left'].services.length
				? item['left'].services.forEach(s => {
						const svc = this.props.options.filter(o => {
							return (
								o.protocol === s.protocol &&
								(o.port && s.port ? o.port === s.port : true)
							)
						})
						if (svc.length) {
							this['left'].services.push({
								value: svc[0].port
									? `${svc[0].protocol}/${svc[0].port}`
									: svc[0].protocol,
								label: `${
									svc[0].port
										? svc[0].protocol + '/' + svc[0].port
										: svc[0].protocol
								} (${svc[0].name})`
							})
						}
				  })
				: (this['left'].potentialServices = any)
		}
		this.state = {
			name: item ? item.name : '',
			description: item && item.description ? item.description : '',
			groups,
			left: this.left,
			right: this.right,
			action: item
				? item.action === 'enable'
					? ADDRESS_TRANSLATION_TYPES.ENABLE
					: ADDRESS_TRANSLATION_TYPES.DISABLE
				: ADDRESS_TRANSLATION_TYPES.ENABLE,
			errors: [],
			isSubmitted: false
		}
	}

	componentDidMount() {
		const { name, description } = this.state
		document.getElementsByName('policy-name')[0].value = name
		document.getElementsByName('policy-desc')[0].value = description
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (
			(nextProps.groups &&
				nextProps.groups.length !== this.props.groups.length) ||
			(nextProps.objects &&
				nextProps.objects.length !== this.props.objects.length)
		) {
			let { groups, objects } = nextProps
			groups = this.processGroups(groups, objects)
			this.setState({ groups })
		}
	}

	processGroups = (groups, objects) => {
		objects = objects
			.filter(obj => obj.element !== 'thing')
			.map(k => ({ ...k, type: k.element }))
		groups = groups
			.map(k => ({ ...k, element: 'group', type: 'group' }))
			.concat(objects)
		return groups
	}
	handleServiceCreate = service => {
		this.props.createService(service)
	}

	changeField = (field, value) => {
		this.setState({
			[field]: value
		})
	}

	handleGroupCreate = name => {
		this.props.createGroup(name)
	}

	onNameChange = val => {
		this.changeField('name', val)
	}
	onNotesChange = val => this.changeField('notes', val)
	onDescriptionChange = val => this.changeField('description', val)
	onExpiryTypeChange = val => this.changeField('expiryType', val)
	onActionChange = val => {
		this.setState({
			action: val
		})
	}

	onFinish = () => {
		this.setState(
			{
				isSubmitted: true,
				errors: [],
				name: document.getElementsByName('policy-name')[0].value,
				description: document.getElementsByName('policy-desc')[0].value
			},
			() => {
				if (this.validate()) {
					try {
						let { name, description } = this.state
						this.parts.forEach(part => {
							this[part] = { ...this.state[part] }
							this[part].sources =
								this[part].potentialSources &&
								this[part].potentialSources.value !== 'any'
									? [...this[part].sources, this[part].potentialSources]
									: this[part].sources
							this[part].destinations =
								this[part].potentialDestinations &&
								this[part].potentialDestinations.value !== 'any'
									? [
											...this[part].destinations,
											this[part].potentialDestinations
									  ]
									: this[part].destinations
							if (part === 'left') {
								this[part]['svc'] = []
								this[part].services =
									this[part].potentialServices &&
									this[part].potentialServices.value !== 'any'
										? [...this[part].services, this[part].potentialServices]
										: this[part].services
								this[part].services.forEach(s => {
									const result = this.props.options.filter(opt => {
										return opt.port
											? `${opt.protocol}/${opt.port}` === s.value
											: opt.protocol === s.value
									})
									if (result[0].port) {
										this[part].svc.push({
											name: result[0].name,
											port: result[0].port,
											protocol: result[0].protocol
										})
									} else {
										this[part].svc.push({
											name: result[0].name,
											protocol: result[0].protocol
										})
									}
								})
								this[part].services = this[part].svc[0]
							}

							this[part].sources = this[part].sources.map(s => ({
								type: s.type,
								uuid: s.value
							}))
							this[part].destinations = this[part].destinations.map(d => ({
								type: d.type,
								uuid: d.value
							}))
						})
						this.right.services = this.right.destinationPort
						let origAction = ADDRESS_TRANSLATION_OPTIONS.find(
							opt => opt.value === this.state.action
						).label.toLowerCase()

						this.props.onFinish({
							name,
							description,
							left: _.pick(this.left, 'sources', 'destinations', 'services'),
							right: _.pick(this.right, 'sources', 'destinations', 'services'),
							action: origAction,
							position: 0,
							enabled: true
						})
					} catch (err) {
						this.setState({
							errors: [
								this.props.edit
									? 'Failed to Update Address Translation'
									: 'Failed to Add Address Translation'
							]
						})
					}
				}
			}
		)
	}

	onPotentialItemChange = (value, part, field) => {
		this.setState({
			...this.state,
			[part]: { ...this.state[part], [`potential${capitalize(field)}`]: value }
		})
		if (value.value === 'any') {
			this.setState({
				...this.state,
				[part]: { ...this.state[part], [field]: [] }
			})
		}
	}

	onNewItemManual = field => {
		let newField = this.state[field]
		newField.push(this.state[`potential${capitalize(field)}`])
		this.setState({
			[field]: newField,
			[`potential${capitalize(field)}`]: ''
		})
	}
	onDestinationPortChange = val => {
		const numberRegex = /^[0-9]+$/
		const finalValue = val && val.match(numberRegex) ? parseInt(val) : 0
		this.setState({
			...this.state,
			right: {
				...this.state.right,
				destinationPort: finalValue
			}
		})
	}

	onRemoveItem = (index, field) => {
		this.setState({
			[field]: this.state[field].filter((s, i) => i !== index)
		})
	}

	validOptions = () => {
		const { errors } = this.state
		this.parts.forEach(part => {
			if (
				!this.state[part].sources.length &&
				!this.state[part].potentialSources
			) {
				errors.push(`${part === 'left' ? 'If' : 'Then'} Source is required.`)
			}
			if (
				!this.state[part].destinations.length &&
				!this.state[part].potentialDestinations
			) {
				errors.push(
					`${part === 'left' ? 'If' : 'Then'} Destination is required.`
				)
			}
		})
		if (
			!this.state['left'].services.length &&
			!this.state['left'].potentialServices
		) {
			errors.push(`If Service is required.`)
		}
		if (
			!this.state['right'].destinationPort &&
			this.state['right'].destinationPort === ''
		) {
			errors.push(`Then Destination Port is required.`)
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
			addressTranslationValidationSchema.validateSync(this.state, {
				abortEarly: false
			})
			this.setState({ errors: [] })
			return true
		} catch (err) {
			this.setState({ errors: err.errors })
			return false
		}
	}

	renderLeft() {
		return (
			<div className={'translationContainer'}>
				<p className={'subHeader'}>
					If communications attributes matches this:
				</p>
				{this.renderSourceDest('left')}
				<Form.Group
					extraClass={'services-container'}
					required={true}
					label={'Destination Port'}
				>
					<div className={'flex-row baseline'}>
						{/*<Form.Select
							value={this.state.left.potentialServices}
							onChange={val => {
								this.onPotentialItemChange(val, 'left', 'services')
							}}
							placeholder={'Destination Port'}
							options={[
								{ value: 'any', label: 'any' },
								...this.props.options
									.filter(
										g =>
											!isSelected(
												g.port ? `${g.protocol}/${g.port}` : g.protocol,
												this.state.left.services
											)
									)
									.map(o => ({
										value: `${o.port ? o.protocol + '/' + o.port : o.protocol}`,
										label: `${
											o.port ? o.protocol + '/' + o.port : o.protocol
										} (${o.name})`
									}))
							]}
						/>*/}
						<CreateServiceDropdown
							onCreate={this.handleServiceCreate}
							selected={this.state.left.potentialServices}
							onChange={val => {
								this.onPotentialItemChange(val, 'left', 'services')
							}}
							placeholder={'Service'}
							options={[
								{ value: 'any', label: 'any', type: 'any' },
								...this.props.options
									.filter(
										option => !isSelected(option.uuid, this.state.left.services)
									)
									.map(option => ({
										...option,
										value: option.uuid,
										label: `${
											option.port
												? `${option.protocol}/${option.port}`
												: option.type
												? `${option.protocol}/${option.type}`
												: option.protocol
										} (${option.name})`
									}))
							]}
						/>
					</div>
				</Form.Group>
			</div>
		)
	}

	renderRight() {
		return (
			<div className={'translationContainer'}>
				<p className={'subHeader'}>Then translate to the following</p>
				{this.renderSourceDest('right')}
				<div className={'flex-row baseline'}>
					<Form.Group required={true} label={'Destination Port'}>
						<Form.Text
							className={'form__textinput'}
							value={this.state.right.destinationPort}
							onChange={this.onDestinationPortChange}
							placeholder={'Enter Destination Port'}
						/>
					</Form.Group>
				</div>
			</div>
		)
	}

	renderSourceDest(part) {
		const sourcePlaceHolder = 'Sources'
		const destinationPlaceHolder = 'Destination'
		return (
			<React.Fragment>
				<Form.Group
					extraClass={'sources-container'}
					required={true}
					label={'Source'}
				>
					<div className={'flex-row baseline'}>
						<SelectWithCreateObject
							onCreate={this.handleGroupCreate}
							selected={this.state[part].potentialSources}
							onChange={val => {
								this.onPotentialItemChange(val, part, 'sources')
							}}
							placeholder={sourcePlaceHolder}
							openCreateObjectModal={this.props.openCreateObjectModal}
							createModalText={'Select Source Type'}
							fieldType={'Source'}
							createModalOpenedObject={this.props.createModalOpenedObject}
							options={[
								{ value: 'any', label: 'any', type: 'any' },
								...this.state.groups
									.filter(g => !isSelected(g.uuid, this.state[part].sources))
									.map(g => ({
										value: g.uuid,
										label: g.name,
										type: g.type
									}))
							]}
						/>
					</div>
				</Form.Group>
				<Form.Group
					required={true}
					extraClass={'destinations-container'}
					label={'Destination'}
				>
					<div className={'flex-row baseline'}>
						<SelectWithCreateObject
							onCreate={this.handleGroupCreate}
							selected={this.state[part].potentialDestinations}
							onChange={val => {
								this.onPotentialItemChange(val, part, 'destinations')
							}}
							placeholder={destinationPlaceHolder}
							openCreateObjectModal={this.props.openCreateObjectModal}
							createModalText={'Select Destination Type'}
							fieldType={'Destination'}
							options={[
								{ value: 'any', label: 'any', type: 'any' },
								...this.state.groups
									.filter(
										g => !isSelected(g.uuid, this.state[part].destinations)
									)
									.map(g => ({
										value: g.uuid,
										label: g.name,
										type: g.type
									}))
							]}
						/>
					</div>
				</Form.Group>
			</React.Fragment>
		)
	}

	render() {
		return (
			<React.Fragment>
				<div
					className={'modal__content padded new-address-translation-survey '}
				>
					{this.state.errors.map((err, index) => (
						<p className="error" key={index}>
							{err}
						</p>
					))}
					<Card header={false}>
						<div className={'form-row'}>
							<Form.Group required={true} label={'Name'}>
								<input
									className={'form__textinput'}
									name={'policy-name'}
									placeholder={'Enter policy name'}
								/>
							</Form.Group>
							<Form.Group required label={'Action'}>
								<Form.Toggle
									selected={this.state.action}
									selectedClass={'toggle-selected'}
									onChange={this.onActionChange}
									options={ADDRESS_TRANSLATION_OPTIONS}
								/>
							</Form.Group>
						</div>
						<div className={'form-row'}>
							<Form.Group
								full={true}
								label={'Description'}
								extraClass={'description-container'}
							>
								<input
									className={'form__textinput'}
									name={'policy-desc'}
									placeholder={'Policy description'}
								/>
							</Form.Group>
						</div>
					</Card>
					<div />
					<div className={'leftRight'}>
						<div className={'section'}>
							<p className={'header'}>If</p>
							<Card header={false}>
								<div className={'form-row boxContainer'}>
									{this.renderLeft()}
								</div>
							</Card>
						</div>
						<div className="middleIcon">
							<p>Translate to</p>
							<img src={dividerIcon} className={'dividerImage'} alt="" />
						</div>

						<div className={'section'}>
							<p className={'header'}>Then</p>
							<Card header={false}>
								<div className={'form-row boxContainer'}>
									{this.renderRight()}
								</div>
							</Card>
						</div>
					</div>
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

NewAddressTranslation.propTypes = {
	objects: PropTypes.array.isRequired,
	onFinish: PropTypes.func.isRequired,
	openCreateObjectModal: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	edit: PropTypes.bool,
	createModalOpenedObject: PropTypes.bool,
	item: PropTypes.object,
	options: PropTypes.array.isRequired,
	groups: PropTypes.array.isRequired,
	createGroup: PropTypes.func.isRequired,
	createService: PropTypes.func.isRequired
}

const objectsSelector = state => {
	const ecosystem = state.ecosystems.currentEcosystem
	if (ecosystem) {
		return state.objects[ecosystem.uuid]
			? state.objects[ecosystem.uuid].objects
			: []
	}

	return []
}

const mapStateToProps = state => {
	return {
		objects: objectsSelector(state),
		options: state.ecosystems.dictionaries.services,
		groups: state.ecosystems.dictionaries.groups
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createGroup: name => dispatch(createGroup(name)),
		createService: name => dispatch(createService(name))
	}
}

const ConnectedServiceField = connect(
	mapStateToProps,
	mapDispatchToProps
)(NewAddressTranslation)

NewAddressTranslation.Footer = Footer
export default ConnectedServiceField
