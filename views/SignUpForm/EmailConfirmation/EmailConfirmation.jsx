import Spinner from 'react-spinner-material'
import React, { Component } from 'react'
import { func, string, object } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'query-string'

import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import { checkIfTheTokenIsValid } from '../scenario-actions'
import { clearError } from '../../../store/user/actions'
import { errorSelector, emailSelector } from '../../../store/user/selectors'
import '../sign-up-form.scss'

class EmailConfirmation extends Component {
	constructor(props) {
		super(props)
		const {
			location: { search }
		} = props
		let { token, username } = qs.parse(search)
		username = username.replace(' ', '+')
		this.token = token
		this.username = username
		this.shouldCheckToken = this.token && this.username
		this.error = this.shouldCheckToken ? '' : 'Incorrect link'
	}

	componentDidMount() {
		const { checkIfTheTokenIsValid } = this.props
		if (this.shouldCheckToken) {
			checkIfTheTokenIsValid({ token: this.token, username: this.username })
		}
	}

	handleErrorClose = () => {
		const { clearError, history } = this.props
		clearError()
		history.replace('auth/sign-up')
	}

	componentWillUnmount() {
		const { clearError, error } = this.props
		if (error) clearError()
	}

	render() {
		const error = this.error || this.props.error
		return (
			<div className="form-container">
				{error ? (
					<ErrorPanel
						message={error}
						buttonClickHandler={this.handleErrorClose}
					/>
				) : (
					<Spinner spinnerColor="#4986c5" />
				)}
			</div>
		)
	}
}

EmailConfirmation.propTypes = {
	error: string.isRequired,
	clearError: func.isRequired,
	email: string.isRequired,
	checkIfTheTokenIsValid: func.isRequired,
	location: object.isRequired,
	history: object.isRequired
}

const mapStateToProps = state => ({
	error: errorSelector(state),
	email: emailSelector(state)
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			clearError,
			checkIfTheTokenIsValid
		},
		dispatch
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EmailConfirmation)
