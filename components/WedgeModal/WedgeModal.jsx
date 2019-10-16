import PropTypes from 'prop-types'
import React from 'react'
import Modal from 'react-modal'
import { CLOSE } from '../../assets/Icons'
import './wedge-modal.scss'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		width: '60%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		padding: '0px',
		border: '0px',
		minWidth: 'min-content',
		maxWidth: '100%',
		borderRadius: 0
	},
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	}
}

function getStyles(size) {
	switch (size) {
		case 'big':
			return {
				overlay: customStyles.overlay,
				content: {
					...customStyles.content,
					width: '80%'
				}
			}
		case 'small':
			return {
				overlay: customStyles.overlay,
				content: {
					...customStyles.content,
					width: '40%'
				}
			}
		case 'tiny':
			return {
				overlay: customStyles.overlay,
				content: {
					...customStyles.content,
					width: '24%'
				}
			}
		case 'normal':
		default:
			return customStyles
	}
}

export default function WedgeModal({
	isOpen,
	onClose,
	afterOpen,
	children,
	footer,
	size,
	additionalAction = false,
	title = 'Example title'
}) {
	return (
		<Modal
			isOpen={isOpen}
			shouldCloseOnOverlayClick={false}
			onAfterOpen={afterOpen}
			onRequestClose={onClose}
			style={getStyles(size)}
		>
			<div className={'wedge-modal'}>
				<div className={'wedge-modal__header header'}>
					<p className={'header__title'}>{title}</p>
					<div className={'header__actions-container'}>
						{additionalAction && (
							<i
								className={`header__action ${additionalAction.icon}`}
								onClick={additionalAction.callback}
							/>
						)}
						<img
							src={CLOSE}
							alt={'close-icon'}
							className={'header__close'}
							onClick={onClose}
						/>
					</div>
				</div>
				<div className={'wedge-modal__content'}>
					{children}
					{footer && <div className={'wedge-modal__footer'}>{footer}</div>}
				</div>
			</div>
		</Modal>
	)
}

WedgeModal.defaultProps = {
	size: 'normal'
}

WedgeModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	afterOpen: PropTypes.func,
	children: PropTypes.element,
	footer: PropTypes.element,
	title: PropTypes.string,
	additionalAction: PropTypes.object,
	size: PropTypes.oneOf(['tiny', 'small', 'normal', 'big'])
}
