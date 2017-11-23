import * as types from './types'

// Esses métodos sao passados como props para componentes
export function increment(){
    return {
        type : types.INCREMENT_COUNT,
        payload : 1
    }
}

export function changeScreen(screenName,params){
    console.log('Switching to',screenName,params)
    return {
        type : types.NAVIGATE,
        routeName: screenName,
        params : params
    }
}
