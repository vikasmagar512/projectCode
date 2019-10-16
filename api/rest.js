import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import humps from 'humps'
import { LOCAL_ACCESS_TOKEN_KEY } from '../enums'
import Translator from '../utils/enumTranslator'
import configStore from '../store'
import { logoutUser, renewToken } from '../store/auth/actions'
import { list } from './mocks/fetch_objects'
import history from '../history'
import { loading } from '../store/global/actions'

const { store } = configStore

export const auth = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})

export const rest = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	transformResponse: [
		...axios.defaults.transformResponse,
		data => humps.camelizeKeys(data)
	]
})

rest.interceptors.request.use(
	config => {
		const token = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)

		if (token === null) {
			store.dispatch(logoutUser())
			return config
		}
		if (['post', 'put', 'delete'].findIndex(k => k === config.method) !== -1) {
			store.dispatch(loading(true))
		}
		config.headers.Authorization = `Bearer ${token}`

		return config
	},
	err => Promise.reject(err)
)

rest.interceptors.response.use(
	response => {
		store.dispatch(renewToken())
		if (
			['post', 'put', 'delete'].findIndex(k => k === response.config.method) !==
			-1
		) {
			store.dispatch(loading(false))
		}
		return response
	},
	error => {
		if (
			['post', 'put', 'delete'].findIndex(k => k === error.config.method) !== -1
		) {
			store.dispatch(loading(false))
		}
		if (error.status === 401) {
			localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
			store.dispatch(logoutUser())
		}
		if (error.response.status === 404 || error.response.status === 500) {
			history.push({
				pathname: '/notFound',
				state: { errorCode: error.response.status }
			})
		}
		return Promise.reject(error)
	}
)

if (process.env.REACT_APP_ENABLE_MOCK === 'true') {
	const readUserMockReponse = require('./mocks/read_user')
	const createUserMockReponse = require('./mocks/create_user')
	const fulfillUserMockResponse = require('./mocks/fulfill_user')
	const restMock = new MockAdapter(rest, { delayResponse: 300 })
	restMock
		.onGet('/ecosystems/00790f55-a0a5-f4a4-6041-f291324f89a1/objects')
		.reply(200, list)
		.onPut(
			'/ecosystems/e6960bd4-2275-4d55-a1e7-a9101e79ba36/objects/2ewsvw234ewrdsf'
		)
		.reply(400)
		.onGet(new RegExp('/v2/users/*'))
		.reply(readUserMockReponse)
		.onPut(new RegExp('/v2/users/*'))
		.reply(fulfillUserMockResponse)
		.onAny()
		.passThrough()

	const authMock = new MockAdapter(auth, { delayResponse: 300 })
	authMock
		.onPost(`v2/users`)
		.reply(createUserMockReponse)
		.onAny()
		.passThrough()
}

export function fetchEcosystems({ customer }) {
	return rest
		.get(`/v2/customers/${customer.uuid}/ecosystems`)
		.then(response => response.data)
}
export function createEcosystem({ customer, entity }) {
	/*const nspName =
		process.env.REACT_APP_ENV_NAME === 'PROD'
			? 'EWR1'
			: `${process.env.REACT_APP_ENV_NAME}-EWR1`*/
	return rest
		.post(`/v2/customers/${customer.uuid}/ecosystems`, {
			name: entity.name,
			nsps: entity.nsps.reduce((arr, i) => arr.concat(i.name), [])
		})
		.then(response => response.data)
}

export function removeEcosystem({ customer, ecosystem }) {
	return rest
		.delete(`v2/customers/${customer}/ecosystems/${ecosystem}`)
		.then(response => response.data)
}

export function fetchObjects({ customer, ecosystem, type }) {
	return rest
		.get(getUrlForType({ type, ecosystem, customer }))
		.then(response => response.data)
		.then(data => data.map(d => ({ ...d, element: type })))
}

export function fetchThings({ customer, ecosystem }) {
	return rest
		.get(`/v2/customers/${customer.uuid}/ecosystems/${ecosystem}/devices`)
		.then(response => response.data)
		.then(data => data.map(dv => ({ ...dv, element: 'thing' })))
}

export function fetchAddresses({ customer, ecosystem }) {
	return rest
		.get(
			`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/addresses`
		)
		.then(response => response.data)
}

export function fetchPolicies({ customer, ecosystem }) {
	return rest
		.get(`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/policies`)
		.then(response => response.data)
}
export function fetchDNATs({ customer, ecosystem }) {
	return (
		rest
			// .get(`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/DNATs`)
			.get(
				`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/policies`
			)
			.then(response => response.data)
	)
}

export function createPolicy({ customer, ecosystem, entity }) {
	return rest
		.post(
			`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/policies`,
			entity
		)
		.then(response => response.data)
}
export function createDNAT({ customer, ecosystem, entity }) {
	return rest
		.post(
			// `/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/DNATs`,
			`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/policies`,
			entity
		)
		.then(response => response.data)
}

export function fetchGroups({ customer, ecosystem }) {
	return rest
		.get(`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/groups`)
		.then(response => response.data)
}

export function fetchApplications({ customer, ecosystem }) {
	return rest
		.get(
			`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/applications`
		)
		.then(response => response.data)
}

export function fetchServices({ customer, ecosystem }) {
	return rest
		.get(`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/services`)
		.then(response => response.data)
}

export function createGroup({ customer, ecosystem, name }) {
	return rest
		.post(
			`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/groups`,
			{
				name
			}
		)
		.then(response => response.data)
}

export function createObject({ object, type, ecosystem, customer }) {
	return rest
		.post(getUrlForType({ type, ecosystem, customer }), object)
		.then(response => response.data)
		.then(data => ({ ...data, element: type }))
}

export function updateObject({ object, type, ecosystem, customer, uuid }) {
	return rest
		.put(`${getUrlForType({ type, ecosystem, customer })}/${uuid}`, object)
		.then(response => response.data)
		.then(data => ({ ...data, element: type }))
}

export function deleteObject({ customer, ecosystem, object }) {
	return rest
		.delete(
			`${getUrlForType({ type: object.element, ecosystem, customer })}/${
				object.uuid
			}`
		)
		.then(response => response.data)
}

export function updatePolicy({ entity, uuid, ecosystem, customer }) {
	return rest
		.put(
			`/v2/customers/${customer.uuid}/ecosystems/${
				ecosystem.uuid
			}/policies/${uuid}`,
			entity
		)
		.then(response => response.data)
}

export function updateDNAT({ entity, uuid, ecosystem, customer }) {
	return rest
		.put(
			`/v2/customers/${customer.uuid}/ecosystems/${
				ecosystem.uuid
				// }/DNATs/${uuid}`,
			}/policies/${uuid}`,
			entity
		)
		.then(response => response.data)
}

export function deletePolicy({ policy, ecosystem, customer }) {
	return rest
		.delete(
			`/v2/customers/${customer}/ecosystems/${ecosystem}/policies/${policy}`
		)
		.then(response => response.data)
}
export function deleteDNAT({ policy, ecosystem, customer }) {
	return rest
		.delete(
			// `/v2/customers/${customer}/ecosystems/${ecosystem}/DNATs/${policy}`
			`/v2/customers/${customer}/ecosystems/${ecosystem}/policies/${policy}`
		)
		.then(response => response.data)
}

export function reorderPolicy({ policy, after, ecosystem, customer }) {
	return rest
		.post(
			`/v2/customers/${customer}/ecosystems/${ecosystem}/policies/${policy}/reorder`,
			after
		)
		.then(response => response.data)
}
export function reorderDNAT({ policy, after, ecosystem, customer }) {
	return rest
		.post(
			// `/v2/customers/${customer}/ecosystems/${ecosystem}/DNATs/${policy}/reorder`,
			`/v2/customers/${customer}/ecosystems/${ecosystem}/policies/${policy}/reorder`,
			after
		)
		.then(response => response.data)
}

export function createService({ customer, service, ecosystem }) {
	return rest
		.post(
			`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/services`,
			service
		)
		.then(response => response.data)
}

export function login(credentials) {
	return auth.post(`v2/auth/login`, credentials).then(response => response.data)
}

export function logout() {
	return rest.post(`/v2/auth/logout`, {}).then(response => response.data)
}

export async function fetchReports({ query, ecosystem, customer }) {
	const hits = await rest
		.post(
			`/v2/customers/${customer.uuid}/ecosystems/${ecosystem}/logs/_search`,
			query
		)
		.then(response => {
			return response.data.hits.hits
		})
	return hits
		.map(report => ({ ...report.source, id: report.id }))
		.map(report => {
			return {
				id: report.id,
				date: report.eventDatetime,
				policy: report.policyID,
				service: {
					protocol: report.networkProtocol,
					port: report.destinationPort,
					tcp: report.networkProtocol,
					status: ''
				},
				application: report.application,
				source: {
					geography: report.sourceGeography,
					ip: report.sourceIP,
					fqdn: report.sourceFQDN ? report.sourceFQDN : ''
				},
				destination: {
					geography: report.destinationGeography,
					ip: report.destinationIP,
					fqdn: report.destinationFQDN ? report.destinationFQDN : ''
				},
				actions: [report.eventAction],
				alert: report.eventCategory === 'Threat' ? 'Threat' : '',
				status: 'active',
				stats: {
					bytesSent: report.bytesSent ? report.bytesSent : 0,
					bytesTotal: report.bytesTotal ? report.bytesTotal : 0,
					packetsSent: report.packetsSent ? report.packetsSent : 0,
					packetsTotal: report.packetsTotal ? report.packetsTotal : 0,
					elapsedSeconds: report.elapsedSeconds ? report.elapsedSeconds : 0
				}
			}
		})
}

export function getGatewayToken({ customer, ecosystem, gateway }) {
	return rest
		.post(
			`/v2/customers/${customer}/ecosystems/${ecosystem}/gateways/${
				gateway.uuid
			}/token`,
			{ ttl: 86400 }
		)
		.then(response => response.data)
}

export function downloadConf(token, gateway) {
	const link = document.createElement('a')
	link.download = gateway
	link.href = `${
		process.env.REACT_APP_API_URL
	}/v2/gateways/ipsec/config/strongswan?_token=${token.token}`
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

export function getConfigLink(token) {
	const link = `${
		process.env.REACT_APP_API_URL
	}/v2/gateways/ipsec/config/strongswan?_token=${token.token}`

	return link
}

export function acceptCommit({ customer, ecosystem }) {
	return rest
		.post(
			`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/commits`,
			{}
		)
		.then(response => response.data)
}

export function acceptRollback({ customer, ecosystem }) {
	return rest
		.post(
			`/v2/customers/${customer.uuid}/ecosystems/${ecosystem.uuid}/rollback`,
			{}
		)
		.then(response => response.data)
}

function getUrlForType({ type, ecosystem, customer }) {
	return `/v2/customers/${
		customer.uuid
	}/ecosystems/${ecosystem}/${Translator.urlType(type)}`
}

export function fetchEcosystemStatus({ customer, ecosystem }) {
	return rest
		.get(`/v2/customers/${customer.uuid}/ecosystems/${ecosystem}`)
		.then(response => response.data)
}

export function fecthCustomerDetail({ customer }) {
	return rest.get(`/v2/customers/${customer}`).then(response => response.data)
}

export function fetchNSPs() {
	return rest.get(`/v2/nsps`).then(response => response.data)
}
