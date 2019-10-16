import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { injectStripe } from 'react-stripe-elements'
import { compose } from 'recompose'

import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import history from './history'
import Dashboard from './layouts/Dashboard/Dashboard'
import Ecosystems from './layouts/Ecosystems/Ecosystems'
import Organizations from './layouts/Organizations/Organizations'
import Login from './layouts/Login/Login'
import './reset.scss'
import { startup } from './store/common-scenario-actions'
import { setStripe } from './store/payment/actions'
import { connect } from 'react-redux'
import { func, bool } from 'prop-types'
import GlobalLoader from './components/GlobalLoader/GlobalLoader'
import NotFound from './views/NotFound/NotFound'
import UserProfile from './views/UserProfile/UserProfile'
import Eula from './views/LoginForm/Eula/eula'
import OverlayLoader from './components/OverlayLoader/OverlayLoader'
export const LOCAL_ACCESS_TOKEN_KEY = 'wedge_access_token'
export const LOCAL_ACCESS_TOKEN_EXPIRY_TIME = 'wedge_token_expiry_time'
class App extends React.Component {
	componentDidMount() {
		const { startup, setStripe } = this.props
		startup()
		setStripe()
	}

	render() {
		const { startupFinished, loadingState } = this.props
		const LoadingIndicator = loadingState =>
			loadingState ? <OverlayLoader /> : null
		return (
			<React.Fragment>
				{startupFinished ? (
					<Router history={history}>
						<Switch>
							<ProtectedRoute
								path={'/auth/customers'}
								exact
								component={Organizations}
							/>
							<ProtectedRoute
								path={'/auth/profile'}
								exact
								component={UserProfile}
							/>
							<ProtectedRoute path={'/auth/eula'} exact component={Eula} />
							<ProtectedRoute path={'/'} exact component={Ecosystems} />
							<ProtectedRoute path={'/ecosystems'} component={Dashboard} />
							<Route path={'/auth'} component={Login} />
							<Route path="/notFound" component={NotFound} />
							<Route path="*" component={NotFound} />
						</Switch>
					</Router>
				) : (
					<GlobalLoader />
				)}
				<ToastContainer />
				{LoadingIndicator(loadingState)}
			</React.Fragment>
		)
	}
}

App.propTypes = {
	startup: func.isRequired,
	startupFinished: bool.isRequired,
	loadingState: bool.isRequired,
	setStripe: func.isRequired
}

const mapStateToProps = state => {
	return {
		startupFinished: state.global.startupFinished,
		loadingState: state.global.loadingState
	}
}

const mapDispatchToProps = (dispatch, { stripe }) => {
	return {
		startup: () => dispatch(startup()),
		setStripe: () => dispatch(setStripe(stripe))
	}
}

export default compose(
	injectStripe,
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(App)
