import * as types from './types'

// Esses métodos sao passados como props para componentes
export function increment(){
    return {
        type : types.INCREMENT_COUNT,
        payload : 1
    }
}

export function navigate(screenName,params){
    console.log('Switching to',screenName,params)
    return {
        type : types.NAVIGATE,
        routeName: screenName,
        params : params
    }
}

export function setUser(userObj){
    return {
        type : types.SET_USER,
        user : userObj
    }
}

export function logout(){
    return {
        type : types.LOGOUT
    }
}

export function login(){
    return {
        type : types.LOGIN
    }
}