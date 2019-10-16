import React, { Component } from 'react'
import StripeSourceRegistration from '../../../components/StripeSourceRegistration/StripeSourceRegistration'
// import PayPalRegistration from '../../../components/PayPalRegistration/PayPalRegistration'
import ContractIdRegistration from '../../../components/ContractIdRegistration/ContractIdRegistration'
import TabsHeader from '../../../components/TabsHeader/TabsHeader'

import '../sign-up-form.scss'

class BillingSubForm extends Component {
	state = {
		selectedIndex: 0
	}

	tabs = [
		{
			name: 'Credit Card',
			iconClassName: 'icon-card'
		},
		{
			name: 'Contract ID',
			iconClassName: 'icon-suer'
		}
	]

	selectTab = index => {
		this.setState(() => ({
			selectedIndex: index
		}))
	}

	render() {
		const { selectedIndex } = this.state
		return (
			<div className="form-container">
				<TabsHeader
					selectedIndex={selectedIndex}
					onSelect={this.selectTab}
					tabs={this.tabs}
				/>
				<StripeSourceRegistration
					selectedIndex={selectedIndex}
					componentIndex={0}
				/>
				{/*<PayPalRegistration selectedIndex={selectedIndex} componentIndex={1} />*/}
				<ContractIdRegistration
					selectedIndex={selectedIndex}
					componentIndex={1}
				/>
			</div>
		)
	}
}
export default BillingSubForm
