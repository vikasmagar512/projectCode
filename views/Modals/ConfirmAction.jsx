import PropTypes from 'prop-types'
import React from 'react'
import { ConfirmFooter } from './commons'

export default class ConfirmAction extends React.Component {
	render() {
		return (
			<div>
				<div className={'action__confirm'}>
					{`Would you like to remove this ${this.props.item}?`}
				</div>
				<div className={'wedge-modal__footer'}>
					<ConfirmFooter onYes={this.props.onYes} onNo={this.props.onNo} />
				</div>
			</div>
		)
	}
}

ConfirmAction.propTypes = {
	item: PropTypes.string.isRequired,
	onYes: PropTypes.func.isRequired,
	onNo: PropTypes.func.isRequired
}
