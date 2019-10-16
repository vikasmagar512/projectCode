import axios from 'axios'

const elasticsearch = axios.create({
	baseURL: process.env.REACT_APP_ES_CLUSTER_URL
})

const REPORTS_INDEX = 'elastictest'

export async function fetchReports(query) {
	const hits = await elasticsearch
		.post(`${REPORTS_INDEX}/_search`, query)
		.then(response => {
			return response.data.hits.hits
		})
	return hits
		.map(report => ({ ...report._source, id: report._id }))
		.map(report => {
			return {
				id: report.id,
				date: report.EventDatetime,
				policy: report.PolicyID,
				source: report.SourceID,
				service: {
					protocol: '',
					port: report.DestinationPort,
					tcp: 'UDP',
					status: ''
				},
				application: '',
				destination: report.DestinationID,
				actions: [report.EventAction],
				alert: 'Threat',
				status: 'active'
			}
		})
}
