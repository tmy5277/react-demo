import React from 'react'

const Login = React.lazy(() => import('../pages/Login/Login'))
const TestDemo = React.lazy(() => import('../pages/TestDemo'))

const routesMap = [
  {
    path: '/',
    exact: true   //必须设置为true，否则默认匹配所有路由，但却没有指定组件
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/testDemo',
    component: TestDemo,
    auth: true
  }
]

export default routesMap 