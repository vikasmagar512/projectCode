import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

import rootSaga from './store/sagas/rootSaga'
import reducers from './reducers'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth', 'user']
}

const sagaMiddleware = createSagaMiddleware()

let middlewares = [thunk, sagaMiddleware]

if (process.env.NODE_ENV === `development`) {
	const logger = createLogger({
		duration: true,
		diff: true
	})
	middlewares.push(logger)
}

const asyncDispatchMiddleware = store => next => action => {
	let syncActivityFinished = false
	let actionQueue = []

	function flushQueue() {
		actionQueue.forEach(a => store.dispatch(a)) // flush queue
		actionQueue = []
	}

	function asyncDispatch(asyncAction) {
		actionQueue = actionQueue.concat([asyncAction])

		if (syncActivityFinished) {
			flushQueue()
		}
	}

	const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch })

	next(actionWithAsyncDispatch)
	syncActivityFinished = true
	flushQueue()
}

const persistedReducer = persistReducer(persistConfig, reducers)

const configureStore = (initialState = {}) => {
	const middleware = applyMiddleware(...middlewares, asyncDispatchMiddleware)
	const store = createStore(
		persistedReducer,
		initialState,
		composeWithDevTools(middleware)
	)
	const persistor = persistStore(store)
	return { store, persistor }
}

export default configureStore()
sagaMiddleware.run(rootSaga)
