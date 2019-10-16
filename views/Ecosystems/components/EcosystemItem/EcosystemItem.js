import cs from 'classnames'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import {
	FAKE_CHART_DOWN,
	FAKE_CHART_THREAT,
	FAKE_CHART_UTIL,
	ICON_MORE,
	ECOSYSTEM_OWNER
} from '../../../../assets/Icons'
import { getIconForRegionName } from '../../../../variables/Icons'
import './ecosystem-item.scss'

function NspItem({ nsp }) {
	return (
		<div className={'nsp'}>
			<div className={'nsp__image-container'}>
				<img
					alt={nsp.name}
					src={getIconForRegionName(nsp.name, nsp.status === 'green')}
					className={'nsp__image'}
				/>
			</div>
			<p className={'nsp__name'}>{nsp.name}</p>
		</div>
	)
}

export default function EcosystemItem({ ecosystem, onClick, onRemove }) {
	const disabled =
		['disabled', 'ecosystem_error', 'commit_error'].indexOf(
			ecosystem.status
		) !== -1

	const handleClick = () => {
		if (!disabled) {
			onClick()
		}
	}

	const handleClickRemove = event => {
		event.stopPropagation()
		onRemove(ecosystem.uuid)
	}

	const renderNsps = nsps => {
		if (nsps.length <= 4) {
			return (
				<React.Fragment>
					{nsps.map((nsp, index) => (
						<NspItem key={`nsps-list-index-${index}`} nsp={nsp} />
					))}
					{Array(4 - nsps.length)
						.fill(4 - nsps.length)
						.map((i, index) => (
							<div className={'empty'} key={`nsps-list-empty-index-${index}`} />
						))}
				</React.Fragment>
			)
		}
		if (nsps.length > 4) {
			const hiddenElementsAmount = nsps.length - 3
			return (
				<React.Fragment>
					{nsps.splice(0, 3).map((nsp, index) => (
						<NspItem key={`nsps-list-index-${index}`} nsp={nsp} />
					))}
					<div className={'nsp__counter'}>
						<p>{`+${hiddenElementsAmount}`}</p>
					</div>
				</React.Fragment>
			)
		}
	}

	return (
		<div
			onClick={handleClick}
			className={cs({ 'ecosystem-item': true, disabled })}
		>
			<div className={'item-header'}>
				<div className={'item-header__caption'}>
					<h2 className={'item-header__name'}>{ecosystem.name}</h2>
					<h3 className={'item-header__uuid'}>{ecosystem.uuid}</h3>
					<div className={'item-header__time'}>
						<span className={'item-header__subtitle'}>
							{moment(ecosystem.created).format('D MMMM, YYYY')}
						</span>
						<span className={'item-header__subtitle'}>
							{moment(ecosystem.created).format('h:MM A')}
						</span>
					</div>
				</div>
				<div className={'item-header__more'}>
					<i
						className={'fa fa-trash-o'}
						onClick={event => handleClickRemove(event)}
					/>
					<img src={ICON_MORE} alt={'icon-more'} className={'icon-more'} />
				</div>
			</div>
			<div className={'item-content'}>
				<p className={'title'}>Associated NSP</p>
				<div className={'nsp__container'}>
					{renderNsps(ecosystem.nsps || [])}
				</div>
				<div
					className={'hide-component charts-container component-coming-soon'}
				>
					<div className={'utilization'}>
						<div className={'abs-container'}>
							<img
								alt={'utilization-chart'}
								src={FAKE_CHART_UTIL}
								className={'chart'}
							/>
						</div>
						<p>Utilization</p>
					</div>
					<div className={'divider'} />
					<div className={'threat'}>
						<div className={'abs-container'}>
							<img
								alt={'threat-chart'}
								src={FAKE_CHART_THREAT}
								className={'chart'}
							/>
						</div>
						<p>Threat Index</p>
					</div>
					<div className={'divider'} />
					<div className={'down'}>
						<div className={'abs-container'}>
							<img
								alt={'down-chart'}
								src={FAKE_CHART_DOWN}
								className={'chart circle'}
							/>
						</div>
						<p>Down</p>
					</div>
				</div>
			</div>
			<div className={'divider'} />
			<div className={'owner-container'}>
				<div className={'owner'}>
					<img
						src={ECOSYSTEM_OWNER}
						alt={'user-icon'}
						className={'owner__icon'}
					/>
					<div className={'divider'} />
					<p className={'owner__name'}>{ecosystem.owner.username}</p>
				</div>
			</div>
		</div>
	)
}

NspItem.propTypes = {
	nsp: PropTypes.shape({
		name: PropTypes.string.isRequired,
		status: PropTypes.oneOf(['green', 'yellow', 'red'])
	}).isRequired
}

EcosystemItem.propTypes = {
	ecosystem: PropTypes.shape({
		created: PropTypes.string.isRequired,
		description: PropTypes.string,
		name: PropTypes.string.isRequired,
		nsps: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				status: PropTypes.oneOf(['green', 'yellow', 'red'])
			})
		).isRequired,
		owner: PropTypes.shape({
			username: PropTypes.string.isRequired
		}).isRequired,
		uuid: PropTypes.string.isRequired
	}),
	onClick: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired
}
