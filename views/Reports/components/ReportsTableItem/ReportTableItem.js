import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import ServiceIcon from '../../../../assets/img/PNG/Acreto_Icon 16.png'
import ApplicationIcon from '../../../../assets/img/PNG/Acreto_Icon 17.png'
import ThreatIcon from '../../../../assets/img/PNG/Acreto_Icon 18.png'
import Download from '../../../../assets/img/PNG/download.png'
import Upload from '../../../../assets/img/PNG/upload.png'
import DropIcon from '../../../../assets/img/PNG/group-34.png'
import AllowIcon from '../../../../assets/img/PNG/Acreto_Icon 23.png'
import ChainIcon from '../../../../assets/img/PNG/Acreto_Icon 24.png'
import PolicyIcon from '../../../../assets/img/PNG/policy_icon.png'
import { COUNTRIES } from '../../../../enums'

import './reports-table-item.scss'
import ReactCountryFlag from 'react-country-flag'

const getIconForAction = action => {
	switch (action) {
		case 'Allow':
			return AllowIcon
		case 'URL':
			return ChainIcon
		case 'Drop':
			return DropIcon
		default:
			return DropIcon
	}
}

function TableItemContainer({ children }) {
	const [hovered, setHovered] = useState(false)
	const toggleHover = () => setHovered(!hovered)
	return (
		<div
			className={`reports-table-item item ${hovered ? 'hover' : ''}`}
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
		>
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

function PolicyField({ date }) {
	let d = moment(date)
		.format('LL')
		.split(',')
	return (
		<React.Fragment>
			<div className={'imgDiv'}>
				<img src={PolicyIcon} alt={'policy-icon'} className={'small-icon'} />
				<div className={'timezone'}>
					<p className={'medium top'}>{d[0]},</p>
					<p className={'small light marTop'}>{d[1]}</p>
				</div>
			</div>
			<div className={'ips secondRow'}>
				<div className={'left'}>
					<span className={'small light'}>Local: </span>
				</div>
				<p className={'medium time '}>{`${moment(date).format('HH:mm:ss')}`}</p>
			</div>
			<div className={'ips secondRow'}>
				<div className={'left'}>
					<span className={'small light'}>UTC: </span>
				</div>
				<p className={'medium time'}>
					{`${moment.utc(date).format('HH:mm:ss')}`}
				</p>
			</div>
		</React.Fragment>
	)
}

function SmallTextField({ text }) {
	return <p className={'small'}>{text}</p>
}

function ServiceField({ service }) {
	return (
		<React.Fragment>
			<img src={ServiceIcon} alt={'service-icon'} className={'small-icon'} />
			<div>
				<p className={'medium'}>{`${service.tcp}${
					service.port ? ' / ' + service.port : ''
				}`}</p>
			</div>
		</React.Fragment>
	)
}

function ApplicationField({ application }) {
	return (
		<React.Fragment>
			{application ? (
				<React.Fragment>
					<img
						src={ApplicationIcon}
						alt={'application-icon'}
						className={'small-icon'}
					/>
					<p className={'medium'}>{application}</p>
				</React.Fragment>
			) : (
				<p className={'medium fakeCenter'}>-</p>
			)}
		</React.Fragment>
	)
}

function ActionsField({ actions }) {
	return (
		<React.Fragment>
			{actions.map(action => (
				<div className={'action'} key={`action-item-index-${action}`}>
					<img
						src={getIconForAction(action)}
						alt={'icon'}
						className={action === 'Allow' ? 'small-icon' : 'drop-icon'}
					/>
					<p className={'medium'}>{action === 'Allow' ? 'Allow' : 'Deny'}</p>
				</div>
			))}
		</React.Fragment>
	)
}

function AlertField({ alert }) {
	return (
		<React.Fragment>
			{alert ? (
				<div className={'imgDiv'}>
					<img src={ThreatIcon} alt={'alert-icon'} className={'small-icon'} />
					<p className={'medium'}>{alert}</p>
				</div>
			) : (
				<p className={'medium fakeCenter'}>-</p>
			)}
		</React.Fragment>
	)
}

function StatusField({ status }) {
	return (
		<React.Fragment>
			<img src={status.icon} alt={'status-icon'} className={'small-icon'} />
			<p className={'medium'}>{status.name}</p>
		</React.Fragment>
	)
}

function formatBytes(bytes, decimals) {
	if (bytes === 0) return '0 Bytes'
	var k = 1024,
		dm = decimals <= 0 ? 0 : decimals || 2,
		sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = Math.floor(Math.log(bytes) / Math.log(k))
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function StatsField({ data }) {
	let bytesReceived = data.bytesTotal - data.bytesSent
	bytesReceived = formatBytes(bytesReceived)
	const bytesSent = formatBytes(data.bytesSent)
	const bytesTotal = formatBytes(data.bytesTotal)
	const SecondsTohhmmss = totalSeconds => {
		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds - hours * 3600) / 60)
		let seconds = totalSeconds - hours * 3600 - minutes * 60

		// round seconds
		seconds = Math.round(seconds * 100) / 100

		var result = hours ? hours + 'h' : ''
		result += minutes
			? ' ' + (hours && minutes < 10 ? '0' + minutes + 'm' : minutes + 'm')
			: ' '
		result += seconds
			? ' ' + (minutes && seconds < 10 ? '0' + seconds + 's' : seconds + 's')
			: ' '
		return result
	}
	const duration = data.elapsedSeconds
		? SecondsTohhmmss(data.elapsedSeconds)
		: ''
	return (
		<React.Fragment>
			<p className={'medium top'}>
				<span className={'small light'}>Bytes Total: </span>
				{`${bytesTotal}`}
			</p>
			<div className={'divider secondRow'}>
				<div className={'bytes'}>
					<img src={Upload} alt={'alert-icon'} className={'small-icon'} />
					<p className={'medium'}>{`${bytesSent}`}</p>
				</div>
				<div className={'line'}>
					<span className={'medium'}>|</span>
				</div>
				<div className={'bytes bottom'}>
					<img src={Download} alt={'alert-icon'} className={'small-icon'} />
					<p className={'medium'}>{`${bytesReceived}`}</p>
				</div>
			</div>
			<div className={'divider secondRow'}>
				<div className={'bytes bottom'}>
					<p className={'medium'}>
						<span className={'small light'}>Packets: </span>
						{`${data.packetsTotal}`}
					</p>
				</div>
				{duration && (
					<React.Fragment>
						<div className={'line'}>
							<span>|</span>
						</div>
						<div className={'bytes'}>
							<p className={'medium'}>{`Duration: ${duration}`}</p>
						</div>
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	)
}

function IpField({ data }) {
	const [hovered, setHovered] = useState(false)
	const toggleHover = () => setHovered(!hovered)
	const country =
		data.geography &&
		COUNTRIES.find(
			i =>
				i.name.toLowerCase() === data.geography.toLowerCase() ||
				(i.alias && i.alias.toLowerCase() === data.geography.toLowerCase())
		)
	return (
		<React.Fragment>
			<p className={'top medium light'}>{data.ip}</p>
			<div className={'secondRow fqdn'}>
				<p className={'small'}>{data.fqdn}</p>
			</div>
			<div className={'secondRow imgDiv'}>
				{country && (
					<p
						className={'imageP'}
						onMouseEnter={toggleHover}
						onMouseLeave={toggleHover}
					>
						<ReactCountryFlag
							code={country.countryCode}
							svg={window.navigator.userAgent.indexOf('Windows NT') !== -1}
						/>
						<span className={'medium code'}>{`${
							hovered ? data.geography : country.countryCode3
						}`}</span>
					</p>
				)}
			</div>
		</React.Fragment>
	)
}

export default function ReportsTableItem({ data, responsive = false }) {
	const WrapperComponent = responsive ? ResponsiveField : Field
	return (
		<TableItemContainer>
			<WrapperComponent title={'Policy'} extraClass={'field__policy'}>
				<PolicyField date={data.date} />
			</WrapperComponent>
			<WrapperComponent title={'Source'} extraClass={'field__source'}>
				<IpField data={data.source} />
			</WrapperComponent>
			<WrapperComponent title={'Service'} extraClass={'field__service'}>
				<ServiceField service={data.service} />
			</WrapperComponent>
			<WrapperComponent title={'Application'} extraClass={'field__application'}>
				<ApplicationField application={data.application} />
			</WrapperComponent>
			<WrapperComponent title={'Destination'} extraClass={'field__destination'}>
				<IpField data={data.destination} />
			</WrapperComponent>
			<WrapperComponent title={'Actions'} extraClass={'field__actions'}>
				<ActionsField actions={data.actions} />
			</WrapperComponent>
			<WrapperComponent title={'Alert'} extraClass={'field__alert'}>
				<AlertField alert={data.alert} />
			</WrapperComponent>
			<WrapperComponent title={'Stats'} extraClass={'field__stats'}>
				<StatsField data={data.stats} />
			</WrapperComponent>
		</TableItemContainer>
	)
}

StatusField.propTypes = {
	status: PropTypes.object.isRequired
}
StatsField.propTypes = {
	data: PropTypes.object.isRequired
}
IpField.propTypes = {
	data: PropTypes.object.isRequired
}

AlertField.propTypes = {
	alert: PropTypes.any.isRequired
}

ActionsField.propTypes = {
	actions: PropTypes.array.isRequired
}

ApplicationField.propTypes = {
	application: PropTypes.string.isRequired
}

ServiceField.propTypes = {
	service: PropTypes.object.isRequired
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

PolicyField.propTypes = {
	date: PropTypes.string.isRequired
}

TableItemContainer.propTypes = {
	children: PropTypes.array.isRequired
}

ReportsTableItem.propTypes = {
	data: PropTypes.object.isRequired,
	responsive: PropTypes.bool.isRequired
}
