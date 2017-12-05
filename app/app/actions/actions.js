import * as types from './types'
import {API_PATH, braveFetch } from '../helpers/api'

// Esses métodos sao passados como props para componentes
export function increment () {
  return {
    type: types.INCREMENT_COUNT,
    payload: 1
  }
}

export const fetchProfile = (id,isSelf) => async dispatch => {
  dispatch({ type: 'REQUESTED_PROFILE', id : id })
  console.log('Fetched profile for user id:',id)
  try {
    let res = await fetch(`${API_PATH}/users/${id}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    console.log(res)
    res = await res.json()
    console.log(res)

    if (res.ok) {
      if (isSelf) {
        dispatch({
          type: 'FETCHED_OWN_PROFILE',
          profile: res.response
        })
      } else {
        dispatch({
          type: 'FETCHED_PROFILE',
          profile: res.response
        })
      }
    }
    console.log('OPA, USUÁRIO NÃO FOI ENCONTRADO', id, isSelf);
    
  } catch (error) {
    console.log(error)
  }
}

export function navigate (screenName, params) {
  console.log('Switching to', screenName, params)
  return {
    type: types.NAVIGATE,
    routeName: screenName,
    params: params
  }
}

export function setUser (userObj) {
  return {
    type: types.SET_USER,
    user: userObj
  }
}

export function logout () {
  return {
    type: types.LOGOUT
  }
}

export const login = (userData) => async dispatch => {
  dispatch({ type: 'LOGGING_IN' })  
  dispatch(setUser(userData))
  dispatch ({
    type: types.NAVIGATE,
    routeName: 'Profile',
    params: {...userData,isSelf : true}
  })
}

export const signUp = (fbData) => async dispatch => {
  dispatch({ type: 'SIGNING_UP' })  
  try {
    let res = await braveFetch('/users/signup', {
      facebook_id: fbData.id,
      username: fbData.name.toLowerCase().replace(/\s/g, ''),
      real_name: fbData.name,
      profile_pic_url: fbData.photoURL
    })
    
    res = await res.json()
    console.log('SIGNUP RESULT',res)
    dispatch(login(res.response)) 
  } catch (error) {
    console.log(error)
  }
}

export const onFacebookLogin = (fbData) => async dispatch => {
  dispatch({ type : 'CHECKING_FACEBOOK_ID' })
  try {
    let res = await braveFetch('/users/searchID', {
      facebook_id: fbData.id
    })
    res = await res.json()

    if (!res.ok) {
      // Usuário ainda não está registrado, precisa criar usuário
      dispatch(signUp(fbData))
    } else if (res.ok) {
      // Usuário ja esta registrado, redireciona para o perfil
      dispatch(login(res.response))
    }

  } catch(error) {
    console.log(error)
  }
}

export function showResults (users) {
  return {
    type: types.OBTAINED_USERS,
    users: [...users]
  }
}

export const searchUsers = (username) => async dispatch => {
  dispatch({type: types.SEARCH_USERS})
  let users = []

  try {
    let res = await fetch(`${API_PATH}/users/searchUsername`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
    res = await res.json()
    users = res.response || []
  } catch (error) {
    console.log(error)
  }
  dispatch(showResults(users))
}

 