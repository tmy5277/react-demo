import * as types from '../action-types'
import routesMap from '../../router/routeMap'

let topBarArr = routesMap.filter(item => item.path !== '/login').map(item => ({ path: item.path, name: item.meta.name }))
let mainEntranceArr = [
  {
    path: '/user',
    name: '用户管理',
    meta: {
      disabled: false,
      isShow: true
    },
    children: [
      {
        path: '/user/1',
        name: '用户管理1',
        meta: {
          disabled: false,
          isShow: true
        }
      },
      {
        path: '/user/2',
        name: '用户管理2',
        meta: {
          disabled: false,
          isShow: true
        }
      },
      {
        path: '/user/3',
        name: '用户管理3',
        meta: {
          disabled: false,
          isShow: true
        }
      }
    ]
  },
  {
    path: '/order',
    name: '订单管理',
    meta: {
      disabled: false,
      isShow: true
    },
    children: [
      {
        path: '/order/1',
        name: '订单管理1',
        meta: {
          disabled: false,
          isShow: true
        }
      },
      {
        path: '/order/2',
        name: '订单管理2',
        meta: {
          disabled: false,
          isShow: true
        }
      },
      {
        path: '/order/3',
        name: '订单管理3',
        meta: {
          disabled: false,
          isShow: true
        }
      },
      {
        path: '/order/4',
        name: '订单管理4',
        meta: {
          disabled: false,
          isShow: true
        }
      }
    ]
  },
  {
    path: '/data',
    name: '数据信息管理',
    meta: {
      disabled: false,
      isShow: true
    },
    children: [
      {
        path: '/data/1',
        name: '数据信息管理1',
        meta: {
          disabled: false,
          isShow: true
        }
      }
    ]
  },
  {
    path: '/permission',
    name: '权限管理',
    meta: {
      disabled: false,
      isShow: true
    },
    children: [
      {
        path: '/permission/1',
        name: '权限管理1',
        meta: {
          disabled: false,
          isShow: true
        }
      },
      {
        path: '/permission/2',
        name: '权限管理2',
        meta: {
          disabled: false,
          isShow: true
        }
      }
    ]
  },
]

const defaultState = {
  topBar: topBarArr,
  topBarIndex: 0,
  mainEntrance: mainEntranceArr
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