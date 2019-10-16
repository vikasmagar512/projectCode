import React from 'react'

import PropTypes from 'prop-types'
import { ClapSpinner } from 'react-spinners-kit'
import './blocked-ecosystem.scss'

const errMsg = {
	commit_in_progress: {
		label: 'Commit is in Progress...',
		desc: 'In some cases, commit can take up to 5 minutes.'
	},
	commit_error: {
		label: 'Commit error',
		desc: 'Last commit failed. Please contact support'
	},
	ecosystem_error: {
		label: 'Ecosystem error',
		desc: 'There is an issue with your ecosystem. Please contact support'
	},
	disabled: {
		label: 'Disabled',
		desc: 'This ecosystem is disabled. Please contact support'
	},
	inaccessible: {
		label: "You don't have access to this resource.",
		desc:
			' If you consider this invalid, please contact your Organization admin or contact us, providing incident ID: xxxxxx.'
	}
}

export default class BlockedEcosystem extends React.Component {
	render() {
		const { status } = this.props
		return (
			<div className="ecosystem-block content">
				<div className="loader-container">
					<ClapSpinner
						size={30}
						frontColor={'#f68b1e'}
						backColor={'#fbb040'}
						loading={status === 'commit_in_progress'}
					/>
				</div>
				<p className={'block-label'}>{errMsg[status]['label']}</p>
				<p className={'block-desc'}>{errMsg[status]['desc']}</p>
			</div>
		)
	}
}

BlockedEcosystem.propTypes = {
	status: PropTypes.string.isRequired
}
