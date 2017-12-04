import * as types from '../actions/types'
import { NavigationActions, StackNavigator } from 'react-navigation'
import { AppNavigator, initialState } from '../store';

export function count(state = initialState, action) {
    // console.log('REDUCER',state)
    switch(action.type){
        case types.INCREMENT_COUNT:
            return state += 1
        default:
            return state
    }
}

export function navigation(state = initialState, action){
    // console.log('action',action)    
    switch(action.type){
        case types.NAVIGATE:
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName : action.routeName,
                    params : action.params
                }), state)

        case types.NAVIGATE_BACK:
            return AppNavigator.router.getStateForAction(NavigationActions.back(),state)

        case types.NAVIGATION_RESET:
            return AppNavigator.router.getStateForAction(NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Login' })
                ]
            }))
        
        case types.LOGOUT:
            return AppNavigator.router.getStateForAction(NavigationActions.reset({
                index: 0,
                actions: [
                NavigationActions.navigate({ routeName: 'Login' })
                ]
            }))

        default:
            return state
    }
}

export function user(state = initialState, action){
    switch(action.type){
        case types.SET_USER:
            return action.user

        case types.LOGOUT:
            return null
    
        default:
            return state
    }
}

