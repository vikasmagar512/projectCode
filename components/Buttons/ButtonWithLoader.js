import React from 'react'
import './button-with-loader.scss'

export function ButtonWithLoader({ text, isLoading, isSubmit = false }) {
	if (isSubmit) {
		return (
			<div className={'button-with-loader-container'}>
				<input
					type="submit"
					className={`login-button ${isLoading ? 'hidden' : 'visible'}`}
					value={text}
				/>
				<div className={'loader-container'} />
			</div>
		)
	}
}
