import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, MenuItem } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import './select-with-create.scss'
import groupValidationSchema from '../../validationSchemas/groupValidationSchema'
import AddrIcon from '../../assets/img/PNG/address.png'
import GroupIcon from '../../assets/img/PNG/Publicgroup.png'
import GateIcon from '../../assets/img/PNG/gateway.png'

const MAX_CATEGORY_LEN = 18
export default class SelectWithCreate extends React.Component {
	constructor(props) {
		super(props)
		const { options, selected } = this.props
		let label = ''
		if (selected && selected.label) {
			label =
				selected.label.length > MAX_CATEGORY_LEN
					? selected.label.slice(-MAX_CATEGORY_LEN)
					: selected.label
		}
		this.state = {
			label,
			options,
			open: false
		}
	}

	componentDidUpdate(prevProps) {
		const { selected } = this.props
		let { options } = this.props
		let { label } = this.state
		if (selected && selected !== prevProps.selected) {
			label =
				selected.label.length > MAX_CATEGORY_LEN
					? selected.label.slice(-MAX_CATEGORY_LEN)
					: selected.label
			options = options.filter(opt => opt.value !== selected.value)
			this.setState({
				label,
				options
			})
		} else if (options && options !== prevProps.options) {
			this.setState({
				options
			})
		}
	}

	handleChange = event => {
		let { options } = this.props
		options = options.filter(opt =>
			opt.label.toLowerCase().includes(event.target.value.toLowerCase())
		)
		this.setState({
			label: event.target.value,
			options
		})
	}
	onFocus = () => {
		this.setState({ open: true })
	}
	onToggle = (isOpen, event) => {
		if (event.target.id !== `${this.props.placeholder}-input`) {
			this.setState({ open: isOpen })
		}
	}

	render() {
		let { label, options } = this.state
		return (
			<Dropdown
				id={this.props.placeholder}
				className="select-with-create form__group"
				open={this.state.open}
				onToggle={this.onToggle}
			>
				<Dropdown.Toggle>
					<input
						id={`${this.props.placeholder}-input`}
						className={'input-no-border'}
						value={label}
						placeholder={this.props.placeholder}
						onChange={this.handleChange}
						onFocus={this.onFocus}
					/>
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{options.map((opt, index) => (
						<MenuItem
							key={`select-item-${index}-${opt.value}`}
							className={'wedge-menu-item'}
							onSelect={() => this.props.onChange(opt)}
						>
							{opt.type && opt.type !== 'any' ? (
								<div>
									<img
										className={`${opt.type}-Icon`}
										src={
											opt.type === 'gateway'
												? GateIcon
												: opt.type === 'address'
												? AddrIcon
												: opt.type === 'group'
												? GroupIcon
												: ''
										}
										alt={opt.type}
									/>
									<span>{opt.label}</span>
								</div>
							) : opt.icon ? (
								<div>
									<div className={'imgContainer'}>
										<img height={24} src={opt.icon} alt={opt.label} />
									</div>
									<span>{opt.label}</span>
								</div>
							) : (
								<span>{opt.label}</span>
							)}
						</MenuItem>
					))}
					{this.props.createOpened && (
						<Formik
							initialValues={{
								name: ''
							}}
							validationSchema={groupValidationSchema}
							onSubmit={(values, { resetForm }) => {
								this.props.onCreate(values.name)
								resetForm()
							}}
						>
							{({ errors }) => (
								<Form className="create-new">
									<div className="field-error-container">
										<Field
											name="name"
											placeholder="New group name"
											onSelect={e => e.stopPropagation()}
											onFocus={e => e.preventDefault()}
											className="form__textinput"
										/>
										<p className="error-text">{errors.name}</p>
									</div>
									<button
										disabled={!isEmpty(errors)}
										type="submit"
										className="save-button btn"
									>
										Save
									</button>
								</Form>
							)}
						</Formik>
					)}
				</Dropdown.Menu>
			</Dropdown>
		)
	}
}

SelectWithCreate.propTypes = {
	selected: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		.isRequired,
	options: PropTypes.array.isRequired,
	createOpened: PropTypes.bool.isRequired,
	placeholder: PropTypes.string,
	onCreate: PropTypes.func,
	onChange: PropTypes.func.isRequired
}
