import React from 'react'

function generateFlatRoutes(routes) {
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

function renderRoutesMap(routes) {
  
}

export {
  generateFlatRoutes
}