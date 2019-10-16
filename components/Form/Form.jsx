import PropTypes from 'prop-types'
import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import Select from 'react-select'
import './form.scss'

class FormGroup extends React.PureComponent {
	render() {
		const {
			children,
			label,
			center = false,
			full = false,
			self = false,
			required = false,
			...rest
		} = this.props
		return (
			<div
				className={`form__group${center ? '-center' : ''} ${
					full ? 'full' : ''
				} ${self ? 'self' : ''} ${rest.extraClass || ''}`}
			>
				<p className={'form__label'}>
					{label}
					{required && <span className={'asterisk'}>*</span>}
				</p>
				{children}
			</div>
		)
	}
}

FormGroup.propTypes = {
	children: PropTypes.element,
	label: PropTypes.string,
	center: PropTypes.bool,
	full: PropTypes.bool,
	self: PropTypes.bool,
	required: PropTypes.bool
}

class TextInput extends React.PureComponent {
	render() {
		const {
			value,
			placeholder,
			onChange,
			extraClass,
			multiline,
			...rest
		} = this.props
		this.inputProps = {
			type: 'text',
			value: value,
			placeholder: placeholder,
			onChange: e => onChange(e.target.value),
			className: `form__input form__textinput ${
				multiline ? 'multiline' : ''
			} ${extraClass || ''}`,
			...rest
		}
		if (multiline) {
			return <textarea {...this.inputProps} />
		} else {
			return <input {...this.inputProps} />
		}
	}
}

TextInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	multiline: PropTypes.bool,
	extraClass: PropTypes.string
}

class ToggleButton extends React.PureComponent {
	render() {
		const { selectedClass, selected, onChange, options } = this.props
		return (
			<ButtonGroup className={'space-above-8'}>
				{options.map(opt => (
					<Button
						key={`toggle-button-index-key-${opt.value}-${opt.name}`}
						onClick={() => onChange(opt.value)}
						disabled={opt.disabled}
						className={`form__input form__toggle ${
							selected === opt.value ? selectedClass : ''
						}`}
						bsStyle={selected === opt.value ? 'primary' : 'default'}
					>
						{opt.label}
					</Button>
				))}
			</ButtonGroup>
		)
	}
}

ToggleButton.propTypes = {
	selectedClass: PropTypes.string,
	selected: PropTypes.any,
	onChange: PropTypes.func,
	options: PropTypes.array
}

const colourStyles = {
	control: styles => ({
		...styles,
		backgroundColor: 'white',
		paddingLeft: 0,
		boxShadow: 'none',
		'&:hover': { borderColor: '#f68b1e' },
		border: '1px solid transparent'
	}),
	indicatorSeparator: styles => ({
		...styles,
		width: 0
	}),
	menuContainerStyle: styles => ({
		...styles,

		zIndex: 50005
	}),
	menu: styles => ({
		...styles,
		zIndex: 101
	})
}

class SelectInput extends React.PureComponent {
	emptyFunction = () => {}

	render() {
		const { placeholder, value, onChange, options } = this.props
		return (
			<Select
				className={'form__input form__select'}
				name="color"
				maxMenuHeight="150"
				placeholder={placeholder}
				value={value}
				onChange={onChange || this.emptyFunction}
				options={options}
				styles={colourStyles}
			/>
		)
	}
}

SelectInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.any,
	onChange: PropTypes.func,
	options: PropTypes.array
}

export default {
	Group: FormGroup,
	Text: TextInput,
	Select: SelectInput,
	Toggle: ToggleButton
}
