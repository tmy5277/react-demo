import 'whatwg-fetch'
import axios from 'axios'
// import urlHandler from './urlHandler'

// fetch
// let fetchData = (url, params = {}, options = {}) => {
//   let defaultOptions = {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept-Charset': 'utf-8'
//     }
//   }
//   let fetchOptions = { ...defaultOptions, ...options }
//   if (fetchOptions.method === 'get' || fetchOptions.method === 'GET') {
//     let str = urlHandler.obj2query(params)
//     url += str.length ? `?${str}` : ''
//   } else {
//     try {
//       fetchOptions.body = JSON.stringify(params)
//     } catch (e) {
//       console.log(e)
//       console.error('Params must be Object!')
//     }
//   }
//   // console.log(fetchOptions)
//   return new Promise((resolve, reject) => {
//     fetch(url, fetchOptions).then(response => {
//       // 如果返回的状态为200，表示正常
//       if (response.status === 200) {
//         return response.json();
//       } else {
//         // 服务器端抛出的错误会在这里捕获
//         // reject(response.statusText)
//         console.log(response)
//       }
//     }).then(res => {
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }

// axios
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(config => {
  console.log(config)
  return config
}, err => {
  return err
})

// response拦截器
axios.interceptors.response.use(res => {
  // code handle todo
  return res
}, err => {
  let tmpArr = err.toString().split(' ')
  for (let i in tmpArr) {
    let iCode = Number(tmpArr[i])
    if (iCode) {
      console.log(iCode)
      // if (iCode === 401 || iCode === 500) {
      //   console.log(iCode)
      // } else if (iCode === 403) {
      //   console.log(iCode)
      // } else {
      //   console.log(iCode)
      // }
    }
  }
  return Promise.reject(err)
})

axios.defaults.withCredentials = true

// proxy
const $http = {
  // get: (url, params, options = {}) => {
  //   options.method = 'GET'
  //   return fetchData(url, params, options)
  // },
  // post: (url, params, options = {}) => {
  //   options.method = 'POST'
  //   return fetchData(url, params, options)
  // },
  // put: (url, params, options = {}) => {
  //   options.method = 'PUT'
  //   return fetchData(url, params, options)
  // }
  get(url, config = {}) {
    return axios.get(url, config).then((res) => {
      if (res && res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.resolve({ code: -1 })
      }
    }).catch((err) => {
      console.log(err)
      return Promise.reject(err)
    })
  },
  post(url, data, config = {}) {
    return axios.post(url, data, config).then((res) => {
      if (res && res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.resolve({ code: -1 })
      }
    }).catch((err) => {
      console.log(err)
      return Promise.reject(err)
    })
  },
  put(url, data, config = {}) {
    return axios.put(url, data, config).then((res) => {
      if (res && res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.resolve({ code: -1 })
      }
    }).catch((err) => {
      console.log(err)
      return Promise.reject(err)
    })
  }
}

export default $http