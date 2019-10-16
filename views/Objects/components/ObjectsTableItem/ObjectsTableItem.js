import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { COG, INFO } from '../../../../assets/Icons'
import Nsp from '../../../../components/Nsp/Nsp'
import Translator from '../../../../utils/enumTranslator'

import { getIconForObject } from '../../../../variables/Icons'

import './objects-table-item.scss'

function TableItemContainer({ children, active = false }) {
	return (
		<div className={`objects-table-item item ${active ? 'active' : ''}`}>
			{children}
		</div>
	)
}

function Field({ children, extraClass = '' }) {
	return <div className={`field ${extraClass}`}>{children}</div>
}

function ResponsiveField({ children, title, extraClass = '' }) {
	return (
		<div className={`field ${extraClass}`}>
			<p className={'field__title'}>{title}</p>
			<div className={'field__content'}>{children}</div>
		</div>
	)
}

function BasicObjectInfo({ data, onClick }) {
	const type = Translator.type(data.element)
	const category = Translator.category(data.category)
	const isLabelDefined = !(category.label === 'unkn' || type.label === 'unkn')
	return (
		<div className={'objectinfo'}>
			{isLabelDefined && (
				<div className={'objectinfo__type-container'}>
					<img
						src={getIconForObject(data.element)}
						alt={'type-icon'}
						className={`${
							data.element === 'thing' || data.element === 'gateway'
								? 'object-icon'
								: 'small-icon'
						}`}
					/>
					<p className={'normal'}>{`${category.label} / ${type.label}`}</p>
				</div>
			)}
			<div className={'objectinfo__button'} onClick={onClick}>
				{`...${data.uuid.slice(-10)}`}
				<img src={INFO} alt={'info-icon'} className={'small-icon'} />
			</div>
			<p className={'objectinfo__title normal strong'}>{data.name}</p>
		</div>
	)
}

function SmallTextField({ text }) {
	return <p className={'small'}>{text}</p>
}

function TextField({ text, strong, size }) {
	return <p className={`${size} ${strong ? 'strong' : ''}`}>{text}</p>
}

function NspInfo({ data, showAll = false, onExpand }) {
	if (!data || data.length === 0) {
		return <div className={'single-nsp'} />
	}

	const limitedData = showAll ? data : [data[0]]
	return (
		<React.Fragment>
			{limitedData.map((d, index) => (
				<div key={index} className={'single-nsp'}>
					{index === 0 && <p className={'normal nsp-text'}>Primary NSP</p>}
					{index === 1 && (
						<p className={'normal nsp-text nsp-text-secondary'}>
							Secondary NSP
						</p>
					)}
					<Nsp key={`nsp-info-index-${index}`} nsp={d} />
				</div>
			))}
			{!showAll && (
				<p className={'more'} onClick={onExpand}>
					{data.length > 1 && `+${data.length - 1} more`}
				</p>
			)}
		</React.Fragment>
	)
}

function StatusInfo({ data }) {
	return (
		<div className={'statusinfo'}>
			{data.element === 'address' && (
				<React.Fragment>
					<p className={'text grayish normal space-above-8'}>
						{data.type.toUpperCase()}
					</p>
					<p>{data.address}</p>
				</React.Fragment>
			)}
			{data.element === 'gateway' && (
				<React.Fragment>
					<p className={'text grayish normal space-above-8'}>Network</p>
					{data.peerNetworks.map((net, index) => (
						<p key={index}>{net}</p>
					))}
				</React.Fragment>
			)}
		</div>
	)
}

class ObjectTableItem extends React.PureComponent {
	state = {
		showAll: false
	}

	onClick = () => {
		this.setState({
			showAll: !this.state.showAll
		})
	}

	render() {
		const { data, responsive = false, onDetails, onEdit, nsps } = this.props
		const WrapperComponent = responsive ? ResponsiveField : Field
		return (
			<TableItemContainer active={this.state.showAll}>
				<WrapperComponent title={'Object'} extraClass={'field__info'}>
					<BasicObjectInfo data={data} onClick={onDetails} />
				</WrapperComponent>
				<WrapperComponent title={'Profile Group'} extraClass={'field__profile'}>
					<TextField
						text={data.profileGroup ? data.profileGroup.name : ''}
						size={'medium'}
						strong={false}
					/>
				</WrapperComponent>

				<WrapperComponent title={'NSP'} extraClass={'field__nsp'}>
					<NspInfo
						data={nsps}
						showAll={this.state.showAll}
						onExpand={this.onClick}
					/>
				</WrapperComponent>

				<WrapperComponent title={'Status'} extraClass={'field__status'}>
					<StatusInfo data={data} />
				</WrapperComponent>
				{false && (
					<WrapperComponent extraClass={'field__expand'}>
						<i
							className={`pe-7s-angle-down ${this.state.showAll && 'active'}`}
							onClick={this.onClick}
						/>
					</WrapperComponent>
				)}
				<WrapperComponent extraClass={'field__edit'}>
					<img src={COG} alt={'edit-icon'} onClick={onEdit} />
				</WrapperComponent>
			</TableItemContainer>
		)
	}
}

NspInfo.propTypes = {
	data: PropTypes.array.isRequired,
	showAll: PropTypes.bool,
	onExpand: PropTypes.func.isRequired
}

ResponsiveField.propTypes = {
	children: PropTypes.element.isRequired,
	title: PropTypes.string.isRequired,
	extraClass: PropTypes.string
}

Field.propTypes = {
	children: PropTypes.element.isRequired,
	extraClass: PropTypes.string
}

SmallTextField.propTypes = {
	text: PropTypes.string.isRequired
}

TextField.defaultProps = {
	text: ''
}

TextField.propTypes = {
	text: PropTypes.string.isRequired,
	strong: PropTypes.bool,
	size: PropTypes.oneOf(['small', 'medium', 'big'])
}

StatusInfo.propTypes = {
	data: PropTypes.object.isRequired
}

BasicObjectInfo.propTypes = {
	data: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired
}

TableItemContainer.propTypes = {
	children: PropTypes.array.isRequired,
	active: PropTypes.bool
}

ObjectTableItem.propTypes = {
	data: PropTypes.object.isRequired,
	responsive: PropTypes.bool.isRequired,
	onDetails: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	nsps: PropTypes.array.isRequired
}

const mapStateToProps = state => {
	return {
		nsps: state.ecosystems.dictionaries.nsps
	}
}

export default connect(mapStateToProps)(ObjectTableItem)
