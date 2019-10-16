import React from 'react'
import { Dropdown, Glyphicon, MenuItem } from 'react-bootstrap'
import './search-bar.scss'

export default class SearchBar extends React.Component {
	state = {
		value: ''
	}

	handleChange = e => {
		this.setState({
			value: e.target.value
		})
	}

	render() {
		return (
			<div className={'search-bar component-coming-soon'}>
				<Dropdown id={'dropdown-refresh-rate'}>
					<Dropdown.Toggle bsStyle={'primary'} id="dropdown-basic">
						{'All'}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{['All', 'Some', 'Any'].map(rate => (
							<MenuItem active={rate === 'All'} key={`rate-index-item-${rate}`}>
								{rate}
							</MenuItem>
						))}
					</Dropdown.Menu>
				</Dropdown>
				<Glyphicon className={'small-icon'} glyph="search" />
				<input
					placeholder={'Search'}
					value={this.state.value}
					onChange={this.handleChange}
				/>
			</div>
		)
	}
}
