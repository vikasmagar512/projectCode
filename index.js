/* eslint-disable no-extend-native */
import 'bootstrap/dist/css/bootstrap.min.css'
import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import './assets/css/animate.min.css'
import './assets/css/demo.css'
import './assets/css/pe-icon-7-stroke.css'
import './assets/css/icomoon.css'
import './assets/css/proximaNova.css'
import './assets/sass/light-bootstrap-dashboard.scss'
import configureStore from './store'

const { persistor, store } = configureStore

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUB_KEY}>
				<Elements>
					<App />
				</Elements>
			</StripeProvider>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
)

if (module.hot) {
	module.hot.accept('./App', () => {
		const NextApp = require('./App').default
		ReactDOM.render(<NextApp />, document.getElementById('root'))
	})
}
