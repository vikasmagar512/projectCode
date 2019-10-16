import React from 'react'
import PropTypes from 'prop-types'
import { getArrow, getIconForRegionName } from '../../variables/Icons'
import './nsp.scss'

export default function Nsp({ nsp }) {
	return (
		<div className={'nsp-component primary-container'}>
			<img
				src={getArrow(nsp.status === 'green')}
				className={'arrow-status'}
				alt={'arrow-status'}
			/>
			<img
				src={getIconForRegionName(nsp.name, nsp.status === 'green')}
				alt={'region-icon'}
				className={'region-icon'}
			/>
			<div className={'divider big'} />
			<div className={'flex-column'}>
				<p className={'semi-strong nsp-name'}>{nsp.name}</p>
				<div className={'hide-component flex-row'}>
					<p className={'nsp-values'}>
						{nsp.ping || 0} <span className={'unit'}>ms</span>
					</p>
					<div className={'divider small'} />
					<p className={'nsp-values'}>
						{`${nsp.loss || 0}% `}
						<span className={'unit'}>Loss</span>
					</p>
				</div>
			</div>
		</div>
	)
}

Nsp.propTypes = {
	nsp: PropTypes.shape({
		ping: PropTypes.number,
		loss: PropTypes.number,
		name: PropTypes.string.isRequired,
		status: PropTypes.oneOf(['green', 'yellow', 'red'])
	})
}
