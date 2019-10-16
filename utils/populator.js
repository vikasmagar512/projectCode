import moment from 'moment'

export default {
	group: ({ uuid, name, element }) => ({
		value: uuid || '',
		label: name || '',
		type: element || 'group'
	}),
	thing: entity => ({
		uuid: entity.uuid,
		assetValue: entity.asset,
		category: entity.category.value,
		expiry: {
			time: moment()
				.add(3, 'years')
				.toISOString(),
			type: 'soft'
		},
		name: entity.name,
		profileGroup: entity.profile.value,
		type: 'device'
	}),
	address: entity => ({
		address: entity.address,
		category: entity.category.value,
		name: entity.name,
		type: entity.protocolType
	}),
	gateway: entity => ({
		name: entity.name,
		category: entity.category.value,
		expiry: {
			time: moment()
				.add(3, 'years')
				.toISOString(),
			type: 'soft'
		},
		peer_address: checkMask(entity.staticAddress),
		peer_networks: entity.additionalNetworks.map(net => checkMask(net.network))
	})
}

function checkMask(ip) {
	if (ip) {
		return ip.split('/')[1] ? ip : ip + '/32'
	}
	return
}
