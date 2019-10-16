import Populator from '../../utils/populator'

describe('src/utils/populator.js', () => {
	describe('group', () => {
		it('should return object with value and label', () => {
			const result = Populator.group({
				uuid: 123,
				name: 'label',
				element: 'element'
			})
			expect(result).toEqual({ value: 123, label: 'label', type: 'element' })
		})

		it('should return object with default values when not object with uuid and name passed', () => {
			const result = Populator.group({
				uuid: 123,
				nam: 'label',
				element: 'element'
			})
			expect(result).toEqual({ value: 123, label: '', type: 'element' })
		})
	})
})
