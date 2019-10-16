import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { BLUE_FORWARD_ARROW } from '../../assets/Icons'
import './customers-form.scss'
import { useCustomer } from './scenario-actions'

class CustomersForm extends Component {
	componentDidMount() {
		if (this.props.location.state) {
			const { afterLogin, from } = this.props.location.state
			if (
				afterLogin &&
				this.props.customers &&
				this.props.customers.length === 1
			) {
				this.props.useCustomer(this.props.customers[0], from)
			}
		}
	}

	handleSelectCustomer = customer => {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		this.props.useCustomer(customer, from)
	}

	renderCustomers = () => {
		const length = this.props.customers ? this.props.customers.length : 0
		if (length) {
			return (
				<div className={'customers-container'}>
					{this.props.customers.map((customer, index) => {
						const last = index + 1 === length
						return (
							<React.Fragment key={`customer-index-${index}-${customer.uuid}`}>
								<div
									className={`single-customer`}
									onClick={() => this.handleSelectCustomer(customer)}
								>
									<p className={`single-customer--name`}>{customer.name}</p>
									<img
										src={BLUE_FORWARD_ARROW}
										alt={'blue-forward'}
										className={'forward-icon'}
									/>
								</div>
								{!last && <div className={'divider'} />}
							</React.Fragment>
						)
					})}
				</div>
			)
		} else {
			return <h4>You have no customers!</h4>
		}
	}

	render() {
		return (
			<div className={'customers-form-page--content'}>
				<div className={'customers-form'}>
					<h2 className={'title'}>All Organizations</h2>
					{this.renderCustomers()}
				</div>
			</div>
		)
	}
}

CustomersForm.propTypes = {
	useCustomer: PropTypes.func.isRequired,
	customers: PropTypes.array.isRequired,
	location: PropTypes.object.isRequired
}

CustomersForm.defaultProps = {
	error: '',
	isLoading: false,
	customers: []
}

const mapStateToProps = state => {
	return {
		customers: state.auth.customers
	}
}

const mapDispatchToProps = dispatch => {
	return {
		useCustomer: (customer, redirect) =>
			dispatch(useCustomer(customer, redirect))
	}
}

const ConnectedCustomersForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomersForm)
export default withRouter(ConnectedCustomersForm)
