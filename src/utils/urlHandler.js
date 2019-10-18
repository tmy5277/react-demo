let urlHandler = {
  getUrlObj: function (search) {
    let urlObj = {}
    if (search.length) {
      let queryStr = search.indexOf('?') > -1 ? search.split('?')[1] : search
      let queryArr = queryStr.length ? queryStr.split('&') : []
      queryArr.map(item => {
        if (item.indexOf('=') > -1) {
          let tmpArr = item.split('=')
          urlObj[tmpArr[0]] = tmpArr[1]
        } else {
          urlObj[item] = ''
        }
        return item
      })
    }
    return urlObj
  }
}

export default urlHandler