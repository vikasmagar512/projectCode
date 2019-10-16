import React from 'react'

import { string } from 'prop-types'
import './success-panel.scss'

const SuccessPanel = ({ message }) => (
	<div className="panel-success-container">
		<div>{message}</div>
		<div className="icon-container">
			<span className="icon-check" />
		</div>
	</div>
)

SuccessPanel.propTypes = {
	message: string.isRequired
}

export default SuccessPanel
