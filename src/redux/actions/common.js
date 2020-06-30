import React from 'react'
import ReactDOM from 'react-dom';

import * as types from '../action-types'
// import { findFundsApi } from '../../config/api'
import { _utils } from '../../utils'
import moment from 'moment'

export const asyncFetch = (url, params) => (dispatch, getState) => {
  console.log('fetch start')
  return window.$http.post(url, params).then(res => {
    console.log('fetch end')
    dispatch({
      type: types.ASYNC_FETCH
    })
    return Promise.resolve(res)
  }).catch(err => {
    console.log(err)
    return Promise.resolve(false)
  })
}

// export const findFunds = query => (dispatch, getState) => {
//   return window.$http.get(findFundsApi, {
//     params: query,
//     headers: {
//       'X-Channel': 100
//     }
//   }).then(res => {
//     return Promise.resolve(res)
//   }).catch(err => {
//     return Promise.reject(err)
//   })
// }

/**
 * 获取路由参数query并传递给TableFilter筛选组件
 * 筛选组件从filterOptions获取数据，因为受路由参数控制，要做成受控组件，所以通过filterOptions -> value传值，修改数据要相应改动value
 * 
 * checkbox等 直接反馈 的类型通过props即可获取新值
 * 搜索等 自身维护state，同时存在filterOptions传值 的类型则采取在getDerivedStateFromProps中
 * 根据 props -> filterOptions -> value 修改初始state，达到路由参数初始化的效果
 * 因为state和props都能影响筛选值，所以在filterOptions中添加initialize字段标识是来自筛选参数变化（路由/props）的修改还是组件操作(组件内部state)的修改
 * 
 * initialize === true => props, initialize === false => state
 * 
 * 前者主要情况是路由参数变动，在此函数中将新的路由参数赋值给value，且initialize = true
 * 后者则是手动操作组件触发，用组件内部事件处理即可，同时在事件处理中initialize = false，以免被props的传值覆盖
 * 
 * 需要注意的是，采用了在筛选组件中直接修改父组件filterOptions的initialize -- 也就是在子组件中修改了父组件的state
 * 因为filterOptions是对象数组，所以直接修改也没有报错，但正常的应该是通过回调函数修改initialize
 * 
 * @param {*} location 路由对象
 * @param {*} [options={}] 筛选配置及各字段映射
 * @param {*} [handler={}] 自定义处理器对象 - 字段映射处理(queryMapping)、指定筛选器类型处理(xxxxxxHandler)、时间范围后缀处理(timeRangeKey)
 */
export const formatQueryAndFilterOptions = (location, options = {}, handler = {}) => (dispatch, getState) => {
  if (!location || !options) {
    console.log('params missing')
    return {}
  }
  let { filterOptions } = options
  if (!filterOptions) return {}
  let { queryMapping, checkboxHandler, searchHandler, radioHandler, timeRangeKey } = handler
  let initQuery = _utils.getUrlObj(location.search)
  if (queryMapping) {
    Object.keys(queryMapping).map(key => {
      if (initQuery[key] && !initQuery[queryMapping[key]]) {
        initQuery[queryMapping[key]] = initQuery[key]
        delete initQuery[key]
      }
      return key
    })
  }
  let initQueryKey = Object.keys(initQuery)
  console.log('debug initQuery', initQuery)
  filterOptions.map(item => {
    item.props = item.props || {}
    switch (item.type) {
      case 'checkbox-group':
        if (checkboxHandler && checkboxHandler instanceof Function) {
          checkboxHandler(item, initQuery)
        } else {
          item.props.value = initQuery[item.key] ? initQuery[item.key].split(',').map(val => +val) : []
        }
        break
      case 'search':
      case 'time-range':
        if (searchHandler && searchHandler instanceof Function) {
          searchHandler(item, initQuery)
        } else {
          let { target_search = [], target_dateType = [] } = options
          let isDate = item.type === 'time-range'
          let typeOpt = (isDate ? target_dateType : target_search) || []
          let searchKey = ''
          let subSearchKey = ''
          let dateRangeKey = ['from', 'to']
          if (timeRangeKey && timeRangeKey instanceof Array) {
            dateRangeKey = timeRangeKey
          }
          let typeValue = typeOpt.findIndex(item => {
            searchKey = isDate ? `${item.value}${dateRangeKey[0]}` : item.value
            subSearchKey = isDate ? `${item.value}${dateRangeKey[1]}` : ''
            return initQueryKey.includes(searchKey) && initQuery[searchKey]
          })
          let typeDefaultValue = typeValue < 0 ? 0 : typeValue
          item.selectValue = typeDefaultValue
          console.log('debug searchKey', searchKey)
          console.log('debug typeDefaultValue', typeDefaultValue)

          if (isDate) {
            let initValue = (initQuery[searchKey] && initQuery[subSearchKey]) ?
              [moment(initQuery[searchKey]), moment(initQuery[subSearchKey])] : []
            // console.log('debug initValue', initValue)
            item.datePickValue = initValue
          } else {
            item.value = initQuery[searchKey] ? initQuery[searchKey] : ""
            item.initialize = true
          }
        }
        break
      case 'radio':
        if (radioHandler && radioHandler instanceof Function) {
          radioHandler(item, initQuery)
        } else {
          let typeOpt = options[`target_${item.key}`]
          let searchTypeDefaultValue = typeOpt.findIndex(opt => initQueryKey.includes(item.key) && initQuery[item.key] === opt.value.status)
          searchTypeDefaultValue = searchTypeDefaultValue < 0 ? 0 : searchTypeDefaultValue
          item.props.value = searchTypeDefaultValue
        }
        break
      case 'slider-range':
        if (handler.sliderHandler && handler.sliderHandler instanceof Function) {
          handler.sliderHandler(item, initQuery)
        } else {
          let { target_slider = [] } = options
          item.selectprops = item.selectprops || {}

          let typeOpt = target_slider || []
          let searchKey = ''
          let subSearchKey = ''
          let typeValue = typeOpt.findIndex(opt => {
            searchKey = `${opt.key}ValueFrom`
            subSearchKey = `${opt.key}ValueTo`
            let juggment = (initQueryKey.includes(searchKey) && initQuery[searchKey]) ||
              (initQueryKey.includes(subSearchKey) && initQuery[subSearchKey])
            return juggment
          })
          // console.log('debug typeValue', typeValue)
          let typeDefaultValue = typeValue < 0 ? 0 : typeValue
          item.selectValue = typeOpt[typeDefaultValue].key
          console.log('debug searchKey', searchKey)
          console.log('debug typeDefaultValue', typeDefaultValue)

          let currectOptions = target_slider[typeDefaultValue].options
          let startVal = currectOptions.findIndex(opt => (opt.value + '') === initQuery[searchKey])
          let endVal = currectOptions.findIndex(opt => (opt.value + '') === initQuery[subSearchKey])
          startVal = startVal < 0 ? 0 : startVal
          endVal = endVal < 0 ? 0 : endVal
          item.value = [startVal, endVal]
          // 当路由参数改变，触发赋值
          item.initialize = true
        }
        break;
      default:
        break
    }
    return item
  })
  return {
    initQuery,
    filterOptions
  }
}

// listHOC
export const withListTableCommonHOC = function (WrappedComponent, componentOptions) {
  let unListenFn = null
  return class extends WrappedComponent {
    // 通用生命周期
    componentDidMount() {
      if (super.componentDidMount) {
        return super.componentDidMount()
      }
      console.log(this.displayName || "unnamed", '- componentDidMount from HOC')
      this.getTableHeight()
      this.initStateFromQuery(this.props.location, this.fetchData)
      unListenFn = this.props.history.listen(location => {
        console.log('debug instruction history listen location', location)
        this.initStateFromQuery(location, this.fetchData)
      })
    }
    componentWillUnmount() {
      if (super.componentWillUnmount) {
        return super.componentWillUnmount()
      }
      console.log(this.displayName || "unnamed", '- componentWillUnmount from HOC')
      if (unListenFn && unListenFn instanceof Function) {
        unListenFn()
      }
      this.setState = (state, callback) => {
        return
      }
    }
    // query 触发 history
    handleQueryChange() {
      let { query } = this.state
      // console.log('debug query', query)
      let { history, location } = this.props
      let filterQuery = _utils.objectFilter(query, (val, key) => !(['count'].includes(key)))
      // console.log('debug filterQuery', filterQuery)
      history.push({
        pathname: location.pathname,
        search: _utils.obj2query(filterQuery)
      })
    }

    // table common
    //动态计算表格高度
    getTableHeight = () => {
      let cardDom = ReactDOM.findDOMNode(this.getWrappedRef())
      if (cardDom) {
        let style = window.getComputedStyle(cardDom)
        let height = style.height
        console.log('debug height', height)
        // manual get blank height in page - from top to buttom, calc include padding
        let { manualCalcBlank } = componentOptions
        console.log('debug manualCalcBlank', manualCalcBlank)
        if (this.state.tableHeight !== `calc(100vh - ${manualCalcBlank}px - 44px - ${height})`) {
          this.setState({
            tableHeight: `calc(100vh - ${manualCalcBlank}px - 44px - ${height})`
          })
        }
      }
    }
    // 翻页
    handlePageChange = e => {
      this.setState({
        query: {
          ...this.state.query,
          pageVal: e,
          start: (e - 1) * this.state.query.count
        }
      }, () => {
        this.handleQueryChange()
      })
    }
    // 勾选
    handleRowSelectChange = selectedRowKeys => {
      console.log('debug selectedRowKeys', selectedRowKeys)
      this.setState({
        selectedRowKeys
      })
    }
    // 行点击
    handleClickRow = (e, record, key = 'id') => {
      e.persist()
      console.log('debug e.target.matches', e.target.matches)
      if (e.target && e.target.matches && (e.target.matches("a") || e.target.matches("button")))
        return
      this.props.history.push(this.getJumpPathname(record[key]))
    }
    render() {
      return (
        <>
          {
            super.render()
          }
        </>
      )
    }
  }
}

export const conditionHandler = (condition = [], data = {}) => {
  if (!condition || !condition.length) {
    return true
  }
  function _evil(fn) {
    var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
  }
  return condition.every(item => {
    if (item.operate === '=') {
      return data[item.key] === item.value
    } else {
      let result = _evil(`${data[item.key]} ${item.operate} ${item.value}`)
      // console.log('debug conditionHandler result', result)
      return result
    }
  })
}

export const errorCodeHandler = (code = '', data = {}, replaceData = {}) => (dispatch, getState) => {
  let { errorCodeMap } = getState().common
  let currentError = errorCodeMap[code]
  if (currentError) {
    let currentErrorObject = {}
    Object.keys(currentError).map(key => {
      currentErrorObject[key] = {
        value: data[key],
        errors: currentError[key].map(msg => {
          let errorMsg = msg
          let replaceKey = msg.match(/\{(.+?)\}/gi)
          console.log('debug replaceKey', replaceKey)
          if (replaceKey && replaceKey instanceof Array) {
            replaceKey.map(key => {
              let dataKey = key.replace(/[{}]/g, '')
              errorMsg = errorMsg.replace(key, replaceData[dataKey] || '')
              return key
            })
          }
          // console.log('debug errorMsg', errorMsg)
          return new Error(errorMsg)
        })
      }
      return key
    })
    return currentErrorObject
  } else {
    return null
  }
}

// export const checkAuth = modules => (dispatch, getState) => {
//   return window.$http.post(routeCheck, {
//     modules
//   }).then(res => {
//     return Promise.resolve(res)
//   }).catch(err => {
//     console.log(err)
//     return Promise.resolve(false)
//   })
// }