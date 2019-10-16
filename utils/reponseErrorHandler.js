import get from 'lodash/get'
import assign from 'lodash/assign'

const defaultErrorHandler = {
	403: 'You don`t have permissions to provide this operation!',
	422: 'Request payload is invalid!',
	500: 'Internal server error!',
	504: 'Gateway connection timeout!',
	default: 'An error occured'
}

export const createResponseErrorMessage = ({
	specificErrorHandler,
	status
}) => {
	const errorMessages = assign({}, defaultErrorHandler, specificErrorHandler)
	const errorMessage = errorMessages[status] || errorMessages.default
	return errorMessage
}

export const extractResponseErrorStatus = error => {
	const status = get(error, ['response', 'status'], 'default')
	return status
}
