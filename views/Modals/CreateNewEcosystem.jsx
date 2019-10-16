import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import AddButton from '../../components/AddButton/AddButton'
import Card from '../../components/Card/Card'
import Form from '../../components/Form/Form'
import Nsp from '../../components/Nsp/Nsp'
import { Footer } from './commons'
import capitalize from '../../utils/capitalize'

import './modals.scss'
import { connect } from 'react-redux'

class CreateNewEcosystem extends React.Component {
	constructor(props) {
		super(props)
		const { nsps } = this.props

		this.state = {
			name: '',
			users: [],
			nsps: nsps
			/*nsps: [
				{
					name:
						process.env.REACT_APP_ENV_NAME === 'PROD'
							? `${process.env.REACT_APP_ENV_NAME}-EWR1`
							: 'EWR-1',
					status: 'green'
				}
			]*/
		}
	}

	changeField = (field, value) => {
		this.setState({
			[field]: value
		})
	}

	onNameChange = val => this.changeField('name', val)

	onFinish = () => {
		if (this.validate()) {
			this.props.onFinish(this.state)
		}
	}

	validate() {
		return this.state.name.length > 0
	}

	onPotentialItemChange = (value, field) => {
		this.changeField(`potential${capitalize(field)}`, value)
	}

	onNewItemManual = field => {
		this.setState({
			[field]: [
				...this.state[field],
				this.state[`potential${capitalize(field)}`]
			],
			[`potential${capitalize(field)}`]: ''
		})
	}

	onRemoveItem = (index, field) => {
		this.setState({
			[field]: this.state[field].filter((s, i) => i !== index)
		})
	}

	render() {
		return (
			<React.Fragment>
				<div className={'modal__content padded create-new-ecosystem'}>
					<Card header={false}>
						<div className={'flex-column-container'}>
							<div className={'flex-column'}>
								<Form.Group required label={'Name'}>
									<Form.Text
										value={this.state.name}
										onChange={this.onNameChange}
										placeholder={'Name'}
									/>
								</Form.Group>
								<div className={'hide-component component-coming-soon'}>
									<Form.Group required label={'Associated Users'}>
										<div>
											{this.state.users.map((a, index) => (
												<div
													key={`users-index-${index}`}
													className={'ecosystem--users_single'}
												>
													<p className={'medium strong'}>{a}</p>
													<i
														className={'pe-7s-close red-delete-icon'}
														onClick={() => this.onRemoveItem(index, 'users')}
													/>
												</div>
											))}
											<div className={'hide-component flex-row baseline'}>
												<Form.Text
													value={this.state.potentialUsers}
													onChange={val =>
														this.onPotentialItemChange(val, 'users')
													}
													placeholder={'Add new user'}
												/>
												<AddButton
													onClick={() => this.onNewItemManual('users')}
													className={'space-left'}
												/>
											</div>
										</div>
									</Form.Group>
								</div>
							</div>
							<div className={'flex-column'}>
								<Form.Group required label={'Associated NSPs'}>
									<div>
										{this.state.nsps.map((nsp, index) => (
											<Nsp key={index} nsp={nsp} />
										))}
										<div className={'hide-component flex-row baseline'}>
											<Form.Text
												value={this.state.potentialNsps}
												onChange={val =>
													this.onPotentialItemChange(val, 'nsps')
												}
												placeholder={'Add new NSP'}
											/>
											<AddButton
												onClick={() => this.onNewItemManual('nsps')}
												className={'space-left'}
											/>
										</div>
									</div>
								</Form.Group>
							</div>
						</div>
					</Card>
				</div>
				<div className={'wedge-modal__footer'}>
					<Footer
						disabled={!this.validate()}
						onClick={this.onFinish}
						edit={this.props.edit}
					/>
				</div>
			</React.Fragment>
		)
	}
}

CreateNewEcosystem.propTypes = {
	onFinish: PropTypes.func.isRequired,
	edit: PropTypes.bool,
	item: PropTypes.object,
	nsps: PropTypes.array.isRequired
}

const mapStateToProps = state => {
	return {
		nsps: state.ecosystems.dictionaries.nsps
	}
}

const mapDispatchToProps = () => {
	return {}
}

const ConnectedCreateNewEcosystem = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateNewEcosystem)

CreateNewEcosystem.Footer = Footer
export default ConnectedCreateNewEcosystem
