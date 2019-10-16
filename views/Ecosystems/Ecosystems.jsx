import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import FetchErrorMessage from '../../components/FetchErrorMessage/FetchErrorMessage'
import Loader from '../../components/Loader/Loader'
import WedgeModal from '../../components/WedgeModal/WedgeModal'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import CreateNewEcosystem from '../Modals/CreateNewEcosystem'
import ConfirmAction from '../Modals/ConfirmAction'
import AddEcosystem from './components/AddEcosystem/AddEcosystem'
import EcosystemItem from './components/EcosystemItem/EcosystemItem'
import PendingEcosystemItem from './components/PendingEcosystemItem/PendingEcosystemItem'
import './ecosystems.scss'
import {
	createEcosystem,
	removeEcosystem,
	fetchEcosystems,
	openEcosystem,
	fetchNSPs,
	removeCurrent
} from './scenario-actions'

Modal.setAppElement('#modal-root')

class Ecosystems extends Component {
	state = {
		newEcosystemModalOpened: false,
		newEcosystemModalClosed: false,
		fetchFinished: false,
		showError: true,
		removeModalOpen: false,
		removeItem: ''
	}

	async componentDidMount() {
		const { fetchEcosystems, fetchNSPs, removeCurrent } = this.props
		await fetchNSPs()
		await fetchEcosystems()
		this.setState({
			fetchFinished: true,
			showError: true
		})
		removeCurrent()
	}

	handleClick = ecosystem => {
		this.props.openEcosystem(ecosystem)
	}

	handleCloseModal = () => {
		this.setState({
			newEcosystemModalClosed: true,
			newEcosystemModalOpened: false
		})
	}

	handleOpenModal = () => {
		this.setState({
			newEcosystemModalOpened: true,
			newEcosystemModalClosed: false
		})
	}

	handleCreateEcosystem = entity => {
		this.setState({
			newEcosystemModalOpened: false
		})
		this.props.createEcosystem(entity)
	}

	handleConfirmRemove = uuid => {
		this.setState({ removeModalOpen: true })
		this.setState({ removeItem: uuid })
	}

	handleRemove = async () => {
		const { removeItem } = this.state
		this.handleConfirmClose()
		await this.props.removeEcosystem(removeItem)
		this.props.fetchEcosystems()
	}

	handleConfirmClose = () => {
		this.setState({ removeModalOpen: false })
	}

	renderLoader = () => {
		return (
			<div className={'loader-container'}>
				<Loader />
			</div>
		)
	}

	renderEcosystems = () => {
		const { ecosystems, createLoading, error } = this.props
		const {
			newEcosystemModalOpened,
			newEcosystemModalClosed,
			removeModalOpen,
			fetchFinished
		} = this.state
		return (
			<div className={'ecosystems'}>
				<AddEcosystem onClick={this.handleOpenModal} />
				{createLoading && <PendingEcosystemItem />}
				{ecosystems.map((eco, index) => (
					<EcosystemItem
						ecosystem={eco}
						onClick={() => this.handleClick(eco)}
						key={`ecosystems-list-index-${index}`}
						onRemove={uuid => this.handleConfirmRemove(uuid)}
					/>
				))}
				<WedgeModal
					title={'Add New Ecosystem'}
					onClose={this.handleCloseModal}
					isOpen={
						fetchFinished &&
						!error &&
						(newEcosystemModalOpened ||
							(this.props.ecosystems.length === 0 && !newEcosystemModalClosed))
					}
				>
					<CreateNewEcosystem onFinish={this.handleCreateEcosystem} />
				</WedgeModal>
				<WedgeModal
					title={'Are you sure?'}
					onClose={this.handleConfirmClose}
					isOpen={removeModalOpen}
					size={'tiny'}
				>
					<ConfirmAction
						item={'Ecosystem'}
						onYes={this.handleRemove}
						onNo={this.handleConfirmClose}
					/>
				</WedgeModal>
			</div>
		)
	}

	render() {
		const { fetchLoading, error } = this.props
		const { showError, fetchFinished } = this.state
		return (
			<div>
				{showError && error && (
					<FetchErrorMessage
						code={error.response.data && error.response.data.code}
						header={error.response.headers}
						status={error.response.status}
						onClose={() => this.setState({ showError: false })}
					/>
				)}
				{fetchLoading || !fetchFinished
					? this.renderLoader()
					: this.renderEcosystems()}
			</div>
		)
	}
}

Ecosystems.defaultProps = {
	ecosystems: []
}

Ecosystems.propTypes = {
	fetchLoading: PropTypes.bool.isRequired,
	createLoading: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	ecosystems: PropTypes.array.isRequired,
	fetchEcosystems: PropTypes.func.isRequired,
	openEcosystem: PropTypes.func.isRequired,
	createEcosystem: PropTypes.func.isRequired,
	removeEcosystem: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
	fetchNSPs: PropTypes.func.isRequired,
	removeCurrent: PropTypes.func.isRequired
}

const fetchLoadingSelector = createLoadingSelector(['FETCHING_ECOSYSTEMS'])
const createEcosystemLoadingSelector = createLoadingSelector([
	'CREATE_ECOSYSTEM'
])
const errorSelector = createErrorMessageSelector(['FETCHING_ECOSYSTEMS'])
const mapStateToProps = state => {
	return {
		fetchLoading: fetchLoadingSelector(state),
		createLoading: createEcosystemLoadingSelector(state),
		ecosystems: state.ecosystems.items,
		error: errorSelector(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchEcosystems: () => dispatch(fetchEcosystems()),
		fetchNSPs: () => dispatch(fetchNSPs()),
		openEcosystem: ecosystem => dispatch(openEcosystem(ecosystem)),
		createEcosystem: ecosystem => dispatch(createEcosystem(ecosystem)),
		removeEcosystem: ecosystem => dispatch(removeEcosystem(ecosystem)),
		removeCurrent: () => dispatch(removeCurrent())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Ecosystems)
