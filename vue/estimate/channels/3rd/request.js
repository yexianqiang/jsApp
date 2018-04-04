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
    && response.body.status == 504
  ) {
    this.weLoadEnd();
    alert('您的登陆已经过期,请重新授权!');
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
  next(resolveResponse);
};

Vue.http.interceptors.push(resolveRequest);