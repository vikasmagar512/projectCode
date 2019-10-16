import moment from 'moment'
import { EXPIRATION_TYPE } from '../../enums'

export const policiesList = [
	{
		id: '2ewsvw234ewrdsf', // UUID
		name: 'voCore-g2-42434234234', // String
		expiry: {
			type: EXPIRATION_TYPE.SOFT, // String or enum ID (need to define) [HARD, SOFT]
			date: moment().toISOString() // Date time ISO-8601 or another one
		},
		source: 'pg-survivalience-21023',
		destination: 'jarvix-121323-protocololasd',
		threat_management: false,
		services: [
			{
				id: '123131231',
				name: 'Service #1',
				protocol: 'TCP',
				port: 8080
			},
			{
				id: '123131231',
				name: 'Service #2',
				protocol: 'TCP',
				port: 389
			}
		],
		applications: [
			{
				id: '123123131',
				name: 'Application #1'
			},
			{
				id: '123123132',
				name: 'Application #2'
			}
		],
		description: 'Lorem ipsum' // Long string
	},
	{
		id: '2ewsvw234ewrdsdd', // UUID
		name: 'voCore-g2-4243423423rr', // String
		expiry: {
			type: EXPIRATION_TYPE.SOFT, // String or enum ID (need to define) [HARD, SOFT]
			date: moment().toISOString() // Date time ISO-8601 or another one
		},
		source: 'pg-survivalience-21023',
		destination: 'jarvix-121323-protocololasd',
		threat_management: false,
		services: [
			{
				id: '123131231',
				name: 'Service #1',
				protocol: 'TCP',
				port: 8080
			},
			{
				id: '123131231',
				name: 'Service #1',
				protocol: 'HTTP',
				port: 389
			}
		],
		applications: [
			{
				id: '123123131',
				name: 'Application #1'
			},
			{
				id: '123123132',
				name: 'Application #2'
			}
		],
		description: 'Lorem ipsum' // Long string
	}
]

export const newService = {
	id: Math.floor(Math.random() * 1000),
	name: `TEST`,
	protocol: 'FTP',
	port: Math.floor(Math.random() * 65000)
}
