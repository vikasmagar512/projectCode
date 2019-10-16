import React from 'react'
import PropTypes from 'prop-types'
import './select-with-create-object.scss'
import AccordionCustom from '../AccordianCustom/AccordionCustom'
import GateIcon from '../../assets/img/PNG/gateway.png'
import AddrIcon from '../../assets/img/PNG/address.png'
import GroupIcon from '../../assets/img/PNG/Publicgroup.png'
import { Field, Form, Formik } from 'formik'
import groupValidationSchema from '../../validationSchemas/groupValidationSchema'
import { isEmpty } from 'lodash'

export default class SelectWithCreateObject extends React.Component {
	constructor(props) {
		super(props)
		const { options, selected } = this.props
		let label = ''
		if (selected && selected.label) {
			label =
				selected.label.length > 15 ? selected.label.slice(-15) : selected.label
		}
		this.state = {
			label,
			options,
			showMenu: false,
			openCreate: false
		}

		this.showMenu = this.showMenu.bind(this)
		this.closeMenu = this.closeMenu.bind(this)
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
				selected.label.length > 15 ? selected.label.slice(-15) : selected.label
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

	showMenu(event) {
		event.preventDefault()
		event.stopPropagation()
		if (!this.state.showMenu) {
			this.setState({ showMenu: true }, () => {
				document.addEventListener('click', this.closeMenu)
			})
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (
			nextProps.options &&
			nextProps.options.length !== this.props.options.length
		) {
			document.addEventListener('click', this.closeMenu)
		}

		if (
			nextProps.createModalOpenedObject === false &&
			this.props.createModalOpenedObject === true
		) {
			document.addEventListener('click', this.closeMenu)
		}
	}

	closeMenu(event) {
		let l =
			this.createFormHeader && this.createFormHeader.contains(event.target)

		if (
			!(
				event.target.id === `${this.props.placeholder}-input` ||
				event.target.id === `${this.props.placeholder}-container` ||
				event.target.id === `${this.props.placeholder}-closeCreate` ||
				(typeof event.target.className === 'string' &&
					(event.target.className.includes(
						`${this.props.placeholder}-innerContainer`
					) ||
						event.target.className.includes('accordion-toggle'))) ||
				l
			)
		) {
			this.setState({ showMenu: false, openCreate: false }, () => {
				document.removeEventListener('click', this.closeMenu)
			})
		}
	}

	createServiceModal = event => {
		event.stopPropagation()
		this.setState({ openCreate: true })
	}
	closeSource = event => {
		event.stopPropagation()
		this.setState({ openCreate: false })
	}
	onFocus = event => {
		event.preventDefault()
		event.stopPropagation()
		this.setState({ showMenu: true }, () => {
			document.addEventListener('click', this.closeMenu)
		})
	}
	onInputFocus = event => {
		event.preventDefault()
		event.stopPropagation()
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

	openCreateObjectModal(event, type) {
		event.stopPropagation()
		if (type !== 'group') {
			this.closeSource(event)
			document.removeEventListener('click', this.closeMenu)
			this.props.openCreateObjectModal(type, this.props.placeholder)
		} else {
			this.setState({ profileGroupCreateOpened: true })
		}
	}

	render() {
		let { label, options, profileGroupCreateOpened } = this.state
		const types = [
			{
				type: 'group',
				value: 'group',
				label: 'Profile Group'
			},
			{
				type: 'address',
				value: 'address',
				label: 'Address'
			},
			{
				type: 'gateway',
				value: 'gateway',
				label: 'Gateway'
			}
		]
		let categories = options
			.filter(k => k.type !== 'any')
			.reduce((arr, k) => {
				let found = arr.findIndex(a => a.type === k.type)
				if (found === -1) {
					return arr.concat({
						name: types.find(p => p.type === k.type).label,
						type: k.type,
						items: [k]
					})
				} else {
					arr[found].items.push(k)
					return arr
				}
			}, [])
		const any = options => {
			let k = options.find(k => k.type === 'any')
			return k ? (
				<div className={'accordionSection'}>
					<div
						className={'toggle header any'}
						onClick={() => this.props.onChange(k)}
					>
						<span>{k.value}</span>
					</div>
				</div>
			) : null
		}
		const { createModalText, fieldType } = this.props
		return (
			<div
				className={`select-with-create-object form__group ${
					this.state.showMenu ? 'open' : ''
				} btn-group`}
			>
				<div
					id={`${this.props.placeholder}-container`}
					className={`${this.props.placeholder}-container dropdown`}
				>
					<button
						className={'dropdown-toggle btn btn-default'}
						onClick={this.onFocus}
					>
						<input
							id={`${this.props.placeholder}-input`}
							className={'input-no-border'}
							value={label}
							placeholder={this.props.placeholder}
							onChange={this.handleChange}
							onFocus={this.onInputFocus}
							autoComplete={'off'}
						/>
						<span className={'caret'} />
					</button>
				</div>

				{this.state.showMenu ? (
					<div className={'dropdown-menu'}>
						{!this.state.openCreate ? (
							<div>
								<div className={'accordion-wrapper'}>
									{any(options)}
									<AccordionCustom allowMultipleOpen>
										{categories.map((data, index) => (
											<div label={data} key={index} isOpen>
												{data.items.map((opt, JIndex) => {
													return (
														<div
															key={`select-item-${index + '_' + JIndex}-${
																opt.value
															}`}
															className={'accordion-open'}
															onClick={() => this.props.onChange(opt)}
														>
															<div>
																<span>{opt.label}</span>
															</div>
														</div>
													)
												})}
											</div>
										))}
									</AccordionCustom>
								</div>

								<div
									className={`staticCreate ${this.props.placeholder}-dontClose`}
									onClick={this.createServiceModal}
								>
									<div className={`add-button`}>
										<div className={'square'}>+</div>
										<p className={'text'}>{`Add ${fieldType}`}</p>
									</div>
								</div>
							</div>
						) : (
							<div
								className={'createModal'}
								ref={element => {
									this.createFormHeader = element
								}}
							>
								<div className={'headerModal'}>
									<div className={'actions'}>
										<i
											className={'material-icons'}
											id={`${this.props.placeholder}-closeCreate`}
											onClick={this.closeSource}
										>
											{'keyboard_backspace'}
										</i>
										<i
											className={'material-icons'}
											id={`${this.props.placeholder}-closeCreate`}
											onClick={this.closeSource}
										>
											{'close'}
										</i>
									</div>
									<p>{createModalText}</p>
								</div>

								<div className={`${this.props.placeholder}-dontClose content`}>
									<div style={{ userSelect: 'none' }}>
										{types.map((opt, index) => (
											<div
												key={`select-item-${index}-${opt.value}`}
												className={'wedge-menu-item'}
												onClick={e => this.openCreateObjectModal(e, opt.type)}
												id={`${this.props.placeholder}-closeCreate`}
											>
												{opt.type && opt.type !== 'any' ? (
													<div
														className={`${
															this.props.placeholder
														}-innerContainer`}
													>
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
													<div
														className={`${
															this.props.placeholder
														}-innerContainer`}
													>
														<div className={'imgContainer'}>
															<img height={24} src={opt.icon} alt={opt.label} />
														</div>
														<span>{opt.label}</span>
													</div>
												) : (
													<div
														className={`${
															this.props.placeholder
														}-innerContainer`}
													>
														<span>{opt.label}</span>
													</div>
												)}
												{opt.type === 'group'
													? profileGroupCreateOpened && (
															<Formik
																initialValues={{
																	name: ''
																}}
																validationSchema={groupValidationSchema}
																onSubmit={(values, { resetForm }) => {
																	this.props.onCreate(values.name)
																	resetForm()
																	this.setState({
																		openCreate: false,
																		profileGroupCreateOpened: false
																	})
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
																			<p className="error-text">
																				{errors.name}
																			</p>
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
													  )
													: null}
											</div>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				) : null}
			</div>
		)
	}
}

SelectWithCreateObject.propTypes = {
	selected: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		.isRequired,
	options: PropTypes.array.isRequired,
	showMenu: PropTypes.bool,
	createModalOpenedObject: PropTypes.bool,
	placeholder: PropTypes.string,
	createModalText: PropTypes.string,
	fieldType: PropTypes.string,
	onCreate: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	openCreateObjectModal: PropTypes.func.isRequired
}
