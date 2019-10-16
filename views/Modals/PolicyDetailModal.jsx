import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import 'leaflet/dist/leaflet.css'
import Card from '../../components/Card/Card'
import Field from '../../components/Field/Field'
import { Footer } from './commons'
import './modals.scss'
import { GREEN_TICK, SUCCESS } from '../../assets/Icons'

class PolicyDetailsModal extends React.Component {
	renderAction = () => {
		const { data } = this.props
		return (
			<React.Fragment>
				<div className="field__textfield">
					{data.action === 'allow' && (
						<img
							className={'action-index--image'}
							src={GREEN_TICK}
							alt="allow"
						/>
					)}
					<span>
						{data.action.charAt(0).toUpperCase() + data.action.slice(1)}
					</span>
				</div>
				{data.threatManagement && (
					<div className={'field__textfield'}>
						<img className={'action-index--image'} src={SUCCESS} alt={'tick'} />
						<span>{'Threat Protection'}</span>
					</div>
				)}
			</React.Fragment>
		)
	}

	render() {
		const { data, groups, objects } = this.props
		const list = groups.concat(objects)
		return (
			<React.Fragment>
				<div className={'modal__content padded new-policy-survey'}>
					<Card header={false}>
						<div className={'form-row full'}>
							<Field.Group label={'Name'}>
								<Field.Text text={data.name} />
							</Field.Group>
							<Field.Group full label={'Description'}>
								<Field.Text
									text={data.description ? data.description : 'None'}
								/>
							</Field.Group>
						</div>
						<div className={'form-row'}>
							<Field.Group label={'Sources'}>
								{data.sources && data.sources.length >= 1 ? (
									data.sources.map((source, index) => (
										<div key={`sources-index-${index}`}>
											<Field.Text
												text={list.find(gr => gr.uuid === source.uuid).name}
											/>
										</div>
									))
								) : (
									<Field.Text text={'Any'} />
								)}
							</Field.Group>
							<Field.Group label={'Services'}>
								{data.services && data.services.length >= 1 ? (
									data.services.map((service, index) => (
										<div key={`services-index-${index}`}>
											<Field.Text
												text={`${
													service.port
														? service.protocol + '/' + service.port
														: service.protocol
												}`}
											/>
										</div>
									))
								) : (
									<Field.Text text={'Any'} />
								)}
							</Field.Group>
							<Field.Group label={'Applications'}>
								{data.applications && data.applications ? (
									data.applications.length >= 1 &&
									data.applications.map((application, index) => (
										<div key={`applications-index-${index}`}>
											<Field.Text text={application} />
										</div>
									))
								) : (
									<Field.Text text={'Any'} />
								)}
							</Field.Group>
							<Field.Group label={'Destinations'}>
								{data.destinations && data.destinations.length >= 1 ? (
									data.destinations.map((destination, index) => (
										<div key={`destinations-index-${index}`}>
											<Field.Text
												text={
													list.find(gr => gr.uuid === destination.uuid).name
												}
											/>
										</div>
									))
								) : (
									<Field.Text text={'Any'} />
								)}
							</Field.Group>
							<Field.Group label={'Action'}>{this.renderAction()}</Field.Group>
						</div>
					</Card>
				</div>
				{this.props.delete && (
					<div className={'wedge-modal__footer'}>
						<Footer
							onClick={this.props.onFinish}
							customButtonString={'Delete'}
						/>
					</div>
				)}
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		groups: state.ecosystems.dictionaries.groups,
		objects: objectsSelector(state)
	}
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

PolicyDetailsModal.defaultProps = {
	delete: false
}

PolicyDetailsModal.propTypes = {
	data: PropTypes.object.isRequired,
	groups: PropTypes.arrayOf(
		PropTypes.shape({
			uuid: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		})
	),
	objects: PropTypes.array.isRequired,
	delete: PropTypes.bool,
	onFinish: PropTypes.func
}

export default connect(mapStateToProps)(PolicyDetailsModal)
