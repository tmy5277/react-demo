import React from 'react'
import * as types from '../action-types'

let baseRoutes = [
  {
    path: '/login',
    component: React.lazy(() => import('../../views/Login/index')),
    meta: {
      name: '登录',
      level: 0,
      exact: true
    }
  },
  {
    path: '/home',
    component: React.lazy(() => import('../../views/Home/index')),
    meta: {
      name: '首页',
      level: 0,
      auth: true
    }
  },
  {
    path: '/testDemo',
    component: React.lazy(() => import('../../views/TestDemo/index')),
    meta: {
      name: 'Demo',
      level: 0,
      auth: true
    }
  }
]
let mainEntranceArr = [
  {
    path: '/',
    component: React.lazy(() => import('../../views/MainContent/index')),
    meta: {
      name: '视图',
      level: 0,
      isShow: true,
      auth: true
    },
    children: [
      {
        path: '/user',
        component: React.lazy(() => import('../../views/Home/index')),
        meta: {
          name: '用户管理',
          level: 1,
          isShow: true,
          auth: true,
          icon: 'user'
        },
        children: [
          {
            path: '/user/1',
            component: React.lazy(() => import('../../components/Empty')),
            meta: {
              name: '用户管理1',
              level: 10,
              disabled: false,
              isShow: true
            }
          },
          {
            path: '/user/2',
            component: React.lazy(() => import('../../views/Home/index')),
            meta: {
              name: '用户管理2',
              level: 10,
              disabled: false,
              isShow: false
            }
          },
        ]
      },
      {
        path: '/order',
        component: React.lazy(() => import('../../views/Order/index')),
        meta: {
          name: '订单管理',
          level: 1,
          isShow: true,
          auth: true,
          icon: 'pie-chart'
        },
        children: [
          {
            path: '/order/1',
            component: React.lazy(() => import('../../views/Order/Order1/index')),
            meta: {
              name: '订单管理1',
              level: 10,
              disabled: false,
              isShow: true
            }
          },
          {
            path: '/order/2',
            component: React.lazy(() => import('../../views/Order/Order2/index')),
            meta: {
              name: '订单管理2',
              level: 10,
              disabled: false,
              isShow: true
            }
          }
        ]
      },
      {
        path: '/data',
        component: React.lazy(() => import('../../views/Home/index')),
        meta: {
          name: '数据信息管理',
          level: 1,
          isShow: true,
          auth: true,
          icon: 'database'
        },
        children: [
          {
            path: '/data/1',
            component: React.lazy(() => import('../../views/Home/index')),
            meta: {
              name: '数据信息管理1',
              level: 10,
              disabled: true,
              isShow: true
            }
          }
        ]
      },
      {
        path: '/permission',
        component: React.lazy(() => import('../../views/Home/index')),
        meta: {
          name: '权限管理',
          level: 1,
          isShow: true,
          auth: true,
          icon: "setting"
        },
        children: [
          {
            path: '/permission/a',
            component: React.lazy(() => import('../../views/TestDemo/index')),
            meta: {
              name: '权限管理1',
              level: 10,
              disabled: false,
              isShow: true
            }
          }
        ]
      },
    ]
  }
]
let routesMap = baseRoutes.concat(mainEntranceArr)

const defaultState = {
  topBarIndex: 0,
  baseRoutes,
  mainEntrance: mainEntranceArr,
  routesMap,
}

const menu = (state = defaultState, action) => {
  switch (action.type) {
    case types.ASYNC_FETCH:
      console.log(action, state)
      return {
        ...state
      }
    default:
      return state
  }
}

export default menu