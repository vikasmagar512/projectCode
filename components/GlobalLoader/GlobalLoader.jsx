import React from 'react'
import './global-loader.scss'
import { ACRETO_LOGO } from '../../assets/Icons'

export default function GlobalLoader() {
	return (
		<div className="global-loader">
			<img className="global-loader--logo" alt="acreto" src={ACRETO_LOGO} />
		</div>
	)
}
