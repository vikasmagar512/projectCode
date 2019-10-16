import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, MenuItem } from 'react-bootstrap'
import Select from 'react-select'
import AddButton from '../AddButton/AddButton'
import { PROTOCOL } from '../../enums'
import './create-service-dropdown.scss'

export default class CreateServiceDropdown extends React.Component {
	constructor(props) {
		super(props)
		const { options, selected } = this.props
		let label = ''
		if (selected && selected.label) {
			label =
				selected.label.length > 15
					? selected.label.slice(0, 15)
					: selected.label
		}
		this.state = {
			label,
			options,
			open: false,
			createOpen: false,
			protocol: '',
			port: '',
			type: '',
			code: '',
			name: ''
		}
	}

	componentDidUpdate(prevProps) {
		const { selected } = this.props
		let { options } = this.props
		let { label } = this.state
		if (selected === '' && selected !== prevProps.selected) {
			this.setState({
				label: '',
				options
			})
		} else if (selected && selected !== prevProps.selected) {
			label =
				selected.label.length > 15
					? selected.label.slice(0, 15)
					: selected.label
			options = options.filter(opt => opt.value !== selected.value)
			this.setState({
				label,
				options
			})
		} else if (
			this.props.options &&
			this.props.options.length !== prevProps.options.length
		) {
			this.setState({
				options: this.props.options
			})
		}
	}

	handleChange = event => {
		event.preventDefault()
		let { options } = this.props
		options = options.filter(opt =>
			opt.label.toLowerCase().includes(event.target.value.toLowerCase())
		)
		this.setState({
			label: event.target.value,
			open: true,
			options
		})
	}

	selectService = option => {
		this.props.onChange(option)
		this.setState({
			open: false
		})
	}

	onFocus = () => {
		this.setState({
			open: true
		})
	}

	onToggle = (isOpen, event) => {
		if (event && event.target.id !== 'service-input') {
			this.setState({ open: isOpen })
		}
	}

	onCloseForm = () => {
		this.setState({
			createOpen: false,
			name: '',
			port: '',
			type: '',
			code: ''
		})
	}

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleChangeProtocol = option => {
		this.setState({ protocol: option })
		if (option.value === 'icmp') {
			this.setState({ port: '' })
		} else {
			this.setState({ type: '', code: '' })
		}
	}

	handleSubmit = event => {
		event.preventDefault()
		const { name, protocol, code, type, port } = this.state
		const service = {
			name,
			protocol: protocol.value,
			code: code ? parseInt(code) : 0,
			type: type ? parseInt(type) : 0,
			port: port ? parseInt(port) : 0
		}

		this.props.onCreate(service)
		this.setState({ createOpen: false })
		this.initForms()
	}

	initForms = () => {
		this.setState({
			protocol: '',
			port: '',
			type: '',
			code: '',
			name: ''
		})
	}

	render() {
		const { label, options, createOpen } = this.state

		return (
			<Dropdown
				id={'service-dropdown'}
				className="service-with-create form__group"
				open={this.state.open}
				onToggle={this.onToggle}
			>
				<Dropdown.Toggle>
					<input
						id={'service-input'}
						className={'input-no-border'}
						value={label}
						placeholder={this.props.placeholder}
						onChange={this.handleChange}
						onFocus={this.onFocus}
						autoComplete="off"
					/>
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{createOpen ? (
						<div className={'create-service-form'}>
							<div className={'create-form-header'}>
								<span>{'Add Service'}</span>
								<i
									className={'material-icons'}
									onClick={() => this.onCloseForm()}
								>
									{'close'}
								</i>
							</div>
							<form onSubmit={this.handleSubmit}>
								<div className={'input-forms'}>
									<Select
										placeholder={'Protocol'}
										options={PROTOCOL}
										styles={customStyle}
										value={this.state.protocol}
										onChange={this.handleChangeProtocol}
									/>
									{this.state.protocol.value === 'icmp' ? (
										<React.Fragment>
											<input
												type={'number'}
												name={'type'}
												placeholder={'Type'}
												value={this.state.type}
												required
												min={0}
												max={255}
												onChange={this.handleInputChange}
											/>
											<input
												type={'number'}
												name={'code'}
												placeholder={'Code'}
												value={this.state.code}
												required
												min={0}
												max={255}
												onChange={this.handleInputChange}
											/>
										</React.Fragment>
									) : (
										<input
											type={'number'}
											className={'service-port'}
											name={'port'}
											placeholder={'Port'}
											value={this.state.port}
											min={0}
											required
											onChange={this.handleInputChange}
										/>
									)}
									<input
										type={'text'}
										className={'service-name'}
										name={'name'}
										placeholder={'Name'}
										value={this.state.name}
										required
										onChange={this.handleInputChange}
									/>
								</div>
								<button type={'submit'} className={'create-servie-btn'}>
									{'Save'}
								</button>
							</form>
						</div>
					) : (
						<React.Fragment>
							{options.map((option, index) => (
								<MenuItem
									key={`service-drop-${index}`}
									className={'wedge-menu-item'}
									onSelect={() => this.selectService(option)}
								>
									<span>{option.label}</span>
								</MenuItem>
							))}
							<div className={'add-new-service'}>
								<AddButton onClick={() => this.setState({ createOpen: true })}>
									{'Add Service'}
								</AddButton>
							</div>
						</React.Fragment>
					)}
				</Dropdown.Menu>
			</Dropdown>
		)
	}
}

const customStyle = {
	control: styles => ({
		...styles,
		backgroundColor: 'white',
		paddingLeft: 0,
		boxShadow: 'none',
		border: 'none',
		borderBottom: '1px solid #999',
		borderRadius: 0,
		height: 40
	}),
	input: styles => ({
		...styles,
		color: '#6d8994'
	}),
	placeholder: styles => ({
		...styles,
		color: '#ccc'
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

CreateServiceDropdown.propTypes = {
	selected: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		.isRequired,
	options: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onCreate: PropTypes.func.isRequired
}
