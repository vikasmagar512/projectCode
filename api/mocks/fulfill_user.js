import {
	extractDataFromConfig,
	randomResponseCreator
} from '../../utils/axiosMockHelpers'

const fulfillUserMockResponse = config => {
	const { email, fullName } = extractDataFromConfig(config)
	return randomResponseCreator({
		success: {
			code: 201,
			response: {
				uuid: 'awes0meuuid',
				email,
				isActivated: true,
				fullName
			}
		},
		failure: {
			code: 504,
			response: {}
		}
	})
}

export default fulfillUserMockResponse
