export const API_PATH = 'http://localhost:3002'

export const braveFetch = (endpoint, params) => {
  return fetch(API_PATH + endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
}
