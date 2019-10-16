import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import {
	ACRETO_LOGO,
	BACK_ARROW,
	CHEVRON_DOWN_WHITE,
	FAKE_CHART_SIDEBAR,
	FULL_SIZE_ICON,
	GREEN_TICK,
	MENU_ADDRESS,
	// MENU_ADDRESS,
	// MENU_BADGE_CONTAINER,
	// MENU_CONTENT,
	//MENU_DOWN_ARROW,
	MENU_ELEMENTS,
	// MENU_GOVERNANCE,
	MENU_OBJECTS,
	// MENU_PLUS_RECT,
	MENU_POLICIES,
	MENU_REPORT,
	MENU_SECURITY,
	// MENU_USERS,
	NOTIFICATIONS_ARROW_RIGHT
} from '../../assets/Icons'
import HeaderLinks from '../Header/HeaderLinks.jsx'
import './sidebar.scss'

class Sidebar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			width: window.innerWidth
		}
	}

	activeRoute(routeName) {
		// PROBABLY WON'T GIVE ACTIVE, BECAUSE OF :id
		const filledPathname = routeName.replace(':id', this.props.ecosystem.uuid)
		return this.props.location.pathname === filledPathname ? 'active' : ''
	}

	updateDimensions() {
		this.setState({ width: window.innerWidth })
	}

	componentDidMount() {
		this.updateDimensions()
		window.addEventListener('resize', this.updateDimensions.bind(this))
	}

	render() {
		const { ecosystem } = this.props

		if (!ecosystem) {
			return <Redirect to={'/'} />
		}

		return (
			<div id="sidebar" className="sidebar wedge" data-color="gray">
				<div className="logo">
					<a href="/" className="simple-text logo-normal full-width">
						<div className="logo-img">
							<img src={ACRETO_LOGO} alt="logo_image" />
						</div>
					</a>
					<div className={'divider'} />
				</div>
				<div className="sidebar-wrapper">
					<ul className="nav">
						{this.state.width <= 991 ? <HeaderLinks /> : null}
						<li className={''}>
							<NavLink to={'/'} className="nav-link ecosystem">
								<img
									src={BACK_ARROW}
									alt="back-arrow"
									className={'back-arrow'}
								/>
								<p className={'ecosystem--text'}>All Ecosystems</p>
							</NavLink>
							<div className={'sidebar-divider'} />
						</li>
						<div className={'ecosystem--name'}>{ecosystem.name}</div>
						<li>
							<NavLink
								to={'/ecosystems/:id/objects'.replace(':id', ecosystem.uuid)}
								className={'nav-link root with-arrow'}
							>
								<div className={'left-container'}>
									<img
										className={'small-image'}
										alt={'Elements'}
										src={MENU_ELEMENTS}
									/>
									<p>Elements</p>
									{/*<img
										className={'small-image add'}
										alt={'add'}
										src={MENU_PLUS_RECT}
									/>*/}
								</div>
								{/*<img
									className={'small-image down'}
									alt={'down-arrow'}
									src={MENU_DOWN_ARROW}
								/>*/}
							</NavLink>
						</li>
						<li
							className={`${this.activeRoute(
								'/ecosystems/:id/objects'
							)} nested`}
						>
							<NavLink
								to={'/ecosystems/:id/objects'.replace(':id', ecosystem.uuid)}
								className="nav-link"
								activeClassName="active"
							>
								<img
									className={'small-image'}
									alt={'Objects'}
									src={MENU_OBJECTS}
								/>
								<p>Objects</p>
							</NavLink>
						</li>
						{/*<li
							className={`${this.activeRoute(
								'/ecosystems/:id/contentlist'
							)} nested`}
						>
							<NavLink
								to={'/ecosystems/:id/contentlist'.replace(
									':id',
									ecosystem.uuid
								)}
								className="nav-link"
								activeClassName="active"
							>
								<img
									className={'small-image'}
									alt={'Content List'}
									src={MENU_CONTENT}
								/>
								<p>Content List</p>
							</NavLink>
						</li>*/}
						{/*<li
							className={`${this.activeRoute('/ecosystems/:id/users')} nested`}
						>
							<NavLink
								to={'/ecosystems/:id/users'.replace(':id', ecosystem.uuid)}
								className="nav-link"
								activeClassName="active"
							>
								<img className={'small-image'} alt={'Users'} src={MENU_USERS} />
								<p>Users</p>
							</NavLink>
						</li>*/}
						<li>
							<NavLink
								to={'/ecosystems/:id/security'.replace(':id', ecosystem.uuid)}
								className={'nav-link root'}
							>
								<img
									className={'small-image'}
									alt={'Policies'}
									src={MENU_POLICIES}
								/>
								<p>Policies</p>
								{/*<img
									className={'small-image add'}
									alt={'add'}
									src={MENU_PLUS_RECT}
								/>*/}
							</NavLink>
						</li>
						<li
							className={`${this.activeRoute(
								'/ecosystems/:id/security'
							)} nested`}
						>
							<NavLink
								to={'/ecosystems/:id/security'.replace(':id', ecosystem.uuid)}
								className="nav-link"
								activeClassName="active"
							>
								<img
									className={'small-image'}
									alt={'Security'}
									src={MENU_SECURITY}
								/>
								<p>Security</p>
								{/*<div className={'sidebar-badge'}>
									<img
										className={'sidebar-badge--container'}
										alt={'Badge'}
										src={MENU_BADGE_CONTAINER}
									/>
									<p className={'sidebar-badge--value'}>2</p>
								</div>*/}
							</NavLink>
						</li>
						<li
							className={`${this.activeRoute(
								'/ecosystems/:id/addresstranslations'
							)} nested`}
						>
							<NavLink
								to={'/ecosystems/:id/addresstranslations'.replace(
									':id',
									ecosystem.uuid
								)}
								className="nav-link"
								activeClassName="active"
							>
								<img
									className={'small-image translations'}
									alt={'Address Translation'}
									src={MENU_ADDRESS}
								/>
								<p>Address Translation</p>
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/ecosystems/:id/reports'.replace(':id', ecosystem.uuid)}
								className={'nav-link root'}
							>
								<img
									className={'small-image'}
									alt={'Reports'}
									src={MENU_REPORT}
								/>
								<p>Reports</p>
							</NavLink>
						</li>
						{/*<li>
							<NavLink
								to={'/ecosystems/:id/governance'.replace(':id', ecosystem.uuid)}
								className={'nav-link root'}
							>
								<img
									className={'small-image users'}
									alt={'Governance'}
									src={MENU_GOVERNANCE}
								/>
								<p>Governance</p>
							</NavLink>
						</li>*/}
					</ul>
					<div className={'sidebar-divider'} />
					<div className={'hide-component'}>
						<div className={'sidebar-item threat-index component-coming-soon'}>
							<div className={'flex-column'}>
								<div className={'centered-row'}>
									<p className={'threat-index--value'}>40</p>
									<img
										alt={'threat-indicator'}
										src={GREEN_TICK}
										className={'threat-index--image'}
									/>
								</div>
								<p className={'threat-index--title'}>Threat Index</p>
							</div>
							<img
								src={FAKE_CHART_SIDEBAR}
								className={'threat-index--chart'}
								alt={'threat-chart'}
							/>
						</div>
						<div className={'sidebar-divider'} />
						<div className={'sidebar-item status-info component-coming-soon'}>
							<div className={'flex-column equal'}>
								<p className={'status-info--good-value'}>15</p>
								<p className={'status-info--title'}>Connected</p>
							</div>
							<div className={'divider'} />
							<div className={'flex-column equal right'}>
								<p className={'status-info--bad-value'}>345</p>
								<p className={'status-info--title'}>Down</p>
							</div>
						</div>
						<div className={'sidebar-divider'} />
						<div className={'sidebar-item notifications component-coming-soon'}>
							<div className={'centered-row notifications--title-container'}>
								<p className={'notifications--title'}>Status notifications</p>
								<img
									src={CHEVRON_DOWN_WHITE}
									className={'notifications--chevron'}
									alt={'chevron-down'}
								/>
								<img
									src={FULL_SIZE_ICON}
									className={'notifications--fullsize'}
									alt={'fullsize'}
								/>
							</div>
							{this.props.notifications.map(not => (
								<div
									key={`notifications-index-${not.id}`}
									className={'notifications--item'}
								>
									<img
										src={NOTIFICATIONS_ARROW_RIGHT}
										className={'notifications--arrow'}
										alt={'arrow'}
									/>
									<p className={'notifications--content'}>{not.content}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Sidebar.defaultProps = {
	ecosystem: {},
	notifications: [
		{
			id: 1,
			content: 'Sed ut perspiciatis unde omnis'
		},
		{
			id: 2,
			content: 'Sed ut perspiciatis unde omnis'
		}
	]
}

Sidebar.propTypes = {
	location: PropTypes.object.isRequired,
	ecosystem: PropTypes.object.isRequired,
	notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => {
	return {
		ecosystem: state.ecosystems.currentEcosystem
	}
}

export default connect(
	mapStateToProps,
	null
)(Sidebar)
