import * as types from '../action-types'
import { message } from 'antd'

export const userLogin = item => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let { account, password } = item
      item.isLogin = account === 'cms.publisher' && password === '123456pb'
      resolve(item.isLogin)
    }, 1000)
  }).then(res => {
    res ? message.success('登录成功') : message.error('账号或密码错误')
    dispatch({
      type: types.USER_LOGIN,
      item
    })
  }).catch(err => {
    console.log(err)
  })
}

export const checkLogin = () => ({
  type: types.CHECK_LOGIN
})