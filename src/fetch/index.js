import 'whatwg-fetch'
import { urlHandler } from '../utils/index'

let fetchData = (url, params = {}, options = {}) => {
  let defaultOptions = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Charset': 'utf-8'
    }
  }
  let fetchOptions = { ...defaultOptions, ...options }
  if (fetchOptions.method === 'get' || fetchOptions.method === 'GET') {
    let str = urlHandler.obj2query(params)
    url += str.length ? `?${str}` : ''
  } else {
    try {
      fetchOptions.body = JSON.stringify(params)
    } catch (e) {
      console.log(e)
      console.error('Params must be Object!')
    }
  }
  console.log(fetchOptions)
  return new Promise((resolve, reject) => {
    fetch(url, fetchOptions).then(response => {
      // 如果返回的状态为200，表示正常
      if (response.status === 200) {
        return response.json();
      } else {
        // 服务器端抛出的错误会在这里捕获
        // reject(response.statusText)
        console.log(response)
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const $http = {
  get: (url, params, options = {}) => {
    options.method = 'GET'
    return fetchData(url, params, options)
  },
  post: (url, params, options = {}) => {
    options.method = 'POST'
    console.log(url, params, options)
    return fetchData(url, params, options)
  },
  put: (url, params, options ={}) => {
    options.method = 'PUT'
    return fetchData(url, params, options)
  }
}

export default $http