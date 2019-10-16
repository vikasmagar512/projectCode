import { array, object, string } from 'yup'

export default object({
	name: string()
		.max(10, 'Max length of 10 characters exceeded.')
		.min(3, 'Name should have at least 3 chars.')
		.matches(/^[a-zA-Z0-9\-_]*$/, {
			message: "Only Alphanumeric characters with '-' and '_' are allowed."
		})
		.required('Name is required.'),
	category: object().required('Category is required.'),
	additionalNetworks: array()
		.of(string())
		.min(1, 'Local Network is required.')
})
