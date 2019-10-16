import React from 'react'
import { Panel } from 'react-bootstrap'
import { string, func } from 'prop-types'
import './error-panel.scss'

const ErrorPanel = ({ message, buttonClickHandler }) => (
	<Panel bsStyle="danger">
		<Panel.Heading>
			<div className="error-container">
				<div>{message}</div>
				<div className="cross-icon-container" onClick={buttonClickHandler}>
					<span className="icon-cross" />
				</div>
			</div>
		</Panel.Heading>
	</Panel>
)

ErrorPanel.propTypes = {
	message: string.isRequired,
	buttonClickHandler: func.isRequired
}

export default ErrorPanel
