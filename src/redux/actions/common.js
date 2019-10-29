import * as types from '../action-types'

export const asyncFetch = (url, params) => (dispatch, getState) => {
  console.log('fetch start')
  return window.$http.post(url, params).then(res => {
    console.log('fetch end')
    dispatch({
      type: types.ASYNC_FETCH
    })
  }).catch(err => {
    console.log(err)
  })
}

export const checkAuth = url => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}