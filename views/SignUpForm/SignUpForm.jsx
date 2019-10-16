import { object, func, array } from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, withRouter, Redirect } from 'react-router-dom'
import findIndex from 'lodash/findIndex'
import cx from 'classnames'

import Stepper from '../../components/Stepper/Stepper'
import EmailSubForm from './EmailSubForm/EmailSubForm'
import BillingSubForm from './BillingInfoSubForm/BillingInfoSubForm'
import PersonalInfoSubForm from './PersonalInfoSubForm/PersonalInfoSubForm'
import UnauthorizedRoute from '../../components/UnauthorizedRoute/UnauthorizedRoute'
import EmailConfirmation from './EmailConfirmation/EmailConfirmation'
import EmailEntered from './EmailEntered/EmailEntered'
import { extractLastValueFromPathname } from '../../utils/routeLocationParsers'
import { removeAuthError } from './scenario-actions'

import './sign-up-form.scss'

class SignUpForm extends Component {
	state = {
		stateStepIndex: 0
	}

	steps = [
		{
			title: 'SIGN UP',
			endpoint: '/email'
		},
		{
			title: 'PERSONAL INFORMATION',
			endpoint: '/personal-info'
		},
		{
			title: 'BILLING',
			endpoint: '/billing'
		}
	]

	basePath = '/auth/sign-up'

	componentDidMount() {
		this.props.removeAuthError()
	}

	render() {
		const { location, customers } = this.props
		const endpoint = `/${extractLastValueFromPathname(location)}`
		const endpointStepIndex = findIndex(this.steps, step => {
			return step.endpoint === endpoint
		})
		const { stateStepIndex } = this.state
		const activeStepIndex =
			endpointStepIndex >= 0 ? endpointStepIndex : stateStepIndex
		const shouldStepsBeDisplayed = activeStepIndex !== 0
		const shouldFormTitleBeDisplayed = !shouldStepsBeDisplayed
		const isBillingForm = activeStepIndex === 2
		const loginFormWrapperClasses = cx({
			'sign-up-form': true,
			'payment-form': isBillingForm
		})
		const isStepper =
			shouldStepsBeDisplayed && (!customers || !customers.length)
		return (
			<div className={'signup-form-page--content'}>
				{isStepper && (
					<Stepper steps={this.steps} activeStepIndex={activeStepIndex} />
				)}
				<div className={loginFormWrapperClasses}>
					{shouldFormTitleBeDisplayed && (
						<div>
							<h2 className={'title'}>Sign up</h2>
						</div>
					)}
					<Switch>
						<UnauthorizedRoute
							exact
							path={`${this.basePath}${this.steps[1].endpoint}`}
							component={PersonalInfoSubForm}
						/>
						<UnauthorizedRoute
							exact
							path={`${this.basePath}${this.steps[2].endpoint}`}
							component={BillingSubForm}
						/>
						<UnauthorizedRoute
							exact
							path={`${this.basePath}/email-confirmation`}
							component={EmailConfirmation}
						/>
						<UnauthorizedRoute
							exact
							path={`${this.basePath}/email-entered`}
							component={EmailEntered}
						/>
						<UnauthorizedRoute
							exact
							path={`${this.basePath}/billing`}
							component={BillingSubForm}
						/>
						<UnauthorizedRoute path={this.basePath} component={EmailSubForm} />
						<Redirect to={`${this.basePath}`} />
					</Switch>
				</div>
			</div>
		)
	}
}

SignUpForm.propTypes = {
	location: object.isRequired,
	removeAuthError: func.isRequired,
	customers: array
}

const mapStateToProps = state => {
	return {
		customers: state.auth.customers
	}
}

const mapDispatchToProps = dispatch => {
	return {
		removeAuthError: () => dispatch(removeAuthError())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(SignUpForm))
