import PropTypes from 'prop-types'
import React from 'react'
import GoArrow from '../../assets/img/PNG/arrow.png'
import ThingIcon from '../../assets/img/PNG/device.png'
import AddressIcon from '../../assets/img/PNG/address.png'
import GatewayIcon from '../../assets/img/PNG/gateway.png'
import './modals.scss'

const AVAILABLE_TYPES = [
	{
		name: 'thing',
		title: 'Thing',
		icon: ThingIcon,
		iconStyle: {
			width: 30,
			height: 17
		}
	},
	{
		name: 'gateway',
		title: 'Gateway',
		icon: GatewayIcon,
		iconStyle: {
			width: 30,
			height: 17
		}
	},
	{
		name: 'address',
		title: 'Address',
		icon: AddressIcon
	}
]

export default class NewObjectType extends React.PureComponent {
	render() {
		const { onTypeChoose } = this.props
		return (
			<div className={'modal__content padded'}>
				<p className={'big'}>What type of object would you like to add?</p>
				{AVAILABLE_TYPES.map(type => (
					<React.Fragment key={`types-index-${type.name}`}>
						<div className={'divider divider-horizontal'} />
						<div
							className={'option-container'}
							onClick={() => onTypeChoose(type.name)}
						>
							<div className={'type-icon--container'}>
								<img
									className={'type-icon'}
									src={type.icon}
									alt={`${type.name}-icon`}
									style={type.iconStyle}
								/>
							</div>
							<p className={'option medium'}>{type.title}</p>
							<img src={GoArrow} className={'go-arrow'} alt={'go-arrow'} />
						</div>
					</React.Fragment>
				))}
			</div>
		)
	}
}

NewObjectType.propTypes = {
	onTypeChoose: PropTypes.func.isRequired
}
