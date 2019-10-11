import { combineReducers } from 'redux'
import todos from './reducers/todoList'
import login from './reducers/login'

export default combineReducers({
  todos,
  login
})