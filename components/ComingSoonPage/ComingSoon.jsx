import React from 'react'
import ComingSoonImage from '../../assets/img/coming-soon.png'
import '../../assets/sass/common.scss'

export default function ComingSoon() {
	return (
		<div className={'coming-soon'}>
			<div className={'coming-soon__container'}>
				<img alt={'coming-soon'} src={ComingSoonImage} />
			</div>
		</div>
	)
}
