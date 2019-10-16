import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import GateIcon from '../../assets/img/PNG/gateway.png'
import AddrIcon from '../../assets/img/PNG/address.png'
import GroupIcon from '../../assets/img/PNG/Publicgroup.png'
import './accordion.scss'

class AccordionSection extends Component {
	static propTypes = {
		children: PropTypes.instanceOf(Object).isRequired,
		isOpen: PropTypes.bool.isRequired,
		label: PropTypes.object.isRequired,
		onClick: PropTypes.func.isRequired
	}

	onClick = e => {
		e.stopPropagation()
		e.preventDefault()
		this.props.onClick(this.props.label)
	}

	render() {
		const {
			onClick,
			props: { isOpen, label }
		} = this
		const arrow = (label, isOpen) => (
			<React.Fragment>
				<span className={'accordion-toggle'}>{label.name}</span>
				{isOpen ? (
					<span className={'accordion-toggle arrow'}>&#9660;</span>
				) : (
					<span className={'accordion-toggle arrow'}>&#9650;</span>
				)}
			</React.Fragment>
		)
		return (
			<div
				style={{
					padding: '5px 10px',
					borderBottom: '0.02px solid #ededed'
				}}
				className={'accordion'}
			>
				<Button
					className={'accordion-toggle toggle header'}
					onClick={onClick}
					style={{ cursor: 'pointer', userSelect: 'none' }}
				>
					<div className={'accordion-toggle'}>
						{label.type && label.type !== 'any' ? (
							<div className={'accordion-toggle'}>
								<img
									className={`accordion-toggle ${label.type}-Icon`}
									src={
										label.type === 'gateway'
											? GateIcon
											: label.type === 'address'
											? AddrIcon
											: label.type === 'group'
											? GroupIcon
											: ''
									}
									alt={label.type}
								/>
								{arrow(label, isOpen)}
							</div>
						) : label.icon ? (
							<div className={'accordion-toggle'}>
								<div className={'accordion-toggle imgContainer'}>
									<img
										height={24}
										src={label.icon}
										alt={label.type}
										className={'accordion-toggle'}
									/>
								</div>
								{arrow(label, isOpen)}
							</div>
						) : (
							<div className={'accordion-toggle'}>{arrow(label, isOpen)}</div>
						)}
					</div>
				</Button>
				{isOpen && (
					<div className={'accordionHeading'}>{this.props.children}</div>
				)}
			</div>
		)
	}
}

export default AccordionSection
