import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { getThingToken } from '../../store/objects/actions'
import 'leaflet/dist/leaflet.css'
import Card from '../../components/Card/Card'
import Field from '../../components/Field/Field'
import Translator from '../../utils/enumTranslator'
import './modals.scss'

class ThingDetailsModal extends React.Component {
	static defaultProps = {
		thingToken: ''
	}

	fetchThingToken = () => {
		if (this.props.thingToken !== '***********') return
		this.props.getThingToken(this.props.data.uuid)
	}

	render() {
		const { data, thingToken } = this.props
		const type = Translator.type(data.element)
		const profileGroup = data.profileGroup || 'Unknown group'
		const thingTokenLabel =
			thingToken !== '***********'
				? 'Thing Secret'
				: 'Get Thing Secret (Click to view)'
		return (
			<React.Fragment>
				<div className={'modal__content padded new-thing-survey'}>
					<Card header={false}>
						<div className={'form-row'}>
							<Field.Group label={'Name'}>
								<Field.Text text={data.name} />
							</Field.Group>
							<Field.Group label={'Profile Group'}>
								<Field.Text text={profileGroup.name} />
							</Field.Group>
						</div>
						<div className={'form-row'}>
							<Field.Group label={'Category / Type'}>
								<Field.Text text={`${data.category} / ${type.label}`} />
							</Field.Group>
							<Field.Group label={'Operational Importance'}>
								<Field.Text text={data.assetValue} />
							</Field.Group>
						</div>
						<div
							className={cx('form-row', { 'active-text': !!thingToken })}
							onClick={this.fetchThingToken}
						>
							<Field.Group self label={thingTokenLabel}>
								{thingToken === '***********' ? (
									<Field.Text full={true} text={thingToken} />
								) : (
									<Field.Text copy={true} text={thingToken} />
								)}
							</Field.Group>
						</div>
					</Card>
				</div>
			</React.Fragment>
		)
	}
}

ThingDetailsModal.propTypes = {
	data: PropTypes.object.isRequired,
	getThingToken: PropTypes.func.isRequired,
	thingToken: PropTypes.string.isRequired,
	onFinish: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
	const ecosystemId = state.ecosystems.currentEcosystem.uuid
	const thingToken =
		state.objects[ecosystemId].objects.find(
			obj => obj.uuid === ownProps.data.uuid
		).token || '***********'

	return {
		thingToken
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getThingToken
		},
		dispatch
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ThingDetailsModal)
