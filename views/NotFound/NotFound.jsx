import React, { Component } from 'react'
import {
	BACK_ARROW_LINK,
	LOGIN_FOOTER,
	NOT_FOUND_404
} from '../../assets/Icons'
import './NotFound.scss'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../../assets/img/SVG/logo.svg'
import { Navbar } from 'react-bootstrap'
import HeaderLinks from '../../components/Header/HeaderLinks'

import cx from 'classnames'
import { isAuthenticatedSelector } from '../../store/user/selectors'
import { connect } from 'react-redux'

class NotFound extends Component {
	renderNavbar() {
		const { isAuthenticated } = this.props
		return (
			<div className={'notFound__navbar'}>
				<div className={'logo'}>
					<a href="https://acreto.io/" className="logo__normal">
						<div className="logo-img">
							<img src={logo} alt="logo_image" />
						</div>
					</a>
				</div>
				{isAuthenticated && (
					<div className={'main-panel'}>
						<Navbar className={'main-panel-content'}>
							<Navbar.Collapse>
								<HeaderLinks slug={false} showSearch={true} />
							</Navbar.Collapse>
						</Navbar>
					</div>
				)}
			</div>
		)
	}

	renderContent() {
		let errorCode = this.props.location.state
			? this.props.location.state.errorCode
			: 404
		let str1 = `I can't seem to find the page you're looking for!`
		let str2 = `It's either no longer here or it was never here in the first place.`
		return (
			<div className={'content'}>
				<div className={'login-form'}>
					<div className={'left Grid-cell'}>
						<img src={NOT_FOUND_404} alt={'Not Found'} />
					</div>
					<div className={'right Grid-cell'}>
						<div className={'group'}>
							<h1 className={'title'}>{errorCode}</h1>
							<p className={'subHead'}>{str1}</p>
							<p className={'subHead2'}>{str2}</p>
							<NavLink to={'/'} className="nav-link link">
								<img
									src={BACK_ARROW_LINK}
									alt="back-arrow-link"
									className={'back-arrow'}
								/>
								<p className={'link--text'}>Go to Dashboard</p>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div>
				<div className="wrapper notFound-wrapper">
					{this.renderNavbar()}
					{this.renderContent()}
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

NotFound.propTypes = {
	location: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
}

NotFound.defaultProps = {
	error: '',
	isLoading: false,
	customers: []
}

const mapStateToProps = state => {
	return {
		isAuthenticated: isAuthenticatedSelector(state)
	}
}

export default connect(
	mapStateToProps,
	null
)(NotFound)
