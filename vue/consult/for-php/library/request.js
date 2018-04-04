import Vue from 'vue';
import VueResorce from 'vue-resource';

Vue.use(VueResorce);

// 允许跨域 cookie
Vue.http.options.xhr = { withCredentials: true };

import { jws } from 'jsrsasign';

/**
 * 处理响应头
 *
 * @param response
 */
let resolveResponse = function (response) {

  if ([404, 500].indexOf(response.status) !== -1) {
    this.weLoadEnd();
    this.weNotify(response.status + ' 服务端繁忙请稍后再试!');
    return;
  }

  let contentType = response.headers.map['Content-Type'] ? response.headers.map['Content-Type'][0]: response.headers.map['content-type'][0];

  if (contentType != 'application/json' && response.url != zzhJs.helpers.routeParser('api.refresh_jwt')
  ) {
    this.weLoadEnd();
    response.body = {
      status: 99999,
      message: 'Url:"'+ response.url+ '" 响应错误: 非 json 类型!'
    };
    return;
  }

  if (contentType == 'application/json' && !response.body) {
    this.weLoadEnd();
    this.weNotify(response.status + ' 服务端繁忙请稍后再试!');
    return;
  }

  if (
    contentType == 'application/json'
    && response.body.status == 401
  ) {
    this.weLoadEnd();
    alert('您的登陆已经过期,请重新授权!');

    window.location.replace(zzhJs.helpers.routeParser(
      'wechat.authorize', { reffer: window.location.toString() }
    ));
  }
};

/**
 * 处理请求
 *
 * @param request
 * @param next
 * @returns {*}
 */
let resolveRequest = function(request, next) {

  request.credentials = true;

  // 跳过 Refresh JWT
  if(request.url === zzhJs.helpers.routeParser('api.refresh_jwt')){
    return next();
  }

  let isPause = false;

  // 自动发送 CSRF Token
  var $metaCsrfToken = $('meta[name="csrf-token"]');
  if($metaCsrfToken.attr('content')){
    // modify headers
    request.headers.set('X-CSRF-TOKEN', $metaCsrfToken.attr('content'));
  }

  // 自动发送 Bearer Token
  if (!window.bearerToken) {
    return next(resolveResponse);
  }

  let JWTToken = window.bearerToken.replace("Bearer ", '');

  // 验证 Token 是否失效
  let JWTObj = jws.JWS.parse(JWTToken)
  if(!JWTObj){ next(resolveResponse); }

  JWTObj.payloadObj.exp;

  // 提早半小时刷新
  if (parseInt(JWTObj.payloadObj.exp) > Date.parse(new Date()) / 1000 + 1800) {
    request.headers.set('Authorization', 'Bearer '+ window.bearerToken);
    return next(resolveResponse);
  }

  isPause = true;
  // 更新 Bearer Token
  Vue.http.get(zzhJs.helpers.routeParser('api.refresh_jwt'), {
    headers: { Authorization: window.bearerToken },
    responseType: 'text',
    emulateJSON: false,
  }).then(function (res) {
    window.bearerToken = res.headers.map['Authorization'][0];
    request.headers.set('Authorization', 'Bearer '+ window.bearerToken);

    isPause && next(resolveResponse);
  });

};

Vue.http.interceptors.push(resolveRequest);