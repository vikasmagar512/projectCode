import { object, string } from 'yup'

export const ZIP_CODE = 'zipCode'
export const CARD_NAME = 'cardName'

const personalInfoValidationSchema = object({
	[ZIP_CODE]: string('ZIP')
		.test(
			'length',
			'Incorrect ZIP Code',
			({ length }) => length === 5 || length === 6
		)
		.required('ZIP Code is required.'),
	[CARD_NAME]: string('Name is required')
		.max(20)
		.required('Name is required.')
})

export default personalInfoValidationSchema
