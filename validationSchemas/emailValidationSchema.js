import { object, string } from 'yup'

const emailValidationSchema = object({
	email: string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required.')
})

export default emailValidationSchema
