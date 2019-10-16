import * as REST from '../../api/rest'
import { clearData, logoutUser } from '../auth/actions'

const errorReducer = (state = {}, action) => {
	const { type, payload } = action
	const matches = /(.*)_(REQUEST|FAILURE)/.exec(type)

	// not a *_REQUEST / *_FAILURE actions, so we ignore them
	if (!matches) return state

	const [, requestName, requestState] = matches

	if (requestState === 'FAILURE' && payload.message.response) {
		if (payload.message.response.status === 401) {
			REST.logout()
			action.asyncDispatch(logoutUser())
			action.asyncDispatch(clearData())
		}
	}
	return {
		...state,
		// Store errorMessage
		// e.g. stores errorMessage when receiving GET_TODOS_FAILURE
		//      else clear errorMessage when receiving GET_TODOS_REQUEST
		[requestName]: requestState === 'FAILURE' ? payload.message : ''
	}
}

export default errorReducer
