import { object, string } from 'yup'

const groupValidationSchema = object({
	name: string('Enter group name')
		.max(36, 'Max length exceeded.')
		.min(3, 'Name should have at least 3 chars.')
		.required('Name is required.')
})

export default groupValidationSchema
