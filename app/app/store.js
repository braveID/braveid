import React from 'react'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import { Text } from 'react-native'
import { ActionCreators } from './actions'

import { createStore, combineReducers, compose, applyMiddleware, bindActionCreators } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { persistCombineReducers, persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";

import { Provider,connect,MapDispatchToProps } from 'react-redux';
import storage from "redux-persist/es/storage";

import routes from './routes'
import Reducers from './reducers'

import types from './actions/types'
import { setUser, changeScreen, logout, navigate } from './actions/actions';

const loggerMiddleware = createLogger({ predicate : (getState,action) => __DEV__})    

export const AppNavigator = StackNavigator(routes)

const config = {
  key: 'root',
  blacklist : ['navigation','userSearchResults'],
  storage,
}

export const initialState = {
  navigation : AppNavigator.router.getStateForAction(
      AppNavigator.router.getActionForPathAndParams('Login')
  ),
  user : null,
  ownProfile : {},
  externalProfile : {},
  userSearchResults : [],
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
    nav : state.navigation,
    user : state.user
}))

class AppWithNavigation extends React.Component { 
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps){
      if (nextProps.user == null && this.props.user != null) {
        console.log('Logged off, switching to login screen')
      }
    }

    render() {
      return (
        <PersistGate 
          loading={<Text>Loading...</Text>}
          persistor={persistor}
          onBeforeLift={() => {
            if (this.props.user) {
              console.log('[Router] there is a user! switching to profile with params')
              this.props.dispatch(navigate('Profile',{...this.props.user , isSelf : true }))
            } else {
              console.log('[Router] There is no saved user id')
            }
          }}
        >
          <AppNavigator
            navigation={addNavigationHelpers({
              dispatch : this.props.dispatch,
              state : this.props.nav
            })}
          />
        </PersistGate>
      )
    }
}

export default function App(){
    return (
      <Provider store={store}>
        <AppWithNavigation />
      </Provider>
    )
  } 
