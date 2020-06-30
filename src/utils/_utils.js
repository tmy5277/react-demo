let _utils = {}

_utils.objectFilter = function (obj, predicate) {
  var result = {}, key;

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }

  return result;
}

_utils.getUrlObj = function (encodeSearch) {
  let urlObj = {}
  let search = decodeURIComponent(encodeSearch)
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

_utils.obj2query = function (obj) {
  var result = '';
  var item;
  for (item in obj) {
    if (obj[item] !== undefined) {
      result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }
  }
  if (result) {
    result = result.slice(1);
  }
  return result;
}

/**
 * 去掉空格
 */
//去左空格;
_utils.ltrim = function (s) {
  if (s === undefined || s === null) {
    return s;
  }
  return s.replace(/(^\s*)/g, "");
}
//去右空格;
_utils.rtrim = function (s) {
  if (s === undefined || s === null) {
    return s;
  }
  return s.replace(/(\s*$)/g, "");
}
//去左右空格;
_utils.trim = function (s) {
  if (s === undefined || s === null) {
    return s;
  }
  return s.replace(/(^\s*)|(\s*$)/g, "");
}

_utils.getDevice = function () {
  let UserAgent = navigator.userAgent.toLowerCase();
  let browserMap = {
    IE: window.ActiveXObject || "ActiveXObject" in window, // IE
    Chrome: UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1, // Chrome浏览器
    Firefox: UserAgent.indexOf('firefox') > -1, // 火狐浏览器
    Opera: UserAgent.indexOf('opera') > -1, // Opera浏览器
    Safari: UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') === -1, // safari浏览器
    Edge: UserAgent.indexOf('edge') > -1, // Edge浏览器
    QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
    WeixinBrowser: /MicroMessenger/i.test(UserAgent) // 微信浏览器
  };
  let OSMap = {
    Windows: (navigator.platform === 'Win32') || (navigator.platform === 'Windows'),
    Mac: (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel'),
    iphone: UserAgent.indexOf('iPhone') > -1,
    ipod: UserAgent.indexOf('iPod') > -1,
    ipad: UserAgent.indexOf('iPad') > -1,
    Android: UserAgent.indexOf('Android') > -1
  }
  let returnData = {}
  for (let key in browserMap) {
    if (browserMap[key]) {
      returnData.browser = key;
    }
  }
  for (let key in OSMap) {
    if (OSMap[key]) {
      returnData.platform = key;
    }
  }
  returnData.lang = navigator.language;
  return returnData;
}


export default _utils