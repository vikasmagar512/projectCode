import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import logo from '../../assets/img/SVG/logo.svg'
import ExpiryWarning from '../../components/ExpiryWarning/ExpiryWarning'
import HeaderLinks from '../../components/Header/HeaderLinks'
import EcosystemsPage from '../../views/Ecosystems/Ecosystems'
import './ecosystems.scss'

class Ecosystems extends Component {
	constructor(props) {
		super(props)
		this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this)
		this.state = {
			sidebarExists: false
		}
	}

	componentDidMount() {
		document.documentElement.classList.remove('nav-open')
	}

	mobileSidebarToggle(e) {
		if (this.state.sidebarExists === false) {
			this.setState({
				sidebarExists: true
			})
		}
		e.preventDefault()
		document.documentElement.classList.toggle('nav-open')
		const node = document.createElement('div')
		node.id = 'bodyClick'
		node.onclick = function() {
			this.parentElement.removeChild(this)
			document.documentElement.classList.toggle('nav-open')
		}
		document.body.appendChild(node)
	}

	renderNavbar() {
		return (
			<div className={'ecosystems__navbar'}>
				<div className={'logo'}>
					<a href="https://acreto.io/" className="logo__normal">
						<div className="logo-img">
							<img src={logo} alt="logo_image" />
						</div>
					</a>
				</div>
				<div className={'main-panel '}>
					<Navbar className={'main-panel-content'}>
						<Navbar.Header>
							<Navbar.Brand>
								<div className={'active'}>All Ecosystems</div>
							</Navbar.Brand>
						</Navbar.Header>
						<Navbar.Collapse>
							<HeaderLinks showSearch={true} />
						</Navbar.Collapse>
					</Navbar>
				</div>
			</div>
		)
	}

	renderContent() {
		return (
			<div>
				<div style={{ width: '100%' }}>
					<Switch>
						<Route path={'/'} component={EcosystemsPage} />
					</Switch>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="wrapper ecosystems-wrapper">
				<ExpiryWarning />
				{this.renderNavbar()}
				{this.renderContent()}
			</div>
		)
	}
}

export default Ecosystems
