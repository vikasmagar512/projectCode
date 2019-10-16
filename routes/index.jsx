import Dashboard from '../layouts/Dashboard/Dashboard'
import Ecosystems from '../layouts/Ecosystems/Ecosystems'
import Organizations from '../layouts/Organizations/Organizations'
import eula from '../views/LoginForm/Eula/eula'
import UserProfile from '../views/UserProfile/UserProfile'

const indexRoutes = [
	{ path: '/ecosystems', name: 'Ecosystem', component: Dashboard },
	{ path: '/', name: 'Home', component: Ecosystems },
	{ path: '/auth/customers', name: 'Organizations', component: Organizations },
	{ path: '/auth/eula', name: 'EULA', component: eula },
	{ path: '/auth/profile', name: 'Profile', component: UserProfile }
]

export default indexRoutes
