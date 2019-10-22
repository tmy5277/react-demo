import React from 'react'
import * as types from '../action-types'

let baseRoutes = [
  {
    path: '/login',
    component: React.lazy(() => import('../../pages/Login/index')),
    meta: {
      name: '登录',
      exact: true
    }
  },
  {
    path: '/home',
    component: React.lazy(() => import('../../pages/Home/index')),
    meta: {
      name: '首页',
      auth: true
    }
  },
  {
    path: '/testDemo',
    component: React.lazy(() => import('../../pages/TestDemo/index')),
    meta: {
      name: 'Demo',
      auth: true
    }
  }
]
let topBarArr = baseRoutes.filter(item => item.path !== '/login').map(item => ({ path: item.path, name: item.meta.name }))
let mainEntranceArr = [
  {
    path: '/user',
    component: React.lazy(() => import('../../pages/Home/index')),
    meta: {
      name: '用户管理',
      disabled: false,
      isShow: true,
      auth: true
    },
    children: [
      {
        path: '/user/1',
        component: React.lazy(() => import('../../pages/Home/index')),
        meta: {
          name: '用户管理1',
          disabled: false,
          isShow: true
        }
      },
      {
        path: '/user/2',
        component: React.lazy(() => import('../../pages/Home/index')),
        meta: {
          name: '用户管理2',
          disabled: false,
          isShow: true
        }
      },
    ]
  },
  {
    path: '/order',
    component: React.lazy(() => import('../../pages/Home/index')),
    meta: {
      name: '订单管理',
      disabled: false,
      isShow: true,
      auth: true
    },
    children: [
      {
        path: '/order/1',
        component: React.lazy(() => import('../../pages/Home/index')),
        meta: {
          name: '订单管理1',
          disabled: false,
          isShow: true
        }
      },
      {
        path: '/order/2',
        component: React.lazy(() => import('../../pages/Home/index')),
        meta: {
          name: '订单管理2',
          disabled: false,
          isShow: true
        }
      }
    ]
  },
  {
    path: '/data',
    component: React.lazy(() => import('../../pages/Home/index')),
    meta: {
      name: '数据信息管理',
      disabled: false,
      isShow: true,
      auth: true
    },
    children: [
      {
        path: '/data/1',
        component: React.lazy(() => import('../../pages/Home/index')),
        meta: {
          name: '数据信息管理1',
          disabled: false,
          isShow: true
        }
      }
    ]
  },
  {
    path: '/permission',
    component: React.lazy(() => import('../../pages/Home/index')),
    meta: {
      name: '权限管理',
      disabled: false,
      isShow: true,
      auth: true,
      extra: true
    },
    children: [
      {
        path: '/permission/a',
        component: React.lazy(() => import('../../pages/Home/index')),
        meta: {
          name: '权限管理1',
          disabled: false,
          isShow: true
        }
      }
    ]
  },
]
let routesMap = baseRoutes.concat(mainEntranceArr)

const defaultState = {
  topBar: topBarArr,
  topBarIndex: 0,
  baseRoutes,
  mainEntrance: mainEntranceArr,
  routesMap,
}

const menu = (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_TOPBAR_INDEX:
      return {
        ...state,
        tabIndex: action.tabIndex
      }
    default:
      return state
  }
}

export default menu