import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'
import { emailSelector } from '../../../store/user/selectors'
import '../sign-up-form.scss'
import SuccessPanel from '../../../components/SuccessPanel/SuccessPanel'
import EmailPanel from '../../../components/EmailDisplay/EmailDisplay'

const EmailSuccessfullyEntered = ({ email }) => (
	<div className="form-container">
		<SuccessPanel message="You should receive an email at following email address" />
		<EmailPanel email={email} />
	</div>
)

EmailSuccessfullyEntered.propTypes = {
	email: string.isRequired
}

const mapStateToProps = state => ({
	email: emailSelector(state)
})

export default connect(mapStateToProps)(EmailSuccessfullyEntered)
