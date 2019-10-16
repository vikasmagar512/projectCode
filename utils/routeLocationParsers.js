import last from 'lodash/last'

export const extractLastValueFromPathname = ({ pathname }) => {
	const urlParts = pathname.split('/')
	const lastValue = last(urlParts)
	return lastValue
}
