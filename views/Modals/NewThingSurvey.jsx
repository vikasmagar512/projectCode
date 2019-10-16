import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import SelectWithCreate from '../../components/SelectWithCreate/SelectWithCreate'
import { OBJECT_CATEGORIES, OBJECT_TYPES } from '../../enums'
import { createGroup } from '../../store/creational-scenario-actions'
import Translator from '../../utils/enumTranslator'
import populator from '../../utils/populator'
import thingValidationSchema from '../../validationSchemas/thingValidationSchema'
import { Footer } from './commons'
import get from 'lodash/get'
import './modals.scss'

class NewThingSurvey extends React.Component {
	constructor(props) {
		super(props)
		if (props.edit) {
			this.state = {
				uuid: props.item.uuid,
				name: get(props, 'item.name'),
				category: Translator.category(props.item.category),
				type: OBJECT_TYPES[0],
				asset: props.item.assetValue,
				profile: populator.group(
					props.groups.find(gr => gr.uuid === props.item.profileGroup.uuid)
				),
				errors: [],
				nameError: '',
				isSubmitted: false
			}
		} else {
			this.state = {
				name: '',
				profile:
					props.groups.length === 1 ? populator.group(props.groups[0]) : null,
				category: OBJECT_CATEGORIES[0],
				type: OBJECT_TYPES[0],
				asset: 1,
				errors: [],
				nameError: '',
				isSubmitted: false
			}
		}
	}

	changeField = (field, value) => {
		this.setState({
			[field]: value,
			nameError: ''
		})
		if (field === 'name' && value.length > 35) {
			this.setState({
				nameError: 'Max length exceeded'
			})
		}
	}

	handleGroupCreate = name => {
		this.props.createGroup(name)
	}

	onNameChange = val => this.changeField('name', val)
	onProfileChange = val => this.changeField('profile', val)
	onCategoryChange = val => this.changeField('category', val)
	onTypeChange = val => this.changeField('type', val)
	onAssetChange = val => {
		const numberRegex = /^[0-9]+$/
		const finalValue = val && val.match(numberRegex) ? parseInt(val) : 0
		this.changeField('asset', finalValue)
	}
	onExpiryChange = val => this.changeField('expiry', val)
	onDescriptionChange = val => this.changeField('description', val)
	onLocationChange = val => this.changeField('location', val)
	onLatChange = val => this.changeField('lat', val)
	onLongChange = val => this.changeField('long', val)
	onExpiryTypeChange = val => this.changeField('expiryType', val)
	onRegionChange = val => this.changeField('region', val)

	onFinish = () => {
		this.setState(
			{
				isSubmitted: true
			},
			() => {
				if (this.validate()) {
					this.props.onFinish(this.state)
				}
			}
		)
	}

	validate() {
		if (!this.state.isSubmitted) {
			return true
		}
		try {
			thingValidationSchema.validateSync(this.state, { abortEarly: false })
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
				<div className={'modal__content padded new-thing-survey'}>
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
								<p className="error-text">{this.state.nameError}</p>
							</Form.Group>
							<Form.Group
								required={true}
								label={'Profile Group'}
								extraClass={'paddingBottom'}
							>
								<SelectWithCreate
									onCreate={this.handleGroupCreate}
									selected={this.state.profile}
									onChange={this.onProfileChange}
									placeholder={'Select profile group'}
									createOpened={true}
									options={this.props.groups.map(populator.group)}
								/>
							</Form.Group>
						</div>
						<div className={'form-row'}>
							<Form.Group
								required={true}
								label={'Category'}
								extraClass={'paddingBottom'}
							>
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
						<Form.Group label={'Operational Importance'}>
							<Form.Text
								value={this.state.asset}
								onChange={this.onAssetChange}
								placeholder={'Asset performance'}
							/>
						</Form.Group>
					</Card>
				</div>
				<div className={'wedge-modal__footer'}>
					<Footer
						onClick={this.onFinish}
						edit={this.props.edit}
						customButtonString={`${this.props.edit ? 'Save' : 'Add'}`}
						onDelete={this.props.onDelete}
					/>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		groups: state.ecosystems.dictionaries.groups
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createGroup: name => dispatch(createGroup(name))
	}
}

NewThingSurvey.defaultProps = {
	edit: false,
	groups: []
}

NewThingSurvey.propTypes = {
	onFinish: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	edit: PropTypes.bool,
	item: PropTypes.object,
	groups: PropTypes.arrayOf(
		PropTypes.shape({
			uuid: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		})
	),
	createGroup: PropTypes.func.isRequired
}

NewThingSurvey.Footer = Footer
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewThingSurvey)
