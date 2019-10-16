import last from 'lodash/last'
import get from 'lodash/get'
import Chance from 'chance'

export const extractDataFromConfig = config => {
	let { data } = config
	data = JSON.parse(data)
	return data
}

export const extractTokenFromConfig = config => {
	const data = extractDataFromConfig(config)
	const bearerString = get(data, ['headers', 'Authorization'], null)
	if (bearerString) {
		const bearerParts = bearerString.split(' ')
		const token = last(bearerParts)
		return token
	}
}

export const extractEmailFromConfigUrl = config => {
	const { url } = config
	const urlParts = url.split('/')
	const email = last(urlParts)
	return email
}

export const randomResponseCreator = ({ success, failure }) => {
	const chance = new Chance()
	const random = chance.bool({
		likelihood: 60
	})
	return random
		? [success.code, success.response]
		: [failure.code, failure.response]
}
