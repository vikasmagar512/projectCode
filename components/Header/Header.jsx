import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import dashboardRoutes from 'routes/dashboard.jsx'

import HeaderLinks from './HeaderLinks.jsx'

class Header extends Component {
	constructor(props) {
		super(props)
		this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this)
		this.state = {
			sidebarExists: false
		}
	}

	mobileSidebarToggle(e) {
		if (this.state.sidebarExists === false) {
			this.setState({
				sidebarExists: true
			})
		}
		e.preventDefault()
		document.documentElement.classList.toggle('nav-open')
	}

	componentWillUnmount() {
		document.documentElement.classList.remove('nav-open')
	}

	getBrand() {
		let name
		dashboardRoutes.map(prop => {
			if (prop.collapse) {
				prop.views.map(prop => {
					if (prop.path === this.props.location.pathname) {
						name = prop.name
					}
					return null
				})
			} else {
				if (prop.redirect) {
					if (prop.path === this.props.location.pathname) {
						name = prop.name
					}
				} else {
					if (prop.path === this.props.location.pathname) {
						name = prop.name
					}
				}
			}
			return null
		})
		return name
	}

	render() {
		return (
			<Navbar>
				<Navbar.Header>
					{/*<Navbar.Brand>{this.getBrand()}</Navbar.Brand>*/}
					<Navbar.Toggle onClick={this.mobileSidebarToggle} />
				</Navbar.Header>
				<Navbar.Collapse>
					<HeaderLinks showCommit={true} />
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

Header.propTypes = {
	location: PropTypes.object.isRequired
}

export default Header
