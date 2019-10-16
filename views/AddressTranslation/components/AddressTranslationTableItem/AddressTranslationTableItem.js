import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import {
	COG,
	GREEN_TICK,
	INFO,
	RED_TICK,
	SUCCESS
} from '../../../../assets/Icons'
import ServiceIcon from '../../../../assets/img/PNG/Acreto_Icon 16.png'
import {
	getArrow,
	getIconForRegionName,
	getIconForStatus
} from '../../../../variables/Icons'

import './AddressTranslation-table-item.scss'

//import ApplicationIcon from '../../../../assets/img/PNG/Acreto_Icon 17.png'

function TableItemContainer({ children, active = false }) {
	return (
		<div className={`policy-table-item item ${active ? 'active' : ''}`}>
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
	// const expiryType = Translator.expirationType(data.expiry.type)
	return (
		<div className={'policyinfo'}>
			<div className={'policyinfo__button'} onClick={onClick}>
				<span className={'button__text'}>{data.uuid}</span>
				<img src={INFO} alt={'info-icon'} className={'small-icon'} />
			</div>
			<p className={'policyinfo__title normal strong'}>{data.name}</p>
		</div>
	)
}

function SmallTextField({ text }) {
	return text.length ? (
		text.map((t, index) => (
			<p key={`text-field-${index}`} className={'medium strong'}>
				{t}
			</p>
		))
	) : (
		<p className={'medium strong'}>Any</p>
	)
}

function TextField({ text, strong, size }) {
	return <p className={`${size} ${strong ? 'strong' : ''}`}>{text}</p>
}

function NspInfo({ data, showAll = false, onExpand }) {
	const limitedData = showAll ? data : [data[0]]
	return (
		<React.Fragment>
			{limitedData &&
				limitedData.map((d, index) => (
					<div key={index} className={'single-nsp'}>
						{index === 0 && <p className={'normal nsp-text'}>Primary NSP</p>}
						{index === 1 && (
							<p className={'normal nsp-text nsp-text-secondary'}>
								Secondary NSP
							</p>
						)}
						<div
							key={`nsp-info-index-${index}`}
							className={'primary-container'}
						>
							<img
								src={getArrow(d.status === 'good')}
								className={'arrow-status'}
								alt={'arrow-status'}
							/>
							<img
								src={getIconForRegionName(d.name, d.status === 'good')}
								alt={'region-icon'}
								className={'region-icon'}
							/>
							<div className={'divider big'} />
							<div className={'flex-column'}>
								<p className={'small strong nsp-name'}>{d.name}</p>
								<div className={'flex-row'}>
									<p className={'small'}>
										{d.ping} <span className={'unit'}>ms</span>
									</p>
									<div className={'divider small'} />
									<p className={'small'}>
										{`${d.loss}% `}
										<span className={'unit'}>Loss</span>
									</p>
								</div>
							</div>
						</div>
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

class ServiceField extends React.PureComponent {
	state = {
		service: {}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.options.length !== this.props.options.length) {
			const lastOption = this.props.options[this.props.options.length - 1]
			this.setState({
				service: {
					value: lastOption.id,
					label: `${
						lastOption.port
							? lastOption.protocol + '/' + lastOption.port
							: lastOption.protocol
					} (${lastOption.name})`
				}
			})
		}
	}

	render() {
		const { services, options } = this.props
		return (
			<React.Fragment>
				{services.length ? (
					services.map((service, index) => {
						return (
							<div
								className={'single-service'}
								key={`services-index-${index}-${service.id}`}
							>
								<img
									src={ServiceIcon}
									alt={'service-icon'}
									className={'small-icon'}
								/>
								<div>
									<p className={'medium strong'}>{`${
										service.port
											? service.protocol.toUpperCase() + '/' + service.port
											: service.protocol.toUpperCase()
									}`}</p>
									<p className={'small'}>
										(
										{
											options.find(
												opt =>
													opt.protocol === service.protocol &&
													(opt.port && service.port
														? opt.port === service.port
														: true)
											).name
										}
										)
									</p>
								</div>
							</div>
						)
					})
				) : (
					<p className={'medium strong'}>any</p>
				)}
			</React.Fragment>
		)
	}
}

const ConnectedServiceField = connect(
	state => ({
		options: state.ecosystems.dictionaries.services
	}),
	null
)(ServiceField)

function ApplicationField({ applications }) {
	return (
		<React.Fragment>
			{applications && applications.length ? (
				applications.map((application, index) => {
					return (
						<div
							className={'single-application'}
							key={`application-index-${index}`}
						>
							<p className={'medium strong'}>{application}</p>
						</div>
					)
				})
			) : (
				<p className={'medium strong'}>any</p>
			)}
		</React.Fragment>
	)
}

function StatusInfo({ data }) {
	return (
		<div className={'statusinfo'}>
			<div className={'centered-row status-text-container'}>
				<img
					src={getIconForStatus(data.status)}
					className={'tiny-icon'}
					alt={'status-icon'}
				/>
				<p className={'normal capitalize'}>{data.status}</p>
			</div>
			<p className={'text medium grayish space-above-8'}>Last change</p>
			<p className={'text medium'}>{moment(data.lastChange).fromNow()}</p>
		</div>
	)
}

function ActionField({ data }) {
	const mapping = {
		allow: GREEN_TICK,
		deny: RED_TICK,
		drop: RED_TICK
	}
	return (
		data && (
			<React.Fragment>
				<img
					className={'action-index--image'}
					src={mapping[data.action]}
					alt="allow"
				/>
				<span className={'medium strong'}>
					{data.action.charAt(0).toUpperCase() + data.action.slice(1)}
				</span>
				{data.threatManagement && (
					<div className={'field__textfield'}>
						<img className={'action-index--image'} src={SUCCESS} alt={'tick'} />
						<span>{'Threat Protection'}</span>
					</div>
				)}
			</React.Fragment>
		)
	)
}

class AddressTranslationTableItem extends React.PureComponent {
	constructor(props) {
		super(props)
		let { objects, groups } = this.props
		groups = groups.concat(objects)
		this.state = {
			showAll: false,
			groups
		}
	}

	componentDidUpdate(prevProps) {
		if (
			(this.props.groups &&
				this.props.groups.length !== prevProps.groups.length) ||
			(this.props.objects &&
				prevProps.objects.length !== this.props.objects.length)
		) {
			let { groups, objects } = this.props
			groups = groups.concat(objects)
			this.setState({ groups })
		}
	}

	onClick = () => {
		this.setState({
			showAll: !this.state.showAll
		})
	}

	render() {
		const {
			data,
			responsive = false,
			onDetails,
			onEdit,
			index = 0
		} = this.props
		const WrapperComponent = responsive ? ResponsiveField : Field
		const sources = data.sources.map(
			src => this.state.groups.find(gr => gr.uuid === src.uuid).name
		)
		const destinations = data.destinations.map(
			dst => this.state.groups.find(gr => gr.uuid === dst.uuid).name
		)
		return (
			<TableItemContainer active={this.state.showAll}>
				<div className={'policy__counter'}>
					<span>{index}</span>
				</div>
				<WrapperComponent title={'Policy'} extraClass={'field__info'}>
					<BasicObjectInfo data={data} onClick={onDetails} />
				</WrapperComponent>
				<WrapperComponent title={'Source'} extraClass={'field__source'}>
					<SmallTextField text={sources} />
				</WrapperComponent>
				<WrapperComponent title={'Service'} extraClass={'field__service'}>
					<ConnectedServiceField services={data.services} />
				</WrapperComponent>
				<WrapperComponent
					title={'Application'}
					extraClass={'field__application'}
				>
					<ApplicationField applications={data.applications} />
				</WrapperComponent>
				<WrapperComponent
					title={'Destination'}
					extraClass={'field__destination'}
				>
					<SmallTextField text={destinations} />
				</WrapperComponent>
				<WrapperComponent title={'Actions'} extraClass={'field__action'}>
					<ActionField data={data} />
				</WrapperComponent>
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
	text: PropTypes.array.isRequired
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

ServiceField.propTypes = {
	services: PropTypes.array.isRequired,
	options: PropTypes.array.isRequired
}

ApplicationField.defaultProps = {
	applications: []
}

ApplicationField.propTypes = {
	applications: PropTypes.array
}

ActionField.propTypes = {
	data: PropTypes.object.isRequired
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
		groups: state.ecosystems.dictionaries.groups,
		objects: objectsSelector(state)
	}
}

AddressTranslationTableItem.defaultProps = {
	objects: []
}

AddressTranslationTableItem.propTypes = {
	data: PropTypes.object.isRequired,
	groups: PropTypes.arrayOf(
		PropTypes.shape({
			uuid: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		})
	),
	objects: PropTypes.array.isRequired,
	responsive: PropTypes.bool.isRequired,
	onDetails: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(AddressTranslationTableItem)
