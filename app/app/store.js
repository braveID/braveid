import React from 'react'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import routes from './routes'
import Reducers from './reducers'
import { Provider,connect } from 'react-redux';

const loggerMiddleware = createLogger({ predicate : (getState,action) => __DEV__})    

export const AppNavigator = StackNavigator(routes)
export const initialState = {
    count : 0,
    navigation : AppNavigator.router.getStateForAction(
        AppNavigator.router.getActionForPathAndParams('Home')
    )
}

const combinedReducers = combineReducers(Reducers)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunkMiddleware,loggerMiddleware)
// (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store = createStore(combinedReducers,initialState,composeEnhancers(middleware))

@connect(state => ({
    nav : state.navigation
}))
class AppWithNavigation extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
      return (
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch : this.props.dispatch,
            state : this.props.nav
          })
          }
        />
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
