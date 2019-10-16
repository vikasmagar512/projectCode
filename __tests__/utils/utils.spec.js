import { extractCustomers } from '../../utils/utils'

describe('src/utils/utils.js', () => {
	describe('extractCustomers', () => {
		it('return empty array if roles is undefined', () => {
			const result = extractCustomers()
			expect(result).toHaveLength(0)
		})
		it('return empty arrat if roles is empty string', () => {
			const result = extractCustomers('')
			expect(result).toHaveLength(0)
		})
		it('return empty arrat if roles is string with space', () => {
			const result = extractCustomers(' ')
			expect(result).toHaveLength(0)
		})
		it('return array with one customer', () => {
			const result = extractCustomers('customer.uuid')
			expect(result).toHaveLength(1)
			expect(result[0]).toEqual({ name: 'customer', uuid: 'uuid' })
		})
		it('return array with two customers', () => {
			const result = extractCustomers('customer.uuid customer2.uuid2')
			expect(result).toHaveLength(2)
			expect(result[0]).toEqual({ name: 'customer', uuid: 'uuid' })
			expect(result[1]).toEqual({ name: 'customer2', uuid: 'uuid2' })
		})
		it('return array with one customer if there is duplicated id', () => {
			const result = extractCustomers('customer.uuid customer2.uuid')
			expect(result).toHaveLength(1)
			expect(result[0]).toEqual({ name: 'customer', uuid: 'uuid' })
		})
	})
})
