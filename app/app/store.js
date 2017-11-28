import React from 'react'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Text } from 'react-native'
import {
  persistCombineReducers,
  persistStore,
  persistReducer
} from "redux-persist";
import storage from "redux-persist/es/storage";

import { PersistGate } from "redux-persist/es/integration/react";

import routes from './routes'
import Reducers from './reducers'
import { Provider,connect } from 'react-redux';

const loggerMiddleware = createLogger({ predicate : (getState,action) => __DEV__})    

export const AppNavigator = StackNavigator(routes)

export const initialState = {
    count : 0,
    navigation : AppNavigator.router.getStateForAction(
        AppNavigator.router.getActionForPathAndParams('Home')
    ),
}

const config = {
  key: 'root',
  blacklist : ['navigation'],
  storage,
}

const combinedReducers = persistCombineReducers(config,Reducers)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunkMiddleware,loggerMiddleware)


function configureStore() {
  let store = createStore(combinedReducers,initialState,composeEnhancers(middleware))
  let persistor = persistStore(store)
  return { persistor, store }
}

const { store, persistor } = configureStore()
@connect(state => ({
    nav : state.navigation
}))
class AppWithNavigation extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
      return (
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <AppNavigator
            navigation={addNavigationHelpers({
              dispatch : this.props.dispatch,
              state : this.props.nav
            })
            }
          />
        </PersistGate>

      )
    }
}

export default function App(){
    return (
      <Provider store={store}>
        <AppWithNavigation/>
        {/* <AppNavigator></AppNavigator> */}
      </Provider>
    )
  } 
