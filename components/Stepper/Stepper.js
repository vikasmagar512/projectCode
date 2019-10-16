import React from 'react'
import cx from 'classnames'
import { string, number, shape, arrayOf } from 'prop-types'
import './stepper.scss'

const Stepper = ({ steps, activeStepIndex }) => {
	return (
		<div className="stepper-container">
			{steps.map(({ title }, index) => {
				const active = index === activeStepIndex
				const done = index < activeStepIndex
				const pending = index > activeStepIndex
				const last = steps.length - index === 1
				return (
					<div key={title} className="single-step-container">
						<div
							className={cx('step-title', {
								active
							})}
						>
							{title}
						</div>
						<div
							className={cx('round-step-wrapper', {
								active,
								done,
								pending,
								last
							})}
						>
							<div
								className={cx('round-step', {
									active,
									done,
									pending,
									last
								})}
							>
								{++index}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

Stepper.propTypes = shape({
	steps: arrayOf(shape({ title: string })),
	activeStepIndex: number
}).isRequired

export default Stepper
