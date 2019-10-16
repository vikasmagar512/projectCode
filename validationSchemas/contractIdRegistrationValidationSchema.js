import { object, string, number } from 'yup'

export const COMPANY_NAME = 'companyName'
export const STREET_ADDRESS = 'streetAddress'
export const CITY_ADDRESS = 'cityAddress'
export const ZIP_CODE = 'zipCode'
export const STATE = 'state'
export const COUNTRY = 'country'
export const ACRETO_CONTRACT_ID = 'acretoContractId'

const personalInfoValidationSchema = object({
	[COMPANY_NAME]: string('Company Name')
		.min(2, 'Full name should contain at least 2 characters.')
		.max(100)
		.required('Full name is required.'),
	[STREET_ADDRESS]: string('Street Adress')
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
			'Incorrect ZIP Code.',
			({ length }) => length === 5 || length === 6
		)
		.required('ZIP Code is required!'),
	[STATE]: string('State')
		.min(3)
		.max(100)
		.required('State is required field.'),
	[ACRETO_CONTRACT_ID]: string('Acreto Contract Id').required(
		'Acreto Contract ID is required.'
	),
	[COUNTRY]: number().required
})

export default personalInfoValidationSchema
