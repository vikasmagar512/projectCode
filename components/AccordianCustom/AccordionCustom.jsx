import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AccordionSection from './AccordionSection'
import './accordion.scss'

class AccordionCustom extends Component {
	static propTypes = {
		allowMultipleOpen: PropTypes.bool,
		children: PropTypes.instanceOf(Object).isRequired
	}

	constructor(props) {
		super(props)

		const openSections = {}

		this.props.children.forEach(child => {
			if (child.props.isOpen) {
				openSections[child.props.label.type] = true
			}
		})

		this.state = { openSections }
	}

	onClick = label => {
		const {
			props: { allowMultipleOpen },
			state: { openSections }
		} = this
		const { type } = label

		const isOpen = !!openSections[type]

		if (allowMultipleOpen) {
			this.setState({
				openSections: {
					...openSections,
					[type]: !isOpen
				}
			})
		} else {
			this.setState({
				openSections: {
					[type]: !isOpen
				}
			})
		}
	}

	render() {
		const {
			onClick,
			props: { children },
			state: { openSections }
		} = this

		return (
			<div className={'accordionSection'}>
				{children.map((child, i) => (
					<AccordionSection
						key={i}
						isOpen={!!openSections[child.props.label.type]}
						label={child.props.label}
						onClick={onClick}
					>
						{child.props.children}
					</AccordionSection>
				))}
			</div>
		)
	}
}

export default AccordionCustom
