import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import Spinner from 'react-spinner-material'
import AddButton from '../../components/AddButton/AddButton'
import TLSButton from '../../components/TLSButton/TLSButton'
import Loader from '../../components/Loader/Loader'
import Table from '../../components/Table/Table'
import WedgeModal from '../../components/WedgeModal/WedgeModal'
import { OBJECT_TABLE_FIELDS, OBJECT_TYPES_CONFIG } from '../../enums'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import NewObjectType from '../Modals/NewObjectType'
import ObjectsTableItem from './components/ObjectsTableItem/ObjectsTableItem'
import SearchBar from './components/SearchBar/SearchBar'
import './objects.scss'
import {
	createObject,
	deleteObject,
	downloadConfig,
	fetchObjects,
	updateObject,
	gatewayConfigLink
} from './scenario-actions'
import PendingObjectItem from './components/PendingObjectItem/PendingObjectItem'
import FetchErrorMessage from '../../components/FetchErrorMessage/FetchErrorMessage'

Modal.setAppElement('#modal-root')

function typeExists(type) {
	return type && ['thing', 'gateway', 'address'].includes(type)
}

class Objects extends Component {
	constructor(props) {
		super(props)
		const ecosystemUUID = this.props.location.pathname.split('/')[2]
		this.state = {
			createModalOpened: false,
			detailModalOpened: false,
			editModalOpened: false,
			currentType: '',
			detailsOf: {},
			showError: false,
			errorCode: 400,
			errorMsg: '',
			errorHeader: null,
			errorStatus: 0,
			ecoUUID: ecosystemUUID
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { detailsOf } = this.state
		if (detailsOf && typeExists(detailsOf.element)) {
			if (detailsOf.uuid) {
				if (nextProps.items && nextProps.items.length > 0) {
					let s = nextProps.items.find(k => detailsOf.uuid === k.uuid)
					this.setState({ detailsOf: s })
				}
			}
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.error && prevProps.error !== this.props.error) {
			const { error } = this.props
			this.setState({
				showError: true,
				errorCode: error.response.data.code,
				errorMsg: error.response.data.message,
				errorHeader: error.response.header,
				errorStatus: error.response.status
			})
		}
	}

	onEditClick = () => {
		this.openEditModal()
	}

	openModal = () => {
		this.setState({ createModalOpened: true })
	}

	openDetailsModal = item => {
		this.setState({
			detailsOf: item,
			detailModalOpened: true
		})
	}

	closeDetailsModal = () => {
		this.setState({
			detailModalOpened: false
		})
	}

	openEditModal = item => {
		this.setState({
			detailsOf: item || this.state.detailsOf,
			keepDetailsOpened: this.state.detailModalOpened,
			detailModalOpened: false,
			editModalOpened: true
		})
	}

	closeEditModal = () => {
		this.setState({
			editModalOpened: false,
			detailModalOpened: this.state.keepDetailsOpened,
			keepDetailsOpened: false
		})
	}

	closeCreateModal = () => {
		this.setState({
			createModalOpened: false,
			currentType: ''
		})
	}

	componentDidMount() {
		this.props.fetchObjects(this.state.ecoUUID)
		this.setState({
			showError: false
		})
		window.addEventListener('scroll', this.stickToTheTop)
		this.stickToTheTop()
	}

	createTitleForCreateModal = () => {
		if (typeExists(this.state.currentType)) {
			return OBJECT_TYPES_CONFIG.find(el => el.name === this.state.currentType)
				.title
		} else {
			return 'Select new object type'
		}
	}

	downloadConfFile = () => {
		const { detailsOf } = this.state
		this.props.downloadConfig(detailsOf)
	}

	getConfigLink = async () => {
		const { detailsOf } = this.state
		await this.props.gatewayConfigLink(detailsOf)
	}

	renderDetailModal = () => {
		const { detailsOf } = this.state
		if (typeExists(detailsOf.element)) {
			const Details = OBJECT_TYPES_CONFIG.find(
				el => el.name === detailsOf.element
			).detailComponent
			return (
				<Details
					data={detailsOf}
					onDownload={this.downloadConfFile}
					onGetLink={this.getConfigLink}
				/>
			)
		} else {
			return null
		}
	}

	renderEditModal = () => {
		const { detailsOf } = this.state
		if (typeExists(detailsOf.element)) {
			const Survey = OBJECT_TYPES_CONFIG.find(
				el => el.name === detailsOf.element
			).createComponent
			return (
				<Survey
					onFinish={this.onEdit}
					item={detailsOf}
					edit
					onDelete={this.onDelete}
				/>
			)
		} else {
			return null
		}
	}

	renderCreationModal = () => {
		if (typeExists(this.state.currentType)) {
			const Survey = OBJECT_TYPES_CONFIG.find(
				el => el.name === this.state.currentType
			).createComponent
			return <Survey onFinish={this.onAdd} />
		} else {
			return <NewObjectType onTypeChoose={this.onTypeChoose} />
		}
	}

	onAdd = async entity => {
		await this.props.createObject(entity, this.state.currentType)
		const { creationError } = this.props
		if (creationError) {
			this.setState(
				{
					showError: true,
					errorCode: creationError.response.data.code,
					errorMsg: creationError.response.data.message,
					errorHeader: creationError.response.headers,
					errorStatus: creationError.response.status
				},
				() => {
					if (this.state.createModalOpened) {
						this.closeCreateModal()
					}
				}
			)
		} else {
			this.props.fetchObjects(this.state.ecoUUID)
			this.setState({
				showError: false
			})
			this.closeCreateModal()
		}
	}

	onEdit = async entity => {
		const { detailsOf } = this.state
		await this.props.updateObject(entity, detailsOf.element, detailsOf.uuid)
		const { updateError } = this.props
		if (updateError) {
			this.setState({
				showError: true,
				errorCode: updateError.response.data.code,
				errorMsg: updateError.response.data.message,
				errorHeader: updateError.response.headers,
				errorStatus: updateError.response.status,
				editModalOpened: false,
				detailModalOpened: false,
				keepDetailsOpened: false
			})
		} else {
			this.props.fetchObjects(this.state.ecoUUID)
			this.setState({
				showError: false
			})
			this.closeEditModal()
		}
	}

	onDelete = async () => {
		const { detailsOf } = this.state
		this.setState({ keepDetailsOpened: false })
		await this.props.deleteObject(detailsOf)
		this.props.fetchObjects(this.state.ecoUUID)
		this.closeEditModal()
	}

	onTypeChoose = type => {
		this.setState({
			currentType: type
		})
	}

	renderObjects = matches => {
		const { items } = this.props
		return items.map(item => (
			<ObjectsTableItem
				key={`objects-table-item-${item.uuid}-${item.name}`}
				responsive={matches}
				data={item}
				onEdit={() => this.openEditModal(item)}
				onDetails={() => this.openDetailsModal(item)}
			/>
		))
	}

	stickToTheTop() {
		const window_top = window.scrollY
		const stick_anchor = document.getElementById('stick-anchor')
		if (stick_anchor) {
			const stick_anchorTop = stick_anchor.offsetTop
			const table_header = document.getElementsByClassName('table-header')[0]
			const offsetWidth = table_header.offsetWidth
			const offsetHeight = table_header.offsetHeight
			if (window_top > stick_anchorTop - 80) {
				table_header.classList.add('stick')
				stick_anchor.style.height = offsetHeight + 20
				document.getElementsByClassName('stick')[0].style.width = offsetWidth
			} else {
				table_header.classList.remove('stick')
				stick_anchor.style.height = 0
			}
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.stickToTheTop)
	}

	render() {
		const {
			showError,
			errorCode,
			errorMsg,
			errorHeader,
			errorStatus
		} = this.state
		const { isLoading, items } = this.props

		return (
			<div className="content objects">
				{isLoading ? (
					<Spinner spinnerColor="#4986c5" />
				) : (
					<div>
						{errorMsg && showError && (
							<FetchErrorMessage
								code={errorCode}
								error={errorMsg}
								header={errorHeader}
								status={errorStatus}
								onClose={() => this.setState({ showError: false })}
							/>
						)}
						<div>
							<div className={'objects__search-bar'}>
								<SearchBar />
							</div>
							<div className={'objects__buttons'}>
								<AddButton onClick={this.openModal}>
									{'Add New Object'}
								</AddButton>
								{items.length !== 0 && <TLSButton />}
							</div>
							<div id="stick-anchor" />
							<Table.Container root={'objects'}>
								<Table.Content
									root={'objects'}
									headerComponent={<Table.Header items={OBJECT_TABLE_FIELDS} />}
									renderItems={this.renderObjects}
								/>
							</Table.Container>
							{this.props.objectCreateLoading && <PendingObjectItem />}
							{this.props.isLoading && (
								<div className={'loader-container'}>
									<Loader />
								</div>
							)}
							<WedgeModal
								isOpen={this.state.createModalOpened}
								onClose={this.closeCreateModal}
								title={this.createTitleForCreateModal()}
							>
								{this.state.createModalOpened && this.renderCreationModal()}
							</WedgeModal>
							{this.state.detailModalOpened && (
								<WedgeModal
									isOpen={this.state.detailModalOpened}
									onClose={this.closeDetailsModal}
									additionalAction={{
										icon: 'pe-7s-config',
										callback: this.onEditClick
									}}
									title={`${this.state.detailsOf.name} - Details`}
								>
									{this.state.detailModalOpened && this.renderDetailModal()}
								</WedgeModal>
							)}
							{this.state.editModalOpened && (
								<WedgeModal
									isOpen={this.state.editModalOpened}
									onClose={this.closeEditModal}
									title={`${this.state.detailsOf.name} - Edit`}
								>
									{this.state.editModalOpened && this.renderEditModal()}
								</WedgeModal>
							)}
						</div>
					</div>
				)}
			</div>
		)
	}
}

Objects.propTypes = {
	fetchObjects: PropTypes.func.isRequired,
	createObject: PropTypes.func.isRequired,
	updateObject: PropTypes.func.isRequired,
	deleteObject: PropTypes.func.isRequired,
	downloadConfig: PropTypes.func.isRequired,
	gatewayConfigLink: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	success: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired,
	objectCreateLoading: PropTypes.bool.isRequired,
	creationError: PropTypes.object,
	updateError: PropTypes.object,
	error: PropTypes.object
}

Objects.defaultProps = {
	items: []
}

const loadingSelector = createLoadingSelector(['FETCHING_OBJECT'])
const errorSelector = createErrorMessageSelector(['FETCHING_OBJECT'])
const creationError = createErrorMessageSelector(['CREATION_OBJECT'])
const updateError = createErrorMessageSelector(['UPDATE_OBJECT'])
const creationLoadingSelector = createLoadingSelector(['CREATE_OBJECT'])

const mapStateToProps = state => {
	return {
		items: objectsSelector(state),
		isLoading: loadingSelector(state),
		success: state.objects.success,
		error: errorSelector(state),
		creationError: creationError(state),
		updateError: updateError(state),
		objectCreateLoading: creationLoadingSelector(state)
	}
}

const objectsSelector = state => {
	const ecosystem = state.ecosystems.currentEcosystem
	if (ecosystem) {
		return state.objects[ecosystem.uuid]
			? state.objects[ecosystem.uuid].objects
			: []
	}

	return []
}

const mapDispatchToProps = dispatch => {
	return {
		fetchObjects: ecosystemUUID => dispatch(fetchObjects(ecosystemUUID)),
		createObject: (entity, type) => dispatch(createObject(entity, type)),
		updateObject: (entity, type, uuid) =>
			dispatch(updateObject(entity, type, uuid)),
		deleteObject: entity => dispatch(deleteObject(entity)),
		downloadConfig: entity => dispatch(downloadConfig(entity)),
		gatewayConfigLink: entity => dispatch(gatewayConfigLink(entity))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Objects)
