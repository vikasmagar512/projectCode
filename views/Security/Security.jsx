import PropTypes from 'prop-types'
import React, { Component, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import AddButton from '../../components/AddButton/AddButton'
import Loader from '../../components/Loader/Loader'
import Table from '../../components/Table/Table'
import WedgeModal from '../../components/WedgeModal/WedgeModal'
import DndCard from '../../components/Card/DndCard'
import { OBJECT_TYPES_CONFIG, POLICY_TABLE_FIELDS } from '../../enums'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import NewPolicySurvey from '../Modals/NewPolicySurvey'
import PolicyDetailModal from '../Modals/PolicyDetailModal'
import SearchBar from './components/SearchBar/SearchBar'
import FetchErrorMessage from '../../components/FetchErrorMessage/FetchErrorMessage'
import {
	createPolicy,
	deletePolicy,
	fetchPolicies,
	reorderPolicy,
	updatePolicy
} from './scenario-actions'
import { createObject, fetchObjects } from '../Objects/scenario-actions'
import './security.scss'
import PolicyTableItem from './components/PolicyTableItem/PolicyTableItem'
import { createService } from '../../store/creational-scenario-actions'

Modal.setAppElement('#modal-root')
function typeExists(type) {
	return type && ['thing', 'gateway', 'address'].includes(type)
}
const Container = ({
	items,
	openDetailsModal,
	openEditModal,
	onReorder,
	matches
}) => {
	const [cards, setCards] = useState(items)
	useEffect(() => {
		setCards(items)
	}, [items])
	const moveCard = (dragIndex, hoverIndex) => {
		const dragCard = cards[dragIndex]
		setCards(
			update(cards, {
				$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
			})
		)
	}
	return (
		<div>
			{cards.map((card, i) => (
				<DndCard
					key={i + 1}
					index={i}
					id={i + 1}
					text={card}
					moveCard={moveCard}
					openDetailsModal={openDetailsModal}
					openEditModal={openEditModal}
					onReorder={onReorder}
					matches={matches}
					TableItemComp={PolicyTableItem}
				/>
			))}
		</div>
	)
}

class Security extends Component {
	state = {
		createModalOpenedObject: false,
		createObjectType: '',
		createModalOpened: false,
		detailModalOpened: false,
		editModalOpened: false,
		serviceModalOpened: false,
		detailsOf: {},
		showError: false,
		errorCode: 400,
		errorMsg: ''
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
			createModalOpened: false
		})
		window.scrollTo(0, document.body.scrollHeight)
	}
	closeCreateModalObject = () => {
		this.setState({
			createModalOpenedObject: false,
			createObjectType: ''
		})
	}

	async componentDidMount() {
		const { location } = this.props
		const uuid = location.pathname.split('/')[2]
		await this.props.fetchObjects(uuid)
		this.props.fetchPolicies()

		window.addEventListener('scroll', this.stickToTheTop)
		this.stickToTheTop()
	}

	componentDidUpdate(prevProps) {
		if (this.props.error && prevProps.error !== this.props.error) {
			const { error } = this.props
			this.setState({
				showError: true,
				errorCode: error.response.data.code,
				errorMsg: error.response.data.message
			})
		}
	}

	renderDetailModal = () => {
		return <PolicyDetailModal data={this.state.detailsOf} />
	}

	stickToTheTop() {
		const window_top = window.scrollY
		const stick_anchor = document.getElementById('stick-anchor')
		if (stick_anchor) {
			const stick_anchorTop = stick_anchor.offsetTop
			const table_headers = document.getElementsByClassName('table-header')
			if (table_headers && table_headers.length) {
				const table_header = table_headers[0]
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
	}

	renderEditModal = () => {
		return (
			<NewPolicySurvey
				onFinish={policy => this.onEdit(policy)}
				openCreateObjectModal={this.renderCreationModalObject}
				createModalOpenedObject={this.state.createModalOpenedObject}
				onDelete={this.onDelete}
				item={this.state.detailsOf}
				edit
			/>
		)
	}

	renderCreationModal = () => {
		return (
			<NewPolicySurvey
				onFinish={newPolicy => this.onAdd(newPolicy)}
				openCreateObjectModal={this.renderCreationModalObject}
				createModalOpenedObject={this.state.createModalOpenedObject}
			/>
		)
	}

	onAdd = async entity => {
		await this.props.createPolicy(entity)
		const { creationError } = this.props
		if (creationError) {
			this.setState(
				{
					showError: true,
					errorCode: creationError.response.data.code,
					errorMsg: creationError.response.data.message
				},
				() => {
					if (this.state.createModalOpened) {
						this.closeCreateModal()
					}
				}
			)
		} else {
			this.props.fetchPolicies()
			this.closeCreateModal()
		}

		this.props.fetchPolicies()
		this.closeCreateModal()
	}

	onEdit = async entity => {
		const { detailsOf } = this.state
		entity.position = detailsOf.position
		await this.props.updatePolicy(entity, detailsOf.uuid)
		const { updationError } = this.props
		if (updationError) {
			this.setState({
				showError: true,
				errorCode: updationError.response.data.code,
				errorMsg: updationError.response.data.message,
				editModalOpened: false,
				detailModalOpened: false,
				keepDetailsOpened: false
			})
		} else {
			await this.props.fetchPolicies()
			const detail = this.props.items.find(item => item.uuid === detailsOf.uuid)
			this.setState({
				showError: false,
				detailsOf: detail
			})
			this.closeEditModal()
		}
	}
	renderCreationModalObject = type => {
		this.setState({ createObjectType: type, createModalOpenedObject: true })
	}
	openObjectModal = () => {
		const Survey = OBJECT_TYPES_CONFIG.find(
			el => el.name === this.state.createObjectType
		).createComponent
		return <Survey onFinish={this.onAddObject} />
	}
	onAddObject = async entity => {
		const { location } = this.props
		const ecoUUID = location.pathname.split('/')[2]
		await this.props.createObject(entity, this.state.createObjectType)
		const { creationErrorObject } = this.props
		if (creationErrorObject) {
			this.setState(
				{
					showError: true,
					errorCode: creationErrorObject.response.data.code,
					errorMsg: creationErrorObject.response.data.message
				},
				() => {
					if (this.state.createModalOpened) {
						this.closeCreateModalObject()
						this.closeCreateModal()
					}
					if (this.state.editModalOpened) {
						this.closeCreateModalObject()
						this.closeEditModal()
					}
				}
			)
		} else {
			this.props.fetchObjects(ecoUUID)
			this.closeCreateModalObject()
		}
	}

	onDelete = async () => {
		const { detailsOf } = this.state
		this.setState({ keepDetailsOpened: false })
		await this.props.deletePolicy(detailsOf.uuid)
		this.props.fetchPolicies()
		this.closeEditModal()
	}

	onCreateService = service => {
		this.props.createService(service)
	}

	onReorder = async (from, to) => {
		if (from - 1 === to) {
			return
		}
		const policy = this.props.items[from - 1].uuid
		const after =
			to === 0
				? { after: '00000000-0000-0000-0000-000000000000' }
				: { after: this.props.items[from > to ? to - 1 : to].uuid }
		await this.props.reorderPolicy(policy, after)
		await this.props.fetchPolicies()
	}

	renderPolicies = matches => {
		const { items, objects } = this.props

		if (items && objects) {
			return (
				<Container
					items={items}
					openDetailsModal={item => this.openDetailsModal(item)}
					openEditModal={item => this.openEditModal(item)}
					onReorder={(from, to) => this.onReorder(from, to)}
					matches={matches}
				/>
			)
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.stickToTheTop)
	}
	createTitleForCreateModalObject = () => {
		if (typeExists(this.state.createObjectType)) {
			return OBJECT_TYPES_CONFIG.find(
				el => el.name === this.state.createObjectType
			).title
		} else {
			return 'Select new object type'
		}
	}

	render() {
		const { errorMsg, showError, errorCode } = this.state
		const { error } = this.props

		return (
			<div className="content policies">
				{errorMsg && showError && (
					<FetchErrorMessage
						code={errorCode}
						error={errorMsg}
						header={error.response.headers}
						status={error.response.status}
						onClose={() => this.setState({ showError: false })}
					/>
				)}
				<div>
					<div className={'policies__search-bar'}>
						<SearchBar />
					</div>
					<AddButton onClick={this.openModal}>{'Add New Policy'}</AddButton>
					<div id="stick-anchor" />
					<Table.Container root={'policies'}>
						<Table.Content
							root={'policies'}
							headerComponent={<Table.Header items={POLICY_TABLE_FIELDS} />}
							renderItems={this.renderPolicies}
						/>
					</Table.Container>
					{this.props.isLoading && (
						<div className={'loader-container'}>
							<Loader />
						</div>
					)}
					<WedgeModal
						isOpen={this.state.createModalOpened}
						onClose={this.closeCreateModal}
						title={'Create new policy'}
						size={'big'}
					>
						{this.state.createModalOpened && this.renderCreationModal()}
					</WedgeModal>
					<WedgeModal
						isOpen={this.state.detailModalOpened}
						onClose={this.closeDetailsModal}
						additionalAction={{
							icon: 'pe-7s-config',
							callback: this.onEditClick
						}}
						title={`View Policy [UUID: ${this.state.detailsOf.uuid}]`}
					>
						{this.state.detailModalOpened && this.renderDetailModal()}
					</WedgeModal>
					<WedgeModal
						isOpen={this.state.editModalOpened}
						onClose={this.closeEditModal}
						title={`Edit Policy [UUID: ${this.state.detailsOf.uuid}]`}
					>
						{this.state.editModalOpened && this.renderEditModal()}
					</WedgeModal>
					<WedgeModal
						isOpen={this.state.createModalOpenedObject}
						onClose={this.closeCreateModalObject}
						onEscapeKeyDown={this.closeCreateModalObject}
						title={this.createTitleForCreateModalObject()}
						keyboard={true}
					>
						{this.state.createModalOpenedObject && this.openObjectModal()}
					</WedgeModal>
				</div>
			</div>
		)
	}
}

Security.propTypes = {
	fetchObjects: PropTypes.func.isRequired,
	fetchPolicies: PropTypes.func.isRequired,
	createPolicy: PropTypes.func.isRequired,
	createObject: PropTypes.func.isRequired,
	updatePolicy: PropTypes.func.isRequired,
	deletePolicy: PropTypes.func.isRequired,
	reorderPolicy: PropTypes.func.isRequired,
	createService: PropTypes.func.isRequired,
	ecosystems: PropTypes.array.isRequired,
	location: PropTypes.object.isRequired,
	items: PropTypes.array.isRequired,
	objects: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	error: PropTypes.object,
	creationError: PropTypes.object,
	creationErrorObject: PropTypes.object,
	updationError: PropTypes.object
}

Container.propTypes = {
	items: PropTypes.array.isRequired,
	openEditModal: PropTypes.func.isRequired,
	openDetailsModal: PropTypes.func.isRequired,
	onReorder: PropTypes.func.isRequired,
	matches: PropTypes.bool.isRequired
}

Security.defaultProps = {
	items: [],
	objects: []
}

const loadingSelector = createLoadingSelector(['FETCHING_POLICIES'])
const errorSelector = createErrorMessageSelector(['FETCHING_POLICIES'])
const creationError = createErrorMessageSelector(['CREATION_POLICY'])
const creationErrorObject = createErrorMessageSelector(['CREATION_OBJECT'])

const updationError = createErrorMessageSelector(['UPDATE_POLICY'])

const mapStateToProps = state => {
	return {
		ecosystem: state.ecosystems.currentEcosystem,
		items: policiesSelector(state),
		objects: objectsSelector(state),
		isLoading: loadingSelector(state),
		error: errorSelector(state),
		creationError: creationError(state),
		creationErrorObject: creationErrorObject(state),
		updationError: updationError(state),
		ecosystems: state.ecosystems.items
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

const policiesSelector = state => {
	const ecosystem = state.ecosystems.currentEcosystem
	if (ecosystem) {
		return state.policies[ecosystem.uuid]
			? state.policies[ecosystem.uuid].policies
			: []
	}

	return []
}

const mapDispatchToProps = dispatch => {
	return {
		fetchPolicies: () => dispatch(fetchPolicies()),
		fetchObjects: ecosystemUUID => dispatch(fetchObjects(ecosystemUUID)),
		createPolicy: (entity, type) => dispatch(createPolicy(entity, type)),
		createObject: (entity, type) => dispatch(createObject(entity, type)),
		updatePolicy: (entity, uuid) => dispatch(updatePolicy(entity, uuid)),
		deletePolicy: entity => dispatch(deletePolicy(entity)),
		reorderPolicy: (policy, after) => dispatch(reorderPolicy(policy, after)),
		createService: service => dispatch(createService(service))
	}
}

function MyTagControlContext(DecoratedClass) {
	return DragDropContext(HTML5Backend)(DecoratedClass)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyTagControlContext(Security))
