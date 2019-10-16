import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar } from 'react-bootstrap'
import TabsHeader from '../../components/TabsHeader/TabsHeader'
import User from './components/User'
import Organization from './components/Organization'
import Billing from './components/Billing'

import './user-profile.scss'
import logo from '../../assets/img/SVG/logo.svg'
import HeaderLinks from '../../components/Header/HeaderLinks'
import ExpiryWarning from '../../components/ExpiryWarning/ExpiryWarning'

class UserProfile extends Component {
	state = {
		selectedIndex: 0
	}
	tabs = [
		{
			name: 'User Profile'
		},
		{
			name: 'Organization Profile'
		},
		{
			name: 'Billing'
		}
	]

	selectTab = index => {
		this.setState(() => ({
			selectedIndex: index
		}))
	}

	renderForm = () => {
		const { selectedIndex } = this.state
		const {
			state: { from }
		} = this.props.location
		if (selectedIndex === 0) {
			return <User from={from} />
		} else if (selectedIndex === 1) {
			return <Organization from={from} />
		} else if (selectedIndex === 2) {
			return <Billing from={from} />
		}
	}

	renderNavbar() {
		return (
			<div className={'profile__navbar'}>
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

	render() {
		const { selectedIndex } = this.state
		return (
			<div>
				<div className="wrapper profile-wrapper">
					<ExpiryWarning />
					{this.renderNavbar()}
					<div className={'profile-container'}>
						<div className={'profile-form'}>
							<TabsHeader
								selectedIndex={selectedIndex}
								onSelect={this.selectTab}
								tabs={this.tabs}
							/>
							{this.renderForm()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

UserProfile.propTypes = {
	location: PropTypes.object.isRequired
}

export default UserProfile
