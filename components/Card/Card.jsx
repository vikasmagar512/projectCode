import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

export class Card extends PureComponent {
	render() {
		return (
			<div
				className={`card ${this.props.plain ? ' card-plain' : ''} ${
					this.props.className
				}`}
			>
				{this.props.header && (
					<div
						className={'header' + (this.props.hCenter ? ' text-center' : '')}
					>
						<h4 className="title">{this.props.title}</h4>
						<p className="category">{this.props.category}</p>
					</div>
				)}
				<div className={'content'}>{this.props.children}</div>
			</div>
		)
	}
}

Card.propTypes = {
	className: PropTypes.string,
	header: PropTypes.bool,
	plain: PropTypes.bool,
	hCenter: PropTypes.bool,
	title: PropTypes.string,
	category: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
}

Card.defaultProps = {
	header: true
}

export default Card
