const Base64 = require('js-base64').Base64;

/**
 * 自动解析 location 信息
 */
window.location.query = {};

if (window.location.search) {
  let params = window.location.search.replace(/^\?/, '');
  params = params.split('&');
  let query = {};

  for (let i in params) {
    let [ index, value ] = params[i].split('=');
    query[index] = value;
  }

  window.location.query = query;
}

/**
 * 路由解析
 *
 * @param name
 * @param params
 * @returns {*}
 */
function routeParser(name, params) {

  params = typeof params !== 'object' ? {} : params;

  // 用来存放匹配不到的参数，也就是想要放在？号后面的参数
  let endParams = [];

  // Channel 支持
  if (window.apiRoutes[name + '.'+ zzhJs.env.channel]) {
    name = name + '.'+ zzhJs.env.channel;
  }

  let url = window.apiRoutes[name];

  if (window.apiRoutes[name] === undefined) {
    throw new Error('zzhJs.helpers.routeParser: route is not found "' + name + '"');
  }

  let placeholders = url.match(/(\{(.*?)\})/g); // 匹配到的占位符

  if (placeholders) {
    if (placeholders.indexOf('WECHAT_CHANNEL') !== false) {
      params['WECHAT_CHANNEL'] = window.WECHAT_CHANNEL;
    }

    for (let i = 0; i < placeholders.length; i++) {

      var item = placeholders[i],
        isNecessary = !/\?\}$/.test(item);

      var paramName = item.replace(/^\{/, '').replace(/\??}$/, '');

      // 当所得到的参数是必须的时候并且没有传参数的时候抛出异常
      if (isNecessary && !params.hasOwnProperty(paramName))
        throw new Error('zzhJs.helpers.routeParser: param"' + paramName + '" is necessary');


      var replace = params[paramName]? params[paramName]: '';

      url = url.replace(item, replace);

      delete  params[paramName];
    }
  }

  var proto = url.slice(0, url.indexOf('://')+ 3),
    domainAndPath = url.slice(url.indexOf('://')+ 3);

  url = proto+ domainAndPath.replace(/\/{2,}/g, '/').replace(/\/$/, '');

  var query = [];

  for(var paramName in params){
    query.push(`${paramName}=${params[paramName]}`);
  }

  url = query.length? url+ '?': url;
  url+= query.join('&');

  return url;
}

/**
 * 根据 维度数量计算字体大小
 *
 * @param dimensionSize
 * @returns {number}
 */
function calculateFontSize (dimensionSize) {

  // 小于四个，字体为0.28，等于九个时，字体为0.12，从4--9，每增加一个，字体增大0.03
  let fontSzie = 0.28;

  if (dimensionSize > 4 && dimensionSize < 9) {
    fontSzie = 0.32 - (dimensionSize - 3) * 0.05 ;
  }else if(dimensionSize >= 9){
    fontSzie = 0.14
  }

  return fontSzie;
}

/**
 * 使用 code 换 token
 *
 * @param cb
 * @returns {*}
 */
function transformCodeToToken(cb) {
  if (window.location.query['code']) { // url上有code
    if(Vue.cookie.get('session_code') == window.location.query['code']) { // 若cookie里有存的code，则判断url上附带的code与cookie里的code一致不
      return cb();
    }
  } else if (Vue.cookie.get('session_token')) {
    return  cb();
  } else if (!window.location.query['code']) {
    return cb();
  }

  let vthis = this;
  // 存储code
  Vue.cookie.clear('session_code');
  Vue.cookie.set('session_code', location.query.code, {expires: '1M', domain: location.host.replace(/\w+\./, '')});

  // 传输可能的 code 到后端换取 token

  Vue.http.post(zzhJs.config.apiDomain+ '/zzhedu/wx/web/change_token.action', {
    state: window.location.query['state'],
    code: location.query.code
  })
    .then(function (res) {
      let response = res.body;

      Vue.cookie.clear('session_token');
      Vue.cookie.set('session_token', response.data.token, {expires: '1M', domain: location.host.replace(/\w+\./, '')});

      // 跳转去除 code
      // let query = _.clone(location.query);
      // delete query['code'];
      //
      // let search = '';
      // for (let name in query) {
      //   search+= (`${name}=${query[name]}`);
      // }

      // let href = `${window.location.origin}//${window.location.pathname}?${search}${window.location.hash}`;
      // window.location = href;

      cb();
    }).catch(function (e) {

  });
}

/**
 *
 */
function getAuthRedirectUri() {
  let toWechat = zzhJs.config.urlIndexPage+ '?redirect_uri='+ Base64.encode(encodeURI(window.location.href));
  return zzhJs.config.apiDomain+ '/zzhedu/web/oauth/index.action?redirect_uri='+ Base64.encode(encodeURI(toWechat))
}

window.zzhJs = _.assign({}, window.zzhJs, {helpers: {routeParser, calculateFontSize, transformCodeToToken, getAuthRedirectUri}});

if (window.Vue) {
  window.Vue.prototype.zzhJs = window.zzhJs;
}