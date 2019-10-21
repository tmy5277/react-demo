import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import todos from './reducers/todoList'
import login from './reducers/login'
import menu from './reducers/menu'

const reduxMiddleware = [ thunk ];
const Store = createStore(combineReducers({
  todos,
  login,
  menu
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...reduxMiddleware));

export default Store