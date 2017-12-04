import * as types from './types'
import API_PATH from '../helpers/api'

// Esses métodos sao passados como props para componentes
export function increment () {
  return {
    type: types.INCREMENT_COUNT,
    payload: 1
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

export function login () {
  return {
    type: types.LOGIN
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
