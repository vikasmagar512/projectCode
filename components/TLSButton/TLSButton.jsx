import React from 'react'
import * as AcretoSH from '../../assets/acreto.sh'
import './TLSButton.scss'

export default function TLSButton() {
	return (
		<form className={'tls__form'} method="get" action={AcretoSH}>
			<button className={'tls__button'} type="submit">
				Download TLS-Client
			</button>
		</form>
	)
}
