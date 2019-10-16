import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ComingSoon from '../../components/ComingSoonPage/ComingSoon'
import { uuidValidation } from '../../utils/utils'

class Users extends Component {
	constructor(props) {
		super(props)
		this.state = {
			errMsg: ''
		}
	}

	componentDidMount() {
		const { items, location } = this.props
		const uuid = location.pathname.split('/')[2]
		if (uuidValidation(items, uuid)) {
			this.setState({
				errMsg: ''
			})
		} else {
			this.setState({
				errMsg: 'Ecosystem does not exist'
			})
		}
	}

	render() {
		const { errMsg } = this.state

		return (
			<div className={'content'}>
				{errMsg ? (
					<div className="ecosystems-uuid-error">{errMsg}</div>
				) : (
					<ComingSoon />
				)}
			</div>
		)
	}
}

Users.propTypes = {
	location: PropTypes.object.isRequired,
	items: PropTypes.array.isRequired
}

const mapStateToProps = state => {
	return {
		items: state.ecosystems.items
	}
}
export default connect(mapStateToProps)(Users)
