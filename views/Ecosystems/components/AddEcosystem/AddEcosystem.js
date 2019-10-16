import React from 'react'
import PropTypes from 'prop-types'
import './add-ecosystem.scss'

export default function AddEcosystem({ onClick }) {
	return (
		<div className={'add-ecosystem'} onClick={onClick}>
			<div className={'oval'}>
				<span>+</span>
			</div>
			<p>Add New</p>
		</div>
	)
}

AddEcosystem.propTypes = {
	onClick: PropTypes.func.isRequired
}
