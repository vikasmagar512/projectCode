import React, { Component } from 'react'
import cx from 'classnames'
import { number, func, array } from 'prop-types'

import './tabs-header.scss'

class TabsHeader extends Component {
	render() {
		const { tabs, selectedIndex, onSelect } = this.props
		return (
			<div className="tabs-header-container">
				{tabs.map(({ name, iconClassName }, index) => {
					const isActive = selectedIndex === index
					const verifiedSingleTabContainer = cx('single-tab-container', {
						'--active': isActive
					})
					const verifiedIcon = cx(iconClassName, {
						'--active': isActive
					})
					return (
						<div
							key={name}
							onClick={() => onSelect(index)}
							className={verifiedSingleTabContainer}
						>
							<div className="icon-container">
								<span className={verifiedIcon} />
							</div>
							<span>{name}</span>
						</div>
					)
				})}
			</div>
		)
	}
}

TabsHeader.propTypes = {
	selectedIndex: number.isRequired,
	onSelect: func.isRequired,
	tabs: array.isRequired
}

export default TabsHeader
