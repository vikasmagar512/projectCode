import {
	extractDataFromConfig,
	randomResponseCreator
} from '../../utils/axiosMockHelpers'

const createUserMockResponse = config => {
	const { email } = extractDataFromConfig(config)
	return randomResponseCreator({
		success: {
			code: 201,
			response: {
				uuid: 'awes0meuuid',
				email,
				isActivated: false,
				fullName: ''
			}
		},
		failure: {
			code: 504,
			response: {}
		}
	})
}

export default createUserMockResponse
