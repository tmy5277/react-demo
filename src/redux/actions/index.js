import * as types from '../action-types'

let nextTodoId = 0

export const addTodo = text => ({
	type: 'ADD_TODO',
	id: nextTodoId++,
	text
})

export const toggleTodo = id => ({
	type: 'TOGGLE_TODO',
	id
})

export const userLogin = item => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let { account, password } = item
      item.isLogin = account === 'mingyu.tan@yff.com' && password === '123456pb'
      resolve()
    }, 1000)
  }).then(res => {
    dispatch({
      type: types.USER_LOGIN,
      item
    })
  }).catch(err => {
    console.log(err)
  })
}