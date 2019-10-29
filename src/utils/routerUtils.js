import React from 'react'
import { Route } from 'react-router-dom';
import RouterGuard from '../components/RouterGuard'

const generateFlatRoutes = (routes) => {
  let flatRoutes = []
  routes.map(item => {
    if (item.children) {
      flatRoutes = flatRoutes.concat(generateFlatRoutes(item.children))
    } else {
      flatRoutes.push(item)
    }
    return item
  })
  return flatRoutes.flat()
}

const renderRoutesMap = (r) => {
  if (!(r instanceof Array) || !r.length) {
    return null
  }
  return r.map((item, index) => {
    item.meta = item.meta || {}
    const { exact } = item.meta
    // console.log(item.path)
    return (<Route key={item.path} path={item.path} exact={!!exact} render={props => {
      return <RouterGuard {...props} routes={item}></RouterGuard>
    }} />)
  })
}

export {
  generateFlatRoutes,
  renderRoutesMap
}