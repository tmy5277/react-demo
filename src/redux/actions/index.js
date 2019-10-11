import * as action_types from '../action_types'

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

export const userLogin = item => ({
  type: action_types.USER_LOGIN,
  item
})