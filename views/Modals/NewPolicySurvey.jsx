import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import AddButton from '../../components/AddButton/AddButton'
import AdvancedContainer from '../../components/AdvancedContainer/AdvancedContainer'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import {
	ACTION_TYPES,
	ACTION_TYPES_OPTIONS,
	EXPIRATION_TYPE_OPTIONS,
	MOCK_OPTIONS
} from '../../enums'
import { Footer } from './commons'
import {
	createGroup,
	createService
} from '../../store/creational-scenario-actions'
import policyValidationSchema from '../../validationSchemas/policyValidationSchema'
import populator from '../../utils/populator'
import capitalize from '../../utils/capitalize'
import CreateServiceDropdown from '../../components/CreateServiceDropdown/CreateServiceDropdown'
import SelectWithCreateObject from '../../components/SelectWithCreateObject/SelectWithCreateObject'
import './modals.scss'

function isSelected(element, arr) {
	return arr.findIndex(ps => ps.value === element) !== -1
}

class NewPolicySurvey extends React.Component {
	constructor(props) {
		super(props)
		const { item } = this.props
		let { groups, objects, services } = this.props
		groups = this.processGroups(groups, objects)
		const any = { value: 'any', label: 'any', type: 'any' }
		let selectedSources = [],
			selectedServices = [],
			selectedApplications = [],
			selectedDestinations = [],
			potentialSources = '',
			potentialServices = '',
			potentialApplications = '',
			potentialDestinations = ''
		if (item) {
			item.sources && item.sources.length
				? item.sources.forEach(src =>
						selectedSources.push(
							populator.group(groups.find(gr => gr.uuid === src.uuid))
						)
				  )
				: (potentialSources = any)
			item.services && item.services.length
				? item.services.forEach(service => {
						const svc = this.props.services.filter(ser => {
							return (
								ser.protocol === service.protocol &&
								(ser.port && service.port ? ser.port === service.port : true)
							)
						})
						if (svc.length) {
							selectedServices.push({
								...svc[0],
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
				: (potentialServices = any)
			item.applications && item.applications.length
				? item.applications.forEach(application => {
						const app = this.props.applications.filter(a => {
							return a.name === application
						})
						selectedApplications.push({
							value: app[0].id,
							label: app[0].name
						})
				  })
				: (potentialApplications = any)
			item.destinations && item.destinations.length
				? item.destinations.forEach(dst =>
						selectedDestinations.push(
							populator.group(groups.find(gr => gr.uuid === dst.uuid))
						)
				  )
				: (potentialDestinations = any)
		}
		this.state = {
			name: item ? item.name : '',
			description: item && item.description ? item.description : '',
			groups,
			services,
			selectedSources,
			selectedServices,
			selectedApplications,
			selectedDestinations,
			potentialSources,
			potentialServices,
			potentialApplications,
			potentialDestinations,
			threatManagement: item ? item.threatManagement : true,
			action: item
				? item.action === 'allow'
					? ACTION_TYPES.ALLOW
					: ACTION_TYPES.DENY
				: ACTION_TYPES.ALLOW,
			errors: [],
			isSubmitted: false
		}
	}

	componentDidMount() {
		const { name, description } = this.state
		document.getElementsByName('policy-name')[0].value = name
		document.getElementsByName('policy-desc')[0].value = description
	}

	componentDidUpdate(prevProps) {
		if (
			(this.props.groups &&
				prevProps.groups.length !== this.props.groups.length) ||
			(this.props.objects &&
				prevProps.objects.length !== this.props.objects.length)
		) {
			let { groups, objects } = this.props
			groups = this.processGroups(groups, objects)
			this.setState({ groups })
		}

		if (this.props.services && this.props.services.length) {
			if (prevProps.services.length !== this.props.services.length) {
				let { services } = this.props
				this.setState({ services })
			}
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

	changeField = (field, value) => {
		this.setState({
			[field]: value
		})
	}

	handleGroupCreate = name => {
		this.props.createGroup(name)
	}
	handleServiceCreate = service => {
		this.props.createService(service)
	}

	onNameChange = val => {
		this.changeField('name', val)
	}
	onNotesChange = val => this.changeField('notes', val)
	onDescriptionChange = val => this.changeField('description', val)
	onExpiryTypeChange = val => this.changeField('expiryType', val)
	onActionChange = val => {
		this.setState({
			action: val,
			threatManagement: val !== ACTION_TYPES.DENY
		})
	}

	onThreatManagementChange = val => this.changeField('threatManagement', val)

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
						let services = []
						let {
							potentialSources,
							potentialServices,
							potentialApplications,
							potentialDestinations,
							selectedSources,
							selectedServices,
							selectedApplications,
							selectedDestinations,
							name,
							description,
							threatManagement
						} = this.state
						selectedSources =
							potentialSources && potentialSources.value !== 'any'
								? [...selectedSources, potentialSources]
								: selectedSources
						selectedServices =
							potentialServices && potentialServices.value !== 'any'
								? [...selectedServices, potentialServices]
								: selectedServices
						selectedApplications =
							potentialApplications && potentialApplications.value !== 'any'
								? [...selectedApplications, potentialApplications]
								: selectedApplications
						selectedDestinations =
							potentialDestinations && potentialDestinations.value !== 'any'
								? [...selectedDestinations, potentialDestinations]
								: selectedDestinations
						let origAction = ACTION_TYPES_OPTIONS.find(
							opt => opt.value === this.state.action
						).label.toLowerCase()
						origAction = origAction === 'allow' ? 'allow' : 'drop'
						services = selectedServices.map(service => {
							if (service.protocol === 'icmp') {
								return {
									name: service.name,
									protocol: service.protocol,
									code: service.code,
									type: service.type
								}
							} else {
								return {
									name: service.name,
									protocol: service.protocol,
									port: service.port
								}
							}
						})

						this.props.onFinish({
							name,
							description,
							sources: selectedSources.map(src => ({
								type: src.type,
								uuid: src.value
							})),
							services,
							applications: selectedApplications.map(app => app.label),
							destinations: selectedDestinations.map(dest => ({
								type: dest.type,
								uuid: dest.value
							})),
							threat_management: threatManagement,
							action: origAction,
							position: 0,
							enabled: true
						})
					} catch (err) {
						this.setState({
							errors: [
								this.props.edit
									? 'Failed to Update Policy'
									: 'Failed to Add Policy'
							]
						})
					}
				}
			}
		)
	}

	onPotentialItemChange = (value, field) => {
		this.changeField(`potential${capitalize(field)}`, value)
		if (value.value === 'any') {
			this.setState({
				[`selected${capitalize(field)}`]: []
			})
		}
	}

	onNewItemManual = field => {
		let newField = this.state[`selected${capitalize(field)}`]
		newField.push(this.state[`potential${capitalize(field)}`])
		this.setState({
			[`selected${capitalize(field)}`]: newField,
			[`potential${capitalize(field)}`]: ''
		})
	}

	onRemoveItem = (index, field) => {
		this.setState({
			[`selected${capitalize(field)}`]: this.state[
				`selected${capitalize(field)}`
			].filter((item, id) => id !== index)
		})
	}

	validOptions = () => {
		const { errors } = this.state

		if (!this.state.selectedSources.length && !this.state.potentialSources) {
			errors.push('Source is required.')
		}
		if (!this.state.selectedServices.length && !this.state.potentialServices) {
			errors.push('Service is required.')
		}
		if (
			!this.state.selectedApplications.length &&
			!this.state.potentialApplications
		) {
			errors.push('Application is required.')
		}
		if (
			!this.state.selectedDestinations.length &&
			!this.state.potentialDestinations
		) {
			errors.push('Destination is required.')
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
			policyValidationSchema.validateSync(this.state, { abortEarly: false })
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
				<div className={'modal__content padded new-policy-survey'}>
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
						<div className={'form-row row'}>
							<Form.Group
								extraClass={'sources-container'}
								required={true}
								label={'Source'}
								className={'col-md-2'}
							>
								{this.state.selectedSources.length >= 1 &&
									this.state.selectedSources.map((a, index) => (
										<div
											key={`sources-${index}`}
											className={'policy--sources_single'}
										>
											<p className={'medium strong'}>{a.label}</p>
											<i
												className={'pe-7s-close red-delete-icon'}
												onClick={() => this.onRemoveItem(index, 'sources')}
											/>
										</div>
									))}
								<div className={'flex-row baseline'}>
									<SelectWithCreateObject
										onCreate={this.handleGroupCreate}
										selected={this.state.potentialSources}
										onChange={val => {
											this.onPotentialItemChange(val, 'sources')
										}}
										placeholder={'Source'}
										openCreateObjectModal={this.props.openCreateObjectModal}
										createModalText={'Select Source Type'}
										fieldType={'Source'}
										createModalOpenedObject={this.props.createModalOpenedObject}
										options={[
											{ value: 'any', label: 'any', type: 'any' },
											...this.state.groups
												.filter(
													group =>
														!isSelected(group.uuid, this.state.selectedSources)
												)
												.map(group => ({
													value: group.uuid,
													label: group.name,
													type: group.type
												}))
										]}
									/>
									<AddButton
										onClick={() => this.onNewItemManual('sources')}
										className={`space-left ${
											this.state.potentialSources &&
											this.state.potentialSources.value !== 'any'
												? ''
												: 'disabled'
										}`}
									/>
								</div>
							</Form.Group>

							<Form.Group
								extraClass={'services-container'}
								required={true}
								label={'Service'}
								className={'col-md-2'}
							>
								{this.state.selectedServices.length >= 1 &&
									this.state.selectedServices.map((svc, index) => (
										<div
											key={`services-${index}`}
											className={'policy--services_single'}
										>
											<p className={'medium strong'}>{svc.label}</p>
											<i
												className={'pe-7s-close red-delete-icon'}
												onClick={() => this.onRemoveItem(index, 'services')}
											/>
										</div>
									))}
								<div className={'flex-row baseline'}>
									<CreateServiceDropdown
										onCreate={this.handleServiceCreate}
										selected={this.state.potentialServices}
										onChange={val => {
											this.onPotentialItemChange(val, 'services')
										}}
										placeholder={'Service'}
										options={[
											{ value: 'any', label: 'any', type: 'any' },
											...this.state.services
												.filter(
													option =>
														!isSelected(
															option.uuid,
															this.state.selectedServices
														)
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
									<AddButton
										onClick={() => this.onNewItemManual('services')}
										className={`space-left ${
											this.state.potentialServices &&
											this.state.potentialServices.value !== 'any'
												? ''
												: 'disabled'
										}`}
									/>
								</div>
							</Form.Group>
							<Form.Group
								extraClass={'applications-container'}
								required={true}
								label={'Application'}
								className={'col-md-2'}
							>
								{this.state.selectedApplications.length >= 1 &&
									this.state.selectedApplications.map((app, index) => (
										<div
											key={`applications-${index}`}
											className={'policy--application_single'}
										>
											<p className={'medium strong'}>{app.label}</p>
											<i
												className={'pe-7s-close red-delete-icon'}
												onClick={() => this.onRemoveItem(index, 'applications')}
											/>
										</div>
									))}
								<div className={'flex-row baseline'}>
									<Form.Select
										value={this.state.potentialApplications}
										onChange={val => {
											this.onPotentialItemChange(val, 'applications')
										}}
										placeholder={'Application'}
										options={[
											{ value: 'any', label: 'any' },
											...this.props.applications
												.filter(
													app =>
														!isSelected(app.id, this.state.selectedApplications)
												)
												.map(app => ({
													value: app.id,
													label: `${app.name}`
												}))
										]}
									/>
									<AddButton
										onClick={() => this.onNewItemManual('applications')}
										className={`space-left ${
											this.state.potentialApplications &&
											this.state.potentialApplications.value !== 'any'
												? ''
												: 'disabled'
										}`}
									/>
								</div>
							</Form.Group>
							<Form.Group
								required={true}
								extraClass={'destinations-container'}
								label={'Destination'}
								className={'col-md-2'}
							>
								{this.state.selectedDestinations.length >= 1 &&
									this.state.selectedDestinations.map((dest, index) => (
										<div
											key={`destinations-index-${index}`}
											className={'policy--destination_single'}
										>
											<p className={'medium strong'}>{dest.label}</p>
											<i
												className={'pe-7s-close red-delete-icon'}
												onClick={() => this.onRemoveItem(index, 'destinations')}
											/>
										</div>
									))}
								<div className={'flex-row baseline'}>
									<SelectWithCreateObject
										onCreate={this.handleGroupCreate}
										selected={this.state.potentialDestinations}
										onChange={val => {
											this.onPotentialItemChange(val, 'destinations')
										}}
										placeholder={'Destination'}
										openCreateObjectModal={this.props.openCreateObjectModal}
										createModalText={'Select Destination Type'}
										fieldType={'Destination'}
										options={[
											{ value: 'any', label: 'any', type: 'any' },
											...this.state.groups
												.filter(
													group =>
														!isSelected(
															group.uuid,
															this.state.selectedDestinations
														)
												)
												.map(group => ({
													value: group.uuid,
													label: group.name,
													type: group.type
												}))
										]}
									/>
									<AddButton
										onClick={() => this.onNewItemManual('destinations')}
										className={`space-left ${
											this.state.potentialDestinations &&
											this.state.potentialDestinations.value !== 'any'
												? ''
												: 'disabled'
										}`}
									/>
								</div>
							</Form.Group>
							<Form.Group required center={true} label={'Action'}>
								<Form.Toggle
									selected={this.state.action}
									selectedClass={'toggle-selected'}
									onChange={this.onActionChange}
									options={ACTION_TYPES_OPTIONS}
								/>
								<label
									className={`checkbox-label wedge-checkbox-container ${
										this.state.action === ACTION_TYPES.DENY ? 'disabled' : ''
									}`}
								>
									<input
										type="checkbox"
										checked={this.state.threatManagement}
										disabled={this.state.action === ACTION_TYPES.DENY}
										onChange={ev =>
											this.onThreatManagementChange(ev.target.checked)
										}
									/>
									<span className={'checkmark'} />
									<span className={'title'}>Threat protection</span>
								</label>
							</Form.Group>
						</div>
						{false && (
							<div className={'advance component-coming-soon'}>
								<AdvancedContainer>
									<div className={'form-row'}>
										<Form.Group
											extraClass={'notes-container'}
											full
											label={'Notes'}
										>
											<Form.Text
												value={this.state.notes}
												onChange={this.onNotesChange}
												placeholder={'Notes'}
												multiline={true}
												rows={8}
											/>
										</Form.Group>
										<Form.Group
											extraClass={'expiry-container'}
											label={'Expiry'}
										>
											<Form.Text
												value={this.state.expiry}
												onChange={this.onExpiryChange}
												placeholder={'Expiry'}
											/>
											<Form.Toggle
												selected={this.state.expiryType}
												selectedClass={'toggle-selected'}
												onChange={this.onExpiryTypeChange}
												options={EXPIRATION_TYPE_OPTIONS}
											/>
										</Form.Group>
										<div className={'actions-container'}>
											<Form.Group label={'URL Filter'}>
												<Form.Select
													value={this.state.urlFilter}
													onChange={this.onAssetChange}
													placeholder={'Abused drug'}
													options={MOCK_OPTIONS}
												/>
											</Form.Group>
											<Form.Group label={'File Type'}>
												<Form.Select
													value={this.state.fileType}
													onChange={this.onAssetChange}
													placeholder={'XML'}
													options={MOCK_OPTIONS}
												/>
											</Form.Group>
											<Form.Group label={'Pattern Filter'}>
												<Form.Select
													value={this.state.patternFilter}
													onChange={this.onAssetChange}
													placeholder={'Data filter'}
													options={MOCK_OPTIONS}
												/>
											</Form.Group>
										</div>
									</div>
								</AdvancedContainer>
							</div>
						)}
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

NewPolicySurvey.propTypes = {
	objects: PropTypes.array.isRequired,
	onFinish: PropTypes.func.isRequired,
	openCreateObjectModal: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	edit: PropTypes.bool,
	createModalOpenedObject: PropTypes.bool,
	item: PropTypes.object,
	services: PropTypes.array.isRequired,
	groups: PropTypes.array.isRequired,
	applications: PropTypes.array.isRequired,
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
		services: state.ecosystems.dictionaries.services,
		groups: state.ecosystems.dictionaries.groups,
		applications: state.ecosystems.dictionaries.applications
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
)(NewPolicySurvey)

NewPolicySurvey.Footer = Footer
export default ConnectedServiceField
