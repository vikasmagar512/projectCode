import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NotificationSystem from 'react-notification-system'
import { Redirect, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import dashboardRoutes from 'routes/dashboard.jsx'

import { style } from 'variables/Variables.jsx'
import ExpiryWarning from '../../components/ExpiryWarning/ExpiryWarning'
import { loadEcosystem, refreshEcosystemStatus } from './scenario-actions'
import { createLoadingSelector } from '../../store/utils/selectors'
import BlockedEcosystem from '../../components/BlockedEcosystem/BlockedEcosystem'

const ecosystemStatus = [
	'commit_in_progress',
	'commit_error',
	'ecosystem_error',
	'disabled',
	'inaccessible'
]

class Dashboard extends Component {
	state = {
		loaded: false,
		intervalId: 0,
		status: ''
	}

	async componentDidMount() {
		const ecosystemUUID = this.props.location.pathname.split('/')[2]
		await this.props.loadEcosystem(ecosystemUUID)
		await this.props.refreshEcosystemStatus(ecosystemUUID)
		const intervalId = setInterval(() => {
			this.props.refreshEcosystemStatus(ecosystemUUID)
		}, 5000)
		this.setState({
			loaded: true,
			intervalId: intervalId
		})
	}

	static getDerivedStateFromProps(nextProps) {
		if (!nextProps.ecosystem) {
			return {
				status: 'inaccessible'
			}
		}
		return null
	}

	shouldComponentUpdate(nextProps) {
		if (this.state.loaded && this.props.ecosystem !== nextProps.ecosystem) {
			return this.props.ecosystem.status !== nextProps.ecosystem.status
		}
		return true
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId)
	}

	componentDidUpdate(e) {
		if (
			window.innerWidth < 993 &&
			e.history.location.pathname !== e.location.pathname &&
			document.documentElement.className.indexOf('nav-open') !== -1
		) {
			document.documentElement.classList.toggle('nav-open')
		}
		if (e.history.action === 'PUSH') {
			if (document.documentElement) {
				document.documentElement.scrollTop = 0
			}
			if (document.scrollingElement) {
				document.scrollingElement.scrollTop = 0
			}
		}
	}

	render() {
		const { loaded } = this.state
		const { status } = this.props.ecosystem ? this.props.ecosystem : this.state
		const blocked = ecosystemStatus.includes(status)
		return (
			<div className="wrapper">
				<ExpiryWarning />
				<NotificationSystem style={style} />
				{loaded && (
					<React.Fragment>
						<Sidebar {...this.props} />
						<div id="main-panel" className="main-panel">
							<div className={'dashboard-navbar'}>
								<Header {...this.props} />
							</div>
							{blocked && <BlockedEcosystem status={status} />}
							{!blocked && (
								<Switch>
									<Route path={'/profile'} />
									{dashboardRoutes.map((prop, key) => {
										if (prop.name === 'Notifications') {
											const RouteComponent = prop.component
											return (
												<Route
													path={prop.path}
													key={key}
													render={routeProps => (
														<RouteComponent {...routeProps} />
													)}
												/>
											)
										}
										if (prop.redirect) {
											return (
												<Redirect from={prop.path} to={prop.to} key={key} />
											)
										}
										if (prop.nested) {
											return prop.paths.map((r, nkey) => (
												<Route
													path={r.path}
													component={r.component}
													key={nkey}
												/>
											))
										}
										if (prop.name === 'Profile') {
											return (
												<Route
													path={prop.path}
													component={prop.component}
													key={key}
												/>
											)
										}
										return (
											<Route
												path={prop.path}
												component={prop.component}
												key={key}
											/>
										)
									})}
								</Switch>
							)}
							<Footer />
						</div>
					</React.Fragment>
				)}
			</div>
		)
	}
}

Dashboard.propTypes = {
	loadEcosystem: PropTypes.func.isRequired,
	refreshEcosystemStatus: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	ecosystem: PropTypes.object
}

const loadingSelector = createLoadingSelector(['LOAD_ECOSYSTEM'])

const mapStateToProps = state => {
	return {
		loading: loadingSelector(state),
		ecosystem: state.ecosystems.currentEcosystem
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadEcosystem: ecosystemUUID => dispatch(loadEcosystem(ecosystemUUID)),
		refreshEcosystemStatus: ecosystemUUID =>
			dispatch(refreshEcosystemStatus(ecosystemUUID))
	}
}

const ConnectedDashboardLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard)
export default withRouter(ConnectedDashboardLayout)
