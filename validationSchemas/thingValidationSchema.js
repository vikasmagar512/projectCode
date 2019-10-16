import { number, object, string } from 'yup'

const thingValidationSchema = object({
	name: string('Enter thing name')
		.max(35, 'Name should be less than 36 chars.')
		.min(3, 'Name should have at least 3 chars.')
		.required('Name is required.'),
	// expiryType: number('Select expiry type')
	// 	.required('Expiry type is required'),
	// expiry: date('Enter expiry date').required('Expiry date is required.'),
	category: object().required(),
	type: object().required(),
	// asset: object().required(),
	asset: number('Enter operational importance')
		.positive('Operational importance must be positive')
		.min(1, 'Operational importance can be minimum 1')
		.max(10, 'Operational importance can be maximum 10')
		.required('Operational importance is required.')
		.typeError('Invalid number'),
	profile: object()
		.required('Profile Group is required.')
		.typeError('Profile Group is required.')
})

export default thingValidationSchema
