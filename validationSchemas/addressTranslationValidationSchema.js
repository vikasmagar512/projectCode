import { object, string, bool, number } from 'yup'
import { ADDRESS_TRANSLATION_TYPES } from '../enums'
import * as yup from 'yup'

yup.addMethod(string, 'min', function(min, msg) {
	return this.test({
		name: 'min',
		exclusive: true,
		message: msg,
		test: value => !value || value.length >= min
	})
})
export default object({
	action: number()
		.oneOf([
			ADDRESS_TRANSLATION_TYPES.ENABLE,
			ADDRESS_TRANSLATION_TYPES.DISABLE
		])
		.required(),
	description: string(),
	enabled: bool()
		.oneOf([true, false])
		.default(true)
		.required(),
	name: string('Enter policy name')
		.required('Name is required.')
		.min(3, 'Name should have at least 3 chars.')
	// .required(),
	// destinations: array().of(string()),
	//	.min(1),
	// sources: array().of(string()),
	//	.min(1),
	// services: object().required('Destination Port is required.')
})
