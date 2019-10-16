import moment from 'moment'

export default [
	{
		id: 'e6960bd4-2275-4d55-a1e7-a9101e79ba36',
		name: 'Test Ecosystem #1',
		lastSeen: moment()
			.subtract(5, 'hours')
			.toISOString(),
		nsps: [
			{
				id: 1,
				name: 'eu-west-1',
				status: 'good'
			},
			{
				id: 2,
				name: 'us-east-2',
				status: 'good'
			}
		],
		owner: {
			fullName: 'Test Owner'
		},
		utilization: 41,
		threat: 20,
		down: 55,
		disabled: false
	},
	{
		id: '123ds-1231qwsdfsd-12eqadfgs22',
		name: 'Test Ecosystem #2',
		lastSeen: moment()
			.subtract(5, 'hours')
			.toISOString(),
		nsps: [
			{
				id: 1,
				name: 'eu-west-1',
				status: 'good'
			},
			{
				id: 2,
				name: 'us-east-2',
				status: 'good'
			},
			{
				id: 3,
				name: 'us-east-2',
				status: 'good'
			},
			{
				id: 4,
				name: 'us-east-2',
				status: 'good'
			},
			{
				id: 5,
				name: 'us-east-2',
				status: 'good'
			}
		],
		owner: {
			fullName: 'Test Owner'
		},
		utilization: 41,
		threat: 20,
		down: 55,
		disabled: false
	},
	{
		id: '123ds-1231qwsdfsd-12eqadfgss',
		name: 'Test Ecosystem #3',
		lastSeen: moment()
			.subtract(10, 'days')
			.toISOString(),
		nsps: [
			{
				id: 1,
				name: 'eu-west-1',
				status: 'good'
			},
			{
				id: 2,
				name: 'us-east-2',
				status: 'bad'
			}
		],
		owner: {
			fullName: 'Test Owner #2'
		},
		utilization: 40,
		threat: 20,
		down: 55,
		disabled: true
	}
]
