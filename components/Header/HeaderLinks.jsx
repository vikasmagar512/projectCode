import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
	Dropdown,
	MenuItem,
	Nav,
	NavItem,
	OverlayTrigger
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
	NAVBAR_NOTIFICATION_FAKE,
	NAVBAR_SEARCH,
	NAVBAR_USER,
	COMMIT_ICON
} from '../../assets/Icons'
import { logout } from '../../store/common-scenario-actions'
import { pathSlugToPageName } from '../../utils/utils'
import { CommitPopover } from '../CommitPopover/CommitPopover'
import {
	acceptCommit,
	acceptRollback
} from '../../store/common-scenario-actions'
import history from '../../history'

class HeaderLinks extends Component {
	state = {
		show: false
	}

	handleAcceptCommit = () => {
		this.setState({ show: false })
		this.props.acceptCommit()
	}

	handleAcceptRollback = async () => {
		this.setState({ show: false })
		await this.props.acceptRollback()
		window.location.reload()
	}

	render() {
		const {
			location: { pathname },
			selectedCustomer
		} = this.props
		const splittedPath = pathname.split('/')
		const path = splittedPath[splittedPath.length - 1]
		// eslint-disable-next-line no-undefined
		const slug = this.props.slug !== undefined ? this.props.slug : true
		return (
			<div>
				{slug && (
					<Nav pullLeft>
						<h2 className={'page-title'}>{pathSlugToPageName(path)}</h2>
					</Nav>
				)}
				<Nav pullRight>
					{this.props.showCommit &&
						this.props.ecosystem &&
						this.props.ecosystem.status === 'pending_changes' && (
							<NavItem eventKey={0} href="#" className={'navbar-item'}>
								<OverlayTrigger
									show={this.state.show}
									trigger="click"
									placement="bottom"
									rootClose
									overlay={CommitPopover({
										afterCommit: this.handleAcceptCommit,
										afterRollback: this.handleAcceptRollback
									})}
								>
									<div
										className={'flex-row nav-profile'}
										onClick={() => this.setState({ show: !this.state.show })}
									>
										<div className="ikon-with-badge">
											<img
												src={COMMIT_ICON}
												alt={'navbar-commit'}
												className={'navbar-user'}
											/>
											<div className="ikon-with-badge--badge" />
										</div>
										<p>Commit</p>
										<i className={'pe-7s-angle-down'} />
									</div>
								</OverlayTrigger>
							</NavItem>
						)}
					{this.props.showSearch && (
						<NavItem
							eventKey={0}
							href="#"
							className={'hide component navbar-item component-coming-soon'}
						>
							<div>
								<img
									src={NAVBAR_SEARCH}
									alt={'navbar-search'}
									className={'navbar-search'}
								/>
							</div>
						</NavItem>
					)}
					<NavItem
						eventKey={1}
						href="#"
						className={'hide-component navbar-item component-coming-soon'}
					>
						<div>
							<img
								src={NAVBAR_NOTIFICATION_FAKE}
								alt={'navbar-notification'}
								className={'navbar-notification'}
							/>
						</div>
					</NavItem>
					<div className={'navbar-item last'}>
						<div className={'flex-row nav-profile'}>
							<Dropdown id={'dropdown-profile-options'}>
								<Dropdown.Toggle id="dropdown-basic">
									<img
										src={NAVBAR_USER}
										alt={'navbar-user'}
										className={'navbar-user'}
									/>
									<p>{this.props.username}</p>
									<i className={'pe-7s-angle-down'} />
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<MenuItem
										className={'wedge-menu-item'}
										onSelect={() => {
											history.replace('/auth/profile', { from: pathname })
										}}
									>
										Profile
									</MenuItem>
									<MenuItem
										className={'wedge-menu-item'}
										onSelect={() => {
											history.replace('/auth/customers')
										}}
									>
										{selectedCustomer
											? `My Organization (${selectedCustomer.name})`
											: 'My Organization'}
									</MenuItem>
									<MenuItem
										className={'wedge-menu-item'}
										onSelect={this.props.logout}
									>
										Logout
									</MenuItem>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
				</Nav>
			</div>
		)
	}
}

HeaderLinks.defaultProps = {
	showSearch: false,
	showCommit: false
}

HeaderLinks.propTypes = {
	showSearch: PropTypes.bool.isRequired,
	showCommit: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	selectedCustomer: PropTypes.object.isRequired,
	ecosystem: PropTypes.object,
	logout: PropTypes.func.isRequired,
	acceptCommit: PropTypes.func.isRequired,
	acceptRollback: PropTypes.func.isRequired,
	slug: PropTypes.bool
}

const mapStateToProps = state => ({
	selectedCustomer: state.auth.selectedCustomer,
	username: state.auth.username,
	ecosystem: state.ecosystems.currentEcosystem
})

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout()),
	acceptCommit: () => dispatch(acceptCommit()),
	acceptRollback: () => dispatch(acceptRollback())
})

const ConnectedHeaderLinks = connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderLinks)

export default withRouter(ConnectedHeaderLinks)
