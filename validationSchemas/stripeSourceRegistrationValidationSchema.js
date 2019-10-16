import { object, string } from 'yup'

export const COMPANY_NAME = 'cardHolderName'
export const STREET_ADDRESS = 'streetAddress'
export const CITY_ADDRESS = 'cityAddress'
export const ZIP_CODE = 'zipCode'
export const STATE = 'state'
export const COUNTRY = 'country'
export const ORGANISATION_NAME = 'organisationName'

const personalInfoValidationSchema = object({
	[STREET_ADDRESS]: string('Street Address')
		.min(5, 'Street address should contain at least 5 characters.')
		.max(100)
		.required('Street address is required.'),
	[CITY_ADDRESS]: string('City')
		.min(2, 'City name should contain at least 3 characters.')
		.max(100)
		.required('City address is required.'),
	[ZIP_CODE]: string('ZIP')
		.test(
			'length',
			'Incorrect ZIP Code',
			({ length }) => length === 5 || length === 6
		)
		.required('ZIP Code is required.'),
	[STATE]: string('State')
		.min(2)
		.max(100)
		.required('State is required.'),
	[ORGANISATION_NAME]: string('Organisation Name')
		.max(250)
		.required('Organization name is required.')
})

export default personalInfoValidationSchema
