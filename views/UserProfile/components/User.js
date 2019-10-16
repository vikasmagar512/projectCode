import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Avatar from 'react-avatar'
import Files from 'react-files'
import ReactPhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { Row, Col, Button } from 'react-bootstrap'
import history from '../../../history'
import { updateUserProfile, updateUserPassword } from '../senario-actions'
import 'react-phone-number-input/style.css'
import '../user-profile.scss'

class User extends React.Component {
	constructor(props) {
		super(props)
		const { user } = this.props
		this.state = {
			firstName: user.firstName,
			lastName: user.lastName,
			mobilePhone: user.mobilePhone,
			email: user.email,
			avatar: user.avatar,
			currentPassowrd: '',
			newPassword: '',
			confirmPassword: '',
			unitedError: '',
			passwordError: ''
		}
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
		if (event.target.type === 'password') {
			this.setState({ passwordError: '' })
		} else {
			this.setState({ unitedError: '' })
		}
	}

	isValid = () => {
		const { firstName, lastName, mobilePhone } = this.state
		const regex = /^\+\d+\s*(\(\d+\))?[- \d]+$/

		if (!firstName) {
			this.setState({
				unitedError: 'First Name should contain at least 1 character.'
			})
			return false
		}
		if (!lastName) {
			this.setState({
				unitedError: 'Last Name should contain at least 1 character.'
			})
			return false
		}
		if (!mobilePhone) {
			this.setState({ unitedError: 'Phone Number is required' })
			return false
		} else if (!regex.test(mobilePhone) || !isValidPhoneNumber(mobilePhone)) {
			this.setState({ unitedError: 'Invalid Phone Number' })
			return false
		}
		return true
	}

	isValidPassword = () => {
		const { currentPassowrd, newPassword, confirmPassword } = this.state
		if (!currentPassowrd) {
			this.setState({ passwordError: 'Please input current password' })
			return false
		}
		if (newPassword !== confirmPassword) {
			this.setState({ passwordError: 'Passwords do not match' })
			return false
		}
		return true
	}

	onUpdate = () => {
		if (!this.isValid()) {
			return
		}
		this.props.updateUserProfile({
			email: this.state.email,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			mobilePhone: this.state.mobilePhone,
			avatar: this.state.avatar,
			redirect: this.props.from
		})
	}

	onCancel = () => {
		const { from } = this.props
		history.replace(from)
	}

	onUpdatePassword = event => {
		event.preventDefault()
		if (!this.isValidPassword()) {
			return
		}
		const { email, currentPassowrd, newPassword } = this.state
		this.props.updateUserPassword({
			email: email,
			password: currentPassowrd,
			newPassword: newPassword
		})
	}

	getBase64 = (file, cb) => {
		let reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = function() {
			cb(reader.result)
		}
		reader.onerror = function(error) {
			this.setState({ unitedError: error })
		}
	}

	onFilesChange = files => {
		this.getBase64(files[files.length - 1], result => {
			this.setState({ avatar: result })
		})
	}

	onFilesError = err => {
		this.setState({ unitedError: err })
	}

	render() {
		const {
			firstName,
			lastName,
			email,
			mobilePhone,
			currentPassowrd,
			newPassword,
			confirmPassword,
			avatar,
			unitedError,
			passwordError
		} = this.state

		return (
			<React.Fragment>
				<div className={'user-profile-container'}>
					<div className={'avatar-container'}>
						<Avatar src={avatar} size="160" round={true} />
						<Files
							className="files-dropzone"
							onChange={this.onFilesChange}
							onError={this.onFilesError}
							accepts={['image/*']}
							multiple={false}
						>
							<Button className={'button button-change button-change-avatar'}>
								{'Change'}
							</Button>
						</Files>
						<div
							className={'button-remove'}
							onClick={() => this.setState({ avatar: '' })}
						>
							{'Remove'}
						</div>
					</div>
					<div className={'form-container'}>
						{unitedError && <div className={'error-msg'}>{unitedError}</div>}
						<div className={'user-info-form'}>
							<Row>
								<Col xs={12} md={6} className="col">
									<label>
										<span className="labelForm">{'FIRST NAME'}</span>
										<input
											type="text"
											placeholder="Enter First Name"
											className="inputField"
											onChange={this.handleChange}
											name={'firstName'}
											value={firstName}
										/>
									</label>
								</Col>
								<Col xs={12} md={6} className="col">
									<label>
										<span className="labelForm">{'LAST NAME'}</span>
										<input
											type="text"
											placeholder="Enter Last Name"
											className="inputField"
											onChange={this.handleChange}
											name={'lastName'}
											value={lastName}
										/>
									</label>
								</Col>
							</Row>
							<Row>
								<Col xs={12} md={6} className="col">
									<label>
										<span className="labelForm">{'EMAIL'}</span>
										<input
											type="email"
											className="inputField"
											onChange={this.handleChange}
											name={'email'}
											value={email}
											disabled
										/>
									</label>
								</Col>
								<Col xs={12} md={6} className="col">
									<label>
										<span className="labelForm">{'MOBILE NUMBER'}</span>
										<ReactPhoneInput
											country="US"
											placeholder="Enter Mobile Number"
											className="inputField"
											onChange={value => this.setState({ mobilePhone: value })}
											name={'mobilePhone'}
											value={mobilePhone}
										/>
									</label>
								</Col>
							</Row>
						</div>
						<form className={'password-form'} onSubmit={this.onUpdatePassword}>
							<h4 className={'title'}>{'Change Password'}</h4>
							<div className={'divider'} />
							<Row>
								{passwordError && (
									<div className={'error-msg'}>{passwordError}</div>
								)}
								<Col md={12}>
									<label>
										<span className="labelForm">{'CURRENT PASSWORD'}</span>
										<input
											type="password"
											placeholder="Enter Current Password"
											className="inputField"
											onChange={this.handleChange}
											name={'currentPassowrd'}
											value={currentPassowrd}
											required
										/>
									</label>
								</Col>
								<Col xs={12} md={6}>
									<label>
										<span className="labelForm">{'NEW PASSWORD'}</span>
										<input
											type="password"
											placeholder="Enter New Password"
											className="inputField"
											onChange={this.handleChange}
											pattern=".{8,}"
											title="Password should contain at least 8 chars."
											name={'newPassword'}
											value={newPassword}
											required
										/>
									</label>
								</Col>
								<Col xs={12} md={6}>
									<label>
										<span className="labelForm">{'CONFIRM PASSWORD'}</span>
										<input
											type="password"
											placeholder="Enter Confirm Password"
											className="inputField"
											onChange={this.handleChange}
											pattern=".{8,}"
											title="Password should contain at least 8 chars."
											name={'confirmPassword'}
											value={confirmPassword}
											required
										/>
									</label>
								</Col>
							</Row>
							<div className={'button-container'}>
								<Button type={'submit'} className={'button button-update'}>
									{'Update Password'}
								</Button>
							</div>
						</form>
					</div>
				</div>
				<div className={'divider'} />
				<div className={'button-container'}>
					<Button
						className={'button button-cancel'}
						onClick={() => this.onCancel()}
					>
						{'Cancel'}
					</Button>
					<Button
						className={'button button-update'}
						onClick={() => this.onUpdate()}
					>
						{'Update'}
					</Button>
				</div>
			</React.Fragment>
		)
	}
}

User.propTypes = {
	user: PropTypes.object.isRequired,
	from: PropTypes.string.isRequired,
	updateUserProfile: PropTypes.func.isRequired,
	updateUserPassword: PropTypes.func.isRequired
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateUserProfile: payload => dispatch(updateUserProfile(payload)),
		updateUserPassword: payload => dispatch(updateUserPassword(payload))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User)
