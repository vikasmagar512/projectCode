import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'

import './email-display.scss'
import { emailSelector } from '../../store/user/selectors'

const EmailPanel = ({ email }) => (
	<div className="email-panel-container">
		<div className="email-icon-container">
			<span className="icon-email-address" />
		</div>
		<div>{email}</div>
	</div>
)

EmailPanel.propTypes = {
	email: string.isRequired
}

const mapStateToProps = state => ({
	email: emailSelector(state)
})

export default connect(mapStateToProps)(EmailPanel)
