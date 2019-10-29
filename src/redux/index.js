import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import todos from './reducers/todoList'
import login from './reducers/login'
import menu from './reducers/menu'

const reduxMiddleware = [ thunk ];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const Store = createStore(combineReducers({
  todos,
  login,
  menu
}), composeEnhancers(applyMiddleware(...reduxMiddleware)));

export default Store