import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'
import { Map, TileLayer } from 'react-leaflet'
import Field from '../../components/Field/Field'
import { LOCATION_TYPE } from '../../enums'
import Translator from '../../utils/enumTranslator'

export function renderLocationDetails(data) {
	const location = Translator.location(data.location.type)
	const region = Translator.region(data.location.region)
	return (
		<React.Fragment>
			<Field.Group full={true} label={'Description'}>
				<Field.Text text={data.description} />
			</Field.Group>
			<div className={'form-row space-above'}>
				<Field.Group label={'Location'} secondaryLabel={location.label}>
					{data.location.type === LOCATION_TYPE.COORDINATES && (
						<Field.Text
							text={`${data.location.latitude} / ${data.location.longitude}`}
						/>
					)}
					{data.location.type === LOCATION_TYPE.REGION && (
						<Field.Text text={region.label} />
					)}
				</Field.Group>
			</div>
			<Map
				style={{ height: '300px', width: '100%' }}
				center={[data.location.latitude, data.location.longitude]}
				zoom={13}
			>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</Map>
		</React.Fragment>
	)
}

export function Footer({
	edit,
	onClick,
	disabled,
	customButtonString = '',
	onDelete
}) {
	return (
		<div className={'survey__footer'}>
			<Button bsStyle={'primary'} disabled={disabled} onClick={onClick}>
				{customButtonString ? customButtonString : edit ? 'Save' : 'Add'}
			</Button>
			{edit && (
				<Button bsStyle={'danger'} onClick={onDelete}>
					{'Delete'}
				</Button>
			)}
		</div>
	)
}

export function ConfirmFooter({ onYes, onNo }) {
	return (
		<div className={'survey__footer'}>
			<Button bsStyle={'primary'} onClick={onYes}>
				{'Yes'}
			</Button>
			<Button bsStyle={'danger'} onClick={onNo}>
				{'No'}
			</Button>
		</div>
	)
}

Footer.defaultProp = {
	edit: false,
	disabled: false,
	customButtonString: ''
}

Footer.propTypes = {
	disabled: PropTypes.bool,
	edit: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	customButtonString: PropTypes.string
}

ConfirmFooter.propTypes = {
	onYes: PropTypes.func.isRequired,
	onNo: PropTypes.func.isRequired
}
