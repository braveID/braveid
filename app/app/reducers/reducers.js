import * as types from '../actions/types'
import { NavigationActions, StackNavigator } from 'react-navigation'
import { AppNavigator, initialState } from '../store';

export function count(state = initialState, action){
    switch(action.type){
        case types.INCREMENT_COUNT:
            return state += 1
        default:
            return state
    }
}

export function navigation(state = initialState, action){
    switch(action.type){
        case types.NAVIGATE:
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: action.routeName }),state)

        case types.NAVIGATE_BACK:
            return AppNavigator.router.getStateForAction(NavigationActions.back(),state)
        default:
            return state
    }
}