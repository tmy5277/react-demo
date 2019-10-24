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
  },
  obj2query: function (obj) {
    var result = '';
    var item;
    for (item in obj) {
      result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }
    if (result) {
      result = result.slice(1);
    }
    return result;
  }
}

export default urlHandler