import {
	extractEmailFromConfigUrl,
	randomResponseCreator
} from '../../utils/axiosMockHelpers'

const readUserMockReponse = config => {
	const email = extractEmailFromConfigUrl(config)
	return randomResponseCreator({
		success: {
			code: 200,
			response: {
				email,
				fullName: 'Test User',
				uuid: 'awes0meuuid',
				activated: false
			}
		},
		failure: {
			code: 403,
			response: {}
		}
	})
}

export default readUserMockReponse
