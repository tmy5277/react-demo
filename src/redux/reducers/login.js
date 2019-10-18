import * as types from '../action-types'

const defaultState = {
  isLogin: true,
  account: '',
  password: ''
}

const login = (state = defaultState, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      // console.log(action.item)
      if (action.item.isLogin) {
        sessionStorage.setItem('UID', action.item.account)
      }
      return {
        ...state,
        ...action.item
      }
    case types.CHECK_LOGIN:
      let account = sessionStorage.getItem('UID')
      return {
        ...state,
        account,
        isLogin: !!account
      }
    default:
      return state
  }
}

export default login