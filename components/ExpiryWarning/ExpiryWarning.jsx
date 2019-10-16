import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import './expiry-warning.scss'
import { logout } from '../../store/common-scenario-actions'
import IdleTimer from 'react-idle-timer'

const INTERVAL_TIME_SECONDS = 1

class ExpiryWarning extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			switch: false,
			expiry: process.env.REACT_APP_TOKEN_EXPIRATION_TIME
		}
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState({
				switch: !this.state.switch
			})
		}, INTERVAL_TIME_SECONDS * 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	onIdle() {
		this.props.logout()
	}

	render() {
		const { expiry } = this.state
		const remain = this.idleTimer && this.idleTimer.getRemainingTime() / 1000
		const show = remain < 60

		return (
			<div>
				<IdleTimer
					ref={ref => {
						this.idleTimer = ref
					}}
					element={document}
					onActive={this.onActive}
					onAction={this.onAction}
					onIdle={this.props.logout}
					debounce={250}
					timeout={1000 * 60 * expiry}
				/>
				<div className={`expiry-warning ${show ? 'visible' : 'hidden'}`}>
					{`You're inactive for almost ${expiry} minutes. Perform any actions or you will be log out in ${Math.round(
						remain
					)} seconds!`}
				</div>
			</div>
		)
	}
}

ExpiryWarning.propTypes = {
	logout: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
})

export default connect(
	null,
	mapDispatchToProps
)(ExpiryWarning)
