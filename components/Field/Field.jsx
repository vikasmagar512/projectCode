/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-find-dom-node */
import PropTypes from 'prop-types'
import React from 'react'
import './field.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactTooltip from 'react-tooltip'
import { findDOMNode } from 'react-dom'

class FieldGroup extends React.PureComponent {
	renderSecondLabel = () => {
		if (this.props.secondaryLabel) {
			return (
				<React.Fragment>
					<div className={'divider--small'} />
					<span className={'field__label secondary'}>
						{this.props.secondaryLabel}
					</span>
				</React.Fragment>
			)
		}
	}

	render() {
		const {
			children,
			label,
			center = false,
			full = false,
			self = false,
			...rest
		} = this.props
		return (
			<div
				className={`field__group${center ? '-center' : ''} ${
					full ? 'full' : ''
				} ${self ? 'self' : ''} ${rest.extraClass || ''}`}
			>
				<div className={'field__label'}>
					<span className={'primary'}>{label}</span>
					{this.renderSecondLabel()}
				</div>
				{children}
			</div>
		)
	}
}

FieldGroup.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	label: PropTypes.string,
	center: PropTypes.bool,
	full: PropTypes.bool,
	self: PropTypes.bool,
	secondaryLabel: PropTypes.string
}

class TextField extends React.PureComponent {
	render() {
		const { full = false, copy = false } = this.props
		return copy ? (
			<div className={'field__copyfield'}>
				<button className={'copy-button'}>
					<input
						className={'copy__textfield'}
						type="text"
						value={this.props.text}
						readOnly
					/>
					<span ref="foo" data-tip="Copied!" data-for="tooltip" />
					<CopyToClipboard
						text={this.props.text}
						onCopy={() => {
							ReactTooltip.show(findDOMNode(this.refs.foo))
						}}
					>
						<i className="copy__icon fa fa-clone fa-flip-horizontal" />
					</CopyToClipboard>
				</button>
				<ReactTooltip
					id="tooltip"
					delayHide={1000}
					type="info"
					afterShow={() => ReactTooltip.hide(findDOMNode(this.refs.foo))}
				/>
			</div>
		) : (
			<p className={`field__textfield ${full ? 'full' : ''}`}>
				{this.props.text}
			</p>
		)
	}
}

TextField.propTypes = {
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	full: PropTypes.bool,
	copy: PropTypes.bool
}

TextField.defaultProps = {
	text: '',
	full: false
}

export default {
	Group: FieldGroup,
	Text: TextField
}
