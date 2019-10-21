import React from 'react'

// function generateFlatRoutes(routes) {
//   let flatRoutes = []
//   routes.map(item => {
//     if (item.children) {
//       flatRoutes = flatRoutes.concat(generateFlatRoutes(item.children))
//     } else {
//       flatRoutes.push(item)
//     }
//     return item
//   })
//   return flatRoutes.flat()
// }

// 一级路由
const routesMap = [
  {
    path: '/login',
    component: React.lazy(() => import('../pages/Login/index')),
    meta: {
      name: '登录',
      exact: true
    }
  },
  {
    path: '/home',
    component: React.lazy(() => import('../pages/Home/index')),
    meta: {
      name: '首页',
      auth: true
    }
  },
  {
    path: '/testDemo',
    component: React.lazy(() => import('../pages/TestDemo/index')),
    meta: {
      name: 'Demo',
      auth: true
    }
  }
]

export default routesMap