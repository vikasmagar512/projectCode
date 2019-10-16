import 'leaflet/dist/leaflet.css'
import PropTypes from 'prop-types'
import React from 'react'
import Card from '../../components/Card/Card'
import Field from '../../components/Field/Field'
import Translator from '../../utils/enumTranslator'
import './modals.scss'

class AddressDetailsModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = { tootipText: props.data.uuid, timerId: 0 }
	}

	componentWillUnmount() {
		clearTimeout(this.state.timerId)
	}

	render() {
		const { data } = this.props
		const category = Translator.category(data.category)

		return (
			<div className={'modal__content padded new-address-survey'}>
				<Card header={false}>
					<div className={'form-row marBelow'}>
						<Field.Group self label={'Name'}>
							<Field.Text text={data.name} />
						</Field.Group>
						<Field.Group
							self={data.type === 'ipv6'}
							label={`${data.type.toUpperCase()}`}
						>
							<Field.Text text={data.address} />
						</Field.Group>
					</div>
					<div className={'form-row'}>
						<Field.Group label={'Category'}>
							<Field.Text text={`${category.label}`} />
						</Field.Group>
					</div>
					<Field.Group self>
						<Field.Text copy={true} text={`${data.uuid}`} />
					</Field.Group>
				</Card>
			</div>
		)
	}
}

AddressDetailsModal.propTypes = {
	data: PropTypes.object.isRequired
}

export default AddressDetailsModal
