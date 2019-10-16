import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './fetch-error-message.scss'

class FetchErrorMessage extends React.PureComponent {
	getHelp = () => {
		const { user, header, status, code } = this.props
		const { selectedCustomer } = this.props.auth
		const { currentEcosystem } = this.props.ecosystems

		const customerLink = selectedCustomer
			? `customer=${selectedCustomer.uuid}&`
			: ''
		const ecosystemLink = currentEcosystem
			? `ecosystem=${currentEcosystem.uuid}&`
			: ''
		const reqLink = `x-request-id=${header['x-request-id']}`
		const helpLink = `https://acreto.io/?${customerLink}${ecosystemLink}user=${
			user.uuid
		}&${reqLink}&status=${status}&code=${code}`

		return helpLink
	}

	render() {
		const { code, onClose, error } = this.props
		return (
			<div className={`fetch-error-message`}>
				<div className={'fetch-error-message--container'}>
					<div className={'d-flex'}>
						<i className="fa fa-exclamation-circle" />
						<p className={'fetch-error-message--code'}>{`Error ${code}:`}</p>
						<p className={'fetch-error-message--text'}>
							{error ? error : 'Ecosystem cannot be loaded'}
						</p>
					</div>
					<div className={'d-flex'}>
						<Link to={this.getHelp()} target="_blank">
							<div className={'fetch-error-message--help'}>
								{'Get Help Here'}
							</div>
						</Link>
						<div className={'divider'}>{'|'}</div>
						<i className="fa fa-close" onClick={onClose} />
					</div>
				</div>
			</div>
		)
	}
}

FetchErrorMessage.propTypes = {
	code: PropTypes.string.isRequired,
	header: PropTypes.object.isRequired,
	status: PropTypes.number.isRequired,
	error: PropTypes.string,
	onClose: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	ecosystems: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

const mapStateToProps = state => {
	return {
		user: state.user,
		auth: state.auth,
		ecosystems: state.ecosystems
	}
}

export default connect(mapStateToProps)(FetchErrorMessage)
