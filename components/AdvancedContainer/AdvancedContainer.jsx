import PropTypes from 'prop-types'
import React from 'react'
import './advanced-container.scss'

export default class AdvancedContainer extends React.PureComponent {
	state = {
		expanded: false
	}

	handleClick = () => this.setState({ expanded: !this.state.expanded })

	render() {
		return (
			<div className={'advanced-container'}>
				<p className={'advanced-container--title'} onClick={this.handleClick}>
					<i
						className={`pe-7s-angle-down ${
							this.state.expanded ? 'inverted' : ''
						}`}
					/>
					<span>Advanced</span>
				</p>
				<div
					className={`advanced-container--content ${
						this.state.expanded ? 'visible' : ''
					}`}
				>
					{this.props.children}
				</div>
			</div>
		)
	}
}

AdvancedContainer.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	])
}
