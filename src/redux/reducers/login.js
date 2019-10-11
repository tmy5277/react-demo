import * as types from '../action_types'

const login = (state = { isLogin: false, account: '', pwd: '' }, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      let { account, pwd } = action.item
      let isLogin = account === 'mingyu.tan@yff.com' && pwd === '123456pb'
      return {
        ...state,
        isLogin,
        account,
        pwd
      }
    default:
      return state
  }
}

export default login