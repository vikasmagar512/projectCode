/* eslint-disable no-inline-comments */
import moment from 'moment'
import {
	ADDRESS_TYPE,
	GATEWAY_TYPE,
	IP_MODES,
	IP_TYPE,
	LOCATION_TYPE
} from '../../enums'

export const list = [
	{
		id: '2ewsvw234ewrdsf', // UUID
		name: 'voCore-g2-42434234234', // String
		category: 2, // String or enum ID (need to define enum)
		type: 1, // String or enum ID (need to define enum)
		expiry: {
			type: 0, // String or enum ID (need to define) [HARD, SOFT]
			date: moment().toISOString() // Date time ISO-8601 or another one
		},
		asset_value: 50, // Number
		profile_group: 0, // ID
		description: 'Lorem ipsum', // Long string
		nsps: [
			{
				id: 1,
				name: 'us-east-1',
				status: 'good', // good, moderate, bad
				ping: 29, // ms
				loss: 0 // number, percantage
			}
		],
		status: 'connected', // string or enum ID
		last_change: moment()
			.subtract(2, 'hours')
			.toISOString(),
		element: 'device'
	},
	{
		id: '2ewsvw234ewrdsffsdf', // UUID
		name: 'voCore-g2-42434234234address', // String
		category: 4, // String or enum ID (need to define enum)
		type: 0, // String or enum ID (need to define enum)
		address_type: ADDRESS_TYPE.INTERNAL,
		expiry: {
			type: 0, // String or enum ID (need to define) [HARD, SOFT]
			date: moment().toISOString() // Date time ISO-8601 or another one
		},
		asset_value: 50, // Number
		profile_group: 1,
		description: 'Lorem ipsum', // Long string
		network: {
			ip: IP_TYPE.IPv4,
			address: {
				address: '192.168.0.1',
				mask: 30
			}
		},
		nsps: [
			{
				id: 1,
				name: 'us-east-1',
				status: 'good', // good, moderate, bad
				ping: 29, // ms
				loss: 0 // number, percantage
			},
			{
				id: 2,
				name: 'us-east-1',
				status: 'bad', // good, moderate, bad
				ping: 29, // ms
				loss: 0 // number, percantage
			},
			{
				id: 3,
				name: 'eu-west-1',
				status: 'good', // good, moderate, bad
				ping: 29, // ms
				loss: 0 // number, percantage
			}
		],
		status: 'undefined', // string or enum ID
		last_change: moment()
			.subtract(2, 'days')
			.toISOString(),
		element: 'address'
	},
	{
		id: '2ewsvw234ewrdse', // UUID
		name: 'voCore-g2-424342342ads', // String
		category: 5, // String or enum ID (need to define enum)
		type: 2, // String or enum ID (need to define enum)
		expiry: {
			type: 0, // String or enum ID (need to define) [HARD, SOFT]
			date: moment().toISOString() // Date time ISO-8601 or another one
		},
		profile_group: 2,
		asset_value: 50, // Number
		gateway_type: GATEWAY_TYPE.IPSEC, // or IPSEC (string or enum ID)
		description: 'Lorem ipsum', // Long string
		network: {
			ip: IP_TYPE.IPv4,
			mode: IP_MODES.Static, // or DHCP ,string or enum ID
			// if static (not sure about DHCP as designs is missing)
			gateway_ip: {
				mask: 30,
				address: '202.64.64.102'
			},
			default_route: {
				mask: 30,
				address: '202.64.64.102'
			},
			gateway_local: {
				mask: 30,
				address: '202.64.64.102'
			},
			additional_networks: [
				{
					network: {
						mask: 30,
						address: '202.64.64.102'
					},
					next_hop: {
						address: '202.64.64.102'
					}
				}
			]
		},
		nsps: [
			{
				id: 1,
				name: 'eu-west-1',
				status: 'good', // good, moderate, bad
				ping: 29, // ms
				loss: 0 // number, percantage
			}
		],
		status: 'connected', // string or enum ID
		last_change: moment()
			.subtract(2, 'days')
			.toISOString(),
		element: 'gateway'
	}
]

export const newOne = {
	id: `2ewsvw234ewrdsf${new Date().getTime()}`, // UUID
	name: 'voCore-g2-42434234234', // String
	category: 'IOT', // String or enum ID (need to define enum)
	type: 'Device', // String or enum ID (need to define enum)
	expiry: {
		type: 'Hard', // String or enum ID (need to define) [HARD, SOFT]
		date: moment().toISOString() // Date time ISO-8601 or another one
	},
	asset_value: 50, // Number
	profile_group: {
		id: 'qrefdw232-13rqf', // UUID
		name: 'Profile Group #1' // String
	},
	description: 'Lorem ipsum', // Long string
	location: {
		type: LOCATION_TYPE.AUTO, // string or enum ID [ coordinates, what else ... ]
		longitude: 12312321,
		latitude: 12313233
	},
	nsps: [
		{
			id: 1,
			name: 'eu-west-1',
			status: 'good', // good, moderate, bad
			ping: 29, // ms
			loss: 0 // number, percantage
		}
	],
	status: 'connected', // string or enum ID
	lastChange: moment()
		.subtract(2, 'days')
		.toISOString()
}
