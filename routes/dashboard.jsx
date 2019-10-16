import React from 'react'
import Loadable from 'react-loadable'
import {
	MENU_ADDRESS,
	MENU_CONTENT,
	MENU_ELEMENTS,
	MENU_GOVERNANCE,
	MENU_POLICIES,
	MENU_REPORT,
	MENU_SECURITY,
	MENU_USERS
} from '../assets/Icons'
import Loader from '../components/Loader/Loader'

const LoadableReports = Loadable({
	loader: () => import('../views/Reports/Reports'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const LoadableObjects = Loadable({
	loader: () => import('../views/Objects/Objects'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const LoadableContentList = Loadable({
	loader: () => import('../views/ContentList/ContentList'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const LoadableUsers = Loadable({
	loader: () => import('../views/Users/Users'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const LoadableGovernance = Loadable({
	loader: () => import('../views/Governance/Governance'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const LoadableSecurity = Loadable({
	loader: () => import('../views/Security/Security'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const LoadableAddressTranslation = Loadable({
	loader: () => import('../views/AddressTranslation/AddressTranslation'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})
const LoadableProfile = Loadable({
	loader: () => import('../views/UserProfile/UserProfile'),
	loading: () => <Loader /> // eslint-disable-line react/display-name
})

const dashboardRoutes = [
	{
		nested: true,
		name: 'Elements',
		icon: 'pe-7s-network',
		iconImage: MENU_ELEMENTS,
		paths: [
			{
				path: '/ecosystems/:id/objects',
				name: 'Objects',
				icon: 'pe-7s-albums',
				component: LoadableObjects
			},
			{
				path: '/ecosystems/:id/contentlist',
				name: 'Content List',
				icon: 'pe-7s-menu',
				iconImage: MENU_CONTENT,
				component: LoadableContentList
			},
			{
				path: '/ecosystems/:id/users',
				name: 'Users',
				icon: 'pe-7s-user',
				iconImage: MENU_USERS,
				component: LoadableUsers
			}
		]
	},
	{
		nested: true,
		name: 'Policies',
		icon: 'pe-7s-check',
		iconImage: MENU_POLICIES,
		paths: [
			{
				path: '/ecosystems/:id/security',
				name: 'Security',
				icon: 'pe-7s-unlock',
				iconImage: MENU_SECURITY,
				component: LoadableSecurity
			},
			{
				path: '/ecosystems/:id/addresstranslations',
				name: 'Address Translation',
				icon: 'pe-7s-way',
				iconImage: MENU_ADDRESS,
				component: LoadableAddressTranslation
			}
		]
	},
	{
		path: '/ecosystems/:id/reports',
		name: 'Reports',
		icon: 'pe-7s-note2',
		iconImage: MENU_REPORT,
		component: LoadableReports
	},
	{
		path: '/ecosystems/:id/governance',
		name: 'Governance',
		icon: 'pe-7s-users',
		iconImage: MENU_GOVERNANCE,
		component: LoadableGovernance
	},
	{
		path: '/ecosystems/:id/profile',
		name: 'Profile',
		component: LoadableProfile
	},
	{ redirect: true, path: '/', to: '/ecosystems/:id/reports', name: 'Reports' }
]

export default dashboardRoutes
