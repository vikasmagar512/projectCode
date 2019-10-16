import PropTypes from 'prop-types'
import React from 'react'
import './add-button.scss'

export default function AddButton({ className, children, onClick }) {
	return (
		<div className={`add-button ${className || ''}`} onClick={onClick}>
			<div className={'square'}>+</div>
			{children && <p className={'text'}>{children}</p>}
		</div>
	)
}

AddButton.defaultProps = {
	children: ''
}

AddButton.propTypes = {
	children: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string
}
