import { rest, auth } from '../../api/rest'

export const createUser = ({ email, password }) => {
	return auth.post('/v2/users', { email, password })
}

export const loginUserForToken = email => {
	return auth.post(`v2/auth/login`, {
		username: email,
		password: 'VeryLongDefP@SS'
	})
}

export const fulfillUser = ({ email, firstName, lastName }) => {
	const path = `/v2/users/${email}`
	return rest.put(path, { email, firstName, lastName })
}

export const readUserData = username => rest.get(`v2/users/${username}`)

export const createCustomer = requestBody => {
	return rest.post('v2/customers', requestBody)
}

export const patchBilling = ({ requestBody, customerUUID }) => {
	return rest.patch(`v2/customers/${customerUUID}`, requestBody)
}

export const registerPasswordCall = ({ email, password }) => {
	const path = `v2/users/${email}/password`
	return rest.post(path, { password })
}

export const updatePasswordCall = ({ email, password, newPassword }) => {
	const path = `v2/users/${email}/password`
	return rest.put(path, { newPassword, password })
}

export const loginUserCall = ({ password, username }) => {
	const path = `v2/auth/login`
	return auth.post(path, {
		username,
		password
	})
}

export const updateUserCall = ({
	email,
	firstName,
	lastName,
	mobilePhone,
	avatar
}) => {
	const path = `v2/users/${email}`
	return rest
		.put(path, { firstName, lastName, mobilePhone, email, avatar })
		.then(response => response.data)
}

export const getThingToken = ({ customerUUID, ecosystemUUID, thingUUID }) => {
	const path = `v2/customers/${customerUUID}/ecosystems/${ecosystemUUID}/devices/${thingUUID}/token`
	return rest.post(path, { ttl: 86400 })
}

export const getGatewayToken = ({
	customerUUID,
	ecosystemUUID,
	gatewayUUID
}) => {
	const path = `v2/customers/${customerUUID}/ecosystems/${ecosystemUUID}/gateways/${gatewayUUID}`
	return rest.post(path, { ttl: 86400 })
}
