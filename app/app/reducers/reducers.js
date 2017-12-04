import * as types from '../actions/types'
import { NavigationActions, StackNavigator } from 'react-navigation'
import { AppNavigator, initialState } from '../store';

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
        
        case types.SET_NAVIGATION_PARAMS:
            console.log('ACTION',state,action)
            let newState = AppNavigator.router.getStateForAction(
                NavigationActions.setParams({
                    params: action.params,
                    key : action.key,
                }),state
            )
            console.log(newState)
            return newState

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

export function currentProfile(state = initialState, action){
    switch (action.type) {
        case 'SWITCH_PROFILE':
            return action.newProfile
            
        default:
            return state;
    }
};


export const userSearchResults = (state = initialState, action) => {
    switch (action.type) {
        case 'OBTAINED_USERS': 
            return action.users 
        default:
            return state;
    }
}

