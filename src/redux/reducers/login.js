import * as types from '../action-types'

const defaultState = {
  isLogin: false,
  account: '',
  password: ''
}

const login = (state = defaultState, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      // console.log(action.item)
      return {
        ...action.item
      }
    default:
      return state
  }
}

export default login