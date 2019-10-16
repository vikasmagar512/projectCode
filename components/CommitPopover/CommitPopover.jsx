import React from 'react'
import { Popover, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './commit-popover.scss'

export const CommitPopover = ({ afterCommit, afterRollback }) => {
	return (
		<Popover id="popover-commit">
			<div className="commit-actions">
				<Button
					className="commit-button button"
					bsStyle={'primary'}
					onClick={afterCommit}
				>
					{'Commit'}
				</Button>
				<Button className="revert-button button" onClick={afterRollback}>
					{'Revert'}
				</Button>
			</div>
		</Popover>
	)
}

CommitPopover.propTypes = {
	afterCommit: PropTypes.func.isRequired,
	afterRollback: PropTypes.func.isRequired
}
