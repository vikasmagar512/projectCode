import React, { Component } from 'react'
import { number } from 'prop-types'

class PayPalRegistration extends Component {
	render() {
		const { selectedIndex, componentIndex } = this.props
		if (selectedIndex !== componentIndex) return null
		return <div>PayPal will be here</div>
	}
}
PayPalRegistration.propTypes = {
	selectedIndex: number.isRequired,
	componentIndex: number.isRequired
}

export default PayPalRegistration
