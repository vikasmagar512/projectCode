import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import { Route, Switch, Link } from 'react-router-dom'
import cx from 'classnames'
import logo from '../../assets/img/SVG/logo.svg'
import { LOGIN_FOOTER } from '../../assets/Icons'
import HeaderLinks from '../../components/Header/HeaderLinks'
import CustomersForm from '../../views/CustomersForm/CustomersForm'
import './organizations.scss'
import ExpiryWarning from '../../components/ExpiryWarning/ExpiryWarning'

export default class Organizations extends Component {
	renderNavbar() {
		return (
			<div className={'organizations__navbar'}>
				<div className={'logo'}>
					<a href="https://acreto.io/" className="logo__normal">
						<div className="logo-img">
							<img src={logo} alt="logo_image" />
						</div>
					</a>
				</div>
				<div className={'main-panel'}>
					<Navbar className={'main-panel-content'}>
						<Navbar.Collapse>
							<HeaderLinks slug={false} showSearch={true} />
						</Navbar.Collapse>
					</Navbar>
				</div>
			</div>
		)
	}
	renderCustomers() {
		return (
			<div>
				<div style={{ width: '100%' }}>
					<Switch>
						<Route path={'/auth/customers'} component={CustomersForm} />
					</Switch>
				</div>
				<div className={'d-flex'}>
					<Link to={'/auth/sign-up/billing'} className={'button'}>
						{'Add new '}
					</Link>
				</div>
			</div>
		)
	}
	render() {
		return (
			<div>
				<div className="wrapper organizations-wrapper">
					<ExpiryWarning />
					{this.renderNavbar()}
					{this.renderCustomers()}
				</div>
				<div className={'login-page--footer footer'}>
					<img
						src={LOGIN_FOOTER}
						className={cx({
							'footer--image': true
						})}
						alt={'footer'}
					/>
				</div>
			</div>
		)
	}
}
