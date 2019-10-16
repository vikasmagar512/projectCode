import { object, string, ref } from 'yup'

const personalInfoValidationSchema = object({
	firstName: string('First Name')
		.min(1, 'First Name should contain at least 1 character.')
		.max(100, 'First Name should contain max 100 characters.')
		.required('First name is required.'),
	lastName: string('Last Name')
		.min(1, 'Last Name should contain at least 1 character.')
		.max(100, 'Last Name should contain max 100 characters.')
		.required('Last name is required.'),
	password: string('Password')
		.min(8, 'Password should contain at least 8 chars.')
		.max(100, 'Password should be Max 100 characters.')
		.required('Passwrod is required.'),
	passwordConfirmation: string()
		.oneOf([ref('password')], 'Passwords do not match.')
		.required('Password confirmation is required.'),
	organizationName: string('Organization Name')
		.max(250, 'Organization Name must be at most 250 characters')
		.required('Organization Name is required.')
})

export default personalInfoValidationSchema
