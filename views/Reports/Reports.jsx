import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
	Button,
	ButtonGroup,
	Dropdown,
	Glyphicon,
	MenuItem
} from 'react-bootstrap'
import { connect } from 'react-redux'
import Table from '../../components/Table/Table'
import { REPORT_TABLE_FIELDS } from '../../enums'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import ReportsTableItem from './components/ReportsTableItem/ReportTableItem'
import './reports.scss'
import { fetchNewest, fetchOlder, fetchReports } from './scenario-actions'
import Loader from '../../components/Loader/Loader'
import SearchBar from './components/SearchBar/SearchBar'

const rateOptions = [
	{
		value: 0,
		text: 'Freeze'
	},
	{
		value: 5,
		text: '30 seconds'
	},
	{
		value: 60,
		text: 'Every minute'
	}
]

class Reports extends Component {
	constructor(props) {
		super(props)
		const { location } = this.props
		this.state = {
			rate: { value: 0, text: 'Freeze' },
			filter: 0,
			interval: null,
			ecosystemUUID: location.pathname.split('/')[2],
			errorMsg: 'Ecosystem does not exist',
			searchTerm: ''
		}
		this.infiniteScroll = this.infiniteScroll.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.lastScrollTop = 0
	}

	componentDidMount() {
		const { ecosystemUUID, searchTerm } = this.state
		this.props.fetchReports(ecosystemUUID, searchTerm)
		this.startSyncingInterval()
		/*window.addEventListener('scroll', this.stickToTheTop)
		this.stickToTheTop()*/
		const report_items = document.getElementsByClassName('report-items')
		report_items[0].addEventListener('scroll', this.infiniteScroll)
	}

	infiniteScroll() {
		let { fetchOlder, fetchNewest, items, isLoading } = this.props
		const { ecosystemUUID, searchTerm } = this.state
		let reportItemsDiv = document.getElementsByClassName('report-items')
		reportItemsDiv = reportItemsDiv[0]
		const reportItemsDivScrollTop = reportItemsDiv.scrollTop
		const reportItemsDivScrollHeight = reportItemsDiv.scrollHeight
		let percentScroll = reportItemsDivScrollTop / reportItemsDivScrollHeight
		if (!isLoading && (items && items.length > 0)) {
			if (reportItemsDivScrollTop < this.lastScrollTop) {
				if (percentScroll <= 0.3) {
					fetchNewest(ecosystemUUID, searchTerm)
				}
			} else {
				if (percentScroll >= 0.7) {
					fetchOlder(ecosystemUUID, searchTerm)
				}
			}
		}
		this.lastScrollTop = reportItemsDivScrollTop
	}

	stickToTheTop() {
		const window_top = window.scrollY
		const stick_anchor = document.getElementById('stick-anchor')
		if (stick_anchor) {
			const stick_anchorTop = stick_anchor.offsetTop
			let table_header = document.getElementsByClassName('table-header')
			if (table_header && table_header.length > 0) {
				table_header = table_header[0]
				const offsetWidth = table_header.offsetWidth
				const offsetHeight = table_header.offsetHeight
				if (window_top > stick_anchorTop - 90) {
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

	componentWillUnmount() {
		clearInterval(this.state.interval)
		const report_items = document.getElementsByClassName('report-items')
		report_items[0].removeEventListener('scroll', this.infiniteScroll)
	}

	startSyncingInterval = () => {
		const rateTime = this.state.rate.value
		if (this.state.interval) {
			clearInterval(this.state.interval)
		}
		if (rateTime !== 0) {
			const interval = setInterval(() => {
				const { ecosystemUUID } = this.state
				if (this.props.items && this.props.items.length > 0) {
					this.props.fetchNewest(ecosystemUUID, this.state.searchTerm)
				} else {
					this.props.fetchReports(ecosystemUUID, this.state.searchTerm)
				}
			}, rateTime * 1000)
			this.setState({
				interval
			})
		}
	}

	handleChangeRefreshRate = rate => {
		this.setState({ rate }, () => {
			this.startSyncingInterval()
		})
	}

	changeFilter = val => {
		this.setState({
			filter: val
		})
	}

	handleRefresh = () => {
		const { ecosystemUUID, searchTerm } = this.state
		this.props.fetchReports(ecosystemUUID, searchTerm)
	}

	renderRefreshRateDropdown = () => (
		<div className={'reports__filters-refresh'}>
			<p>Refresh: </p>
			<Dropdown id={'dropdown-refresh-rate'}>
				<Dropdown.Toggle id="dropdown-basic">
					{this.state.rate.text}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{rateOptions.map(rate => (
						<MenuItem
							active={rate.value === this.state.rate.value}
							key={`rate-index-item-${rate.value}`}
							onSelect={() => this.handleChangeRefreshRate(rate)}
						>
							{rate.text}
						</MenuItem>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	)

	renderFilterButtons = () => {
		const { filter } = this.state
		return (
			<ButtonGroup className={'reports__filters-buttons'}>
				<Button
					onClick={() => this.changeFilter(0)}
					bsStyle={filter === 0 ? 'primary' : 'default'}
				>
					All
				</Button>
				<Button
					onClick={() => this.changeFilter(1)}
					bsStyle={filter === 1 ? 'primary' : 'default'}
				>
					Allowed
				</Button>
				<Button
					onClick={() => this.changeFilter(2)}
					bsStyle={filter === 2 ? 'primary' : 'default'}
				>
					Alert
				</Button>
			</ButtonGroup>
		)
	}

	renderReports = matches => {
		const { items, isLoading, success } = this.props
		const { errorMsg } = this.state

		return (
			<div className={'report-items'}>
				{isLoading && items.length === 0 ? (
					<div className={'loader-container'}>
						<Loader />
					</div>
				) : !success && items.length === 0 ? (
					<div className="ecosystems-uuid-error">{errorMsg}</div>
				) : (
					<div className={'report-items1'}>
						{items.map(item => (
							<ReportsTableItem
								key={`reports-table-item-${item.id}-${item.date}`}
								responsive={matches}
								data={item}
							/>
						))}
					</div>
				)}

				{/*<p
					onClick={() => this.props.fetchOlder(this.state.ecosystemUUID)}
					className={'reports__more-button'}
				>
					Load older reports
				</p>*/}
			</div>
		)
	}

	handleSearch(searchTerm) {
		this.setState({ searchTerm })
		const { ecosystemUUID } = this.state
		this.props.fetchReports(ecosystemUUID, searchTerm)
	}

	render() {
		return (
			<div className="content reports">
				<div className={'reports__search-bar'}>
					<SearchBar handleSearch={this.handleSearch} />
				</div>
				<div className={'reports__filters'}>
					<div className={'left-container'}>
						<p>Realtime View</p>
					</div>
					<div className={'right-container'}>
						{this.renderRefreshRateDropdown()}
						<Glyphicon
							className={'small-icon refresh-button'}
							glyph="repeat"
							onClick={this.handleRefresh}
						/>
						{/*this.renderFilterButtons()*/}
					</div>
				</div>
				<div id="stick-anchor" />
				<Table.Container root={'reports'}>
					<Table.Content
						root={'reports'}
						headerComponent={<Table.Header items={REPORT_TABLE_FIELDS} />}
						renderItems={this.renderReports}
					/>
				</Table.Container>
			</div>
		)
	}
}

Reports.propTypes = {
	fetchReports: PropTypes.func.isRequired,
	fetchNewest: PropTypes.func.isRequired,
	fetchOlder: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired,
	success: PropTypes.bool.isRequired
}

Reports.defaultProps = {
	items: []
}

const loadingSelector = createLoadingSelector(['FETCHING_REPORTS'])
const errorSelector = createErrorMessageSelector(['FETCHING_REPORTS'])
const mapStateToProps = state => {
	return {
		items: state.reports.items,
		success: state.reports.success,
		isLoading: loadingSelector(state),
		error: errorSelector(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchReports: (ecosystemUUID, searchTerm) =>
			dispatch(fetchReports(ecosystemUUID, searchTerm)),
		fetchNewest: (ecosystemUUID, searchTerm) =>
			dispatch(fetchNewest(ecosystemUUID, searchTerm)),
		fetchOlder: (ecosystemUUID, searchTerm) =>
			dispatch(fetchOlder(ecosystemUUID, searchTerm))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Reports)
