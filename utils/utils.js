import jwt from 'jsonwebtoken'
import unique from 'lodash/uniqBy'

export function extractCustomers(roles) {
	if (!roles || roles === ' ') {
		return []
	}
	const split = roles.split(' ')
	const customers = split.map(part => {
		return {
			name: part.split('.')[0],
			uuid: part.split('.')[1]
		}
	})

	return unique(customers, 'uuid')
}

export function extractCustomerFromToken(token) {
	const decodedToken = jwt.decode(token, { json: true })
	return extractCustomers(decodedToken.roles)
}

export function extractCustomer(customers) {
	return (
		customers &&
		customers.map(customer => ({
			uuid: customer.id,
			name: customer.name
		}))
	)
}

export function extractUsernameFromToken(token) {
	const decodedToken = jwt.decode(token, { json: true })
	return decodedToken.username
}

export function pathSlugToPageName(slug) {
	switch (slug) {
		case 'objects':
			return 'Objects'
		case 'contentlist':
			return 'Content List'
		case 'addresstranslations':
			return 'Address Translation'
		default:
			return slug
	}
}

export function parseResponseError(error, errorsArray = {}) {
	if (error.response) {
		switch (error.response.status) {
			case 400:
				return errorsArray['400'] || 'Wrong request'
			default:
				return 'Something went wrong. Please again later.'
		}
	}
	return 'Network error'
}

export function uuidValidation(items, uuid) {
	const valid = items.find(item => item.uuid === uuid)

	if (!valid) return false
	return true
}
