import {
	ADDRESS_TYPES_OPTIONS,
	AVAILABLE_REGIONS,
	EXPIRATION_TYPE_OPTIONS,
	GATEWAY_TYPE_OPTIONS,
	IP_MODES_OPTIONS,
	IP_TYPE_OPTIONS,
	LOCATION_TYPE_OPTIONS,
	OBJECT_TYPES_CONFIG,
	OBJECT_CATEGORIES,
	OBJECT_TYPES
} from '../enums'

export default {
	category: id => find(OBJECT_CATEGORIES, id),
	type: id => find(OBJECT_TYPES, id),
	expirationType: id => find(EXPIRATION_TYPE_OPTIONS, id),
	location: id => find(LOCATION_TYPE_OPTIONS, id),
	region: id => find(AVAILABLE_REGIONS, id),
	protocolType: id => find(IP_TYPE_OPTIONS, id),
	addressType: id => find(ADDRESS_TYPES_OPTIONS, id),
	mask: id => {
		return { value: id, label: `${id}` }
	},
	gatewayType: id => find(GATEWAY_TYPE_OPTIONS, id),
	mode: id => find(IP_MODES_OPTIONS, id),
	urlType: type => getUrlType(type)
}

function find(enums, id) {
	return enums.find(c => c.value === id) || { label: 'unkn' }
}

function getUrlType(type) {
	return OBJECT_TYPES_CONFIG.find(el => el.name === type).urlType
}
