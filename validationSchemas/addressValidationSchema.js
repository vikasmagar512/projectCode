import { object, string } from 'yup'

const addressValidationSchema = object({
	name: string('Enter thing name')
		.max(36, 'Max length exceeded.')
		.required('Name is required.'),
	category: object().required('Category is required.'),
	address: string().required('Address is required.'),
	type: object().required()
})

export default addressValidationSchema
