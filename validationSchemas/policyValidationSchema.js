import { object, string, bool, array, number } from 'yup'
import { ACTION_TYPES } from '../enums'
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
		.oneOf([ACTION_TYPES.DENY, ACTION_TYPES.ALLOW])
		.required(),
	applications: array().of(string()),
	description: string(),
	enabled: bool()
		.oneOf([true, false])
		.default(true)
		.required(),
	threatManagement: bool()
		.oneOf([true, false])
		.required(),
	name: string('Enter policy name')
		.required('Name is required.')
		.min(3, 'Name should have at least 3 chars.'),
	destinations: array().of(string()),
	sources: array().of(string()),
	services: array().of(string())
})
