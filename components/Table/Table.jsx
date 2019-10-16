import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import MediaQuery from 'react-responsive'
import './table.scss'

function Container({ children, root }) {
	return (
		<div className={`table-container ${root}__table-container`}>{children}</div>
	)
}

function Content({ root, headerComponent, renderItems }) {
	return (
		<div className={`table-content ${root}__table-content`}>
			<MediaQuery minWidth={992}>{headerComponent}</MediaQuery>
			<MediaQuery maxWidth={991}>{matches => renderItems(matches)}</MediaQuery>
		</div>
	)
}

function HeaderItem({ conf }) {
	if (conf.divider) {
		return <div className={`empty`} />
	}

	return (
		<div
			className={cx({ field: true, 'text-center': conf.center })}
			style={{ flex: conf.flex ? conf.flex : '1 0' }}
		>
			{conf.name}
		</div>
	)
}

function Header({ items }) {
	return (
		<div>
			<div className={`table-header header`}>
				{items.map((field, index) => (
					<HeaderItem conf={field} key={`table-header-field-${index}`} />
				))}
			</div>
		</div>
	)
}

Container.propTypes = {
	children: PropTypes.element,
	root: PropTypes.string
}

Content.propTypes = {
	root: PropTypes.string,
	headerComponent: PropTypes.element.isRequired,
	renderItems: PropTypes.func.isRequired
}

Header.propTypes = {
	items: PropTypes.array.isRequired
}

HeaderItem.propTypes = {
	conf: PropTypes.object.isRequired
}

export default {
	Content,
	Container,
	Header
}
