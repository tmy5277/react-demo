import * as types from '../action-types'

const todoList = (state = { todos: [] }, action) => {
  switch (action.type) {
    case types.ADD_TODO:
      let addTodos = state.todos.concat({
        id: action.id,
        text: action.text,
        completed: false
      })
      return {
        ...state,
        todos: addTodos
      }
    case types.TOGGLE_TODO:
      let count = state.count ? state.count + 1 : 1
      let todos = state.todos.map(
        todo => todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
      return {
        ...state,
        todos,
        count
      }
    default:
      return state
  }
}

export default todoList