(function () {

  if (!Vue || !Vue.http) {
    return;
  }

  let VueComponent = window.Vue;

  // 允许跨域 cookie
  Vue.http.options.xhr = { withCredentials: true };

  const Base64 = require('js-base64').Base64;

  /**
   * 处理响应头
   *
   * @param response
   */
  let resolveResponse = function (response) {

    let vApp = window.vApp || this;

    if (response.status != 200) {
      vApp.weLoadEnd();
      vApp.weNotify(`[${response.status}]服务端繁忙请稍后再试!`);
      return;
    }

    let contentType = response.headers.map['Content-Type'] ? response.headers.map['Content-Type'][0]: response.headers.map['content-type'][0];
    // 响应类型非 Json
    if (contentType.indexOf('application/json') == -1) {
      vApp.weLoadEnd();
      vApp.weNotify('响应错误:非 application/json !');
      return;
    }

    // 响应为空
    if (!response.body) {
      vApp.weLoadEnd();
      vApp.weNotify(response.status + ' 服务端无响应请稍后再试!');
      return;
    }

    // 直接响应服务端错误
    if (response.body.status == 500) {
      vApp.weLoadEnd();
      vApp.weNotify(response.body.msg);
      throw new Error(response.body.msg);
    }

    // 授权过期
    if (response.body.status == 504) {
      vApp.weLoadEnd();
      zzhJs.env.isInApp() || vApp.weNotify('您的登录已经过期,请重新授权!');

      vApp.$cookie.clear('session_token');

      // let query = _.clone(window.location.query);
      // delete query['code'];
      //
      // let search = [];
      // for (let name in query) {
      //   search.push(`${name}=${query[name]}`);
      // }
      // search = search.join('&');
      //
      // let href = `${window.location.origin}${window.location.pathname}?${search}${window.location.hash}`;

      if (zzhJs.config.envNot('dev')) {
        zzhJs.env.callLogin();
      }

      throw new Error('您的登录已经过期!');
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


    let baseBody = _.assign(request.body, {
      sys: zzhJs.env.environment,
      ver: '5.0',
      timestamp: (new Date()).getTime(),
    });
    if (Vue.cookie.get('session_token')) {
      let token = Vue.cookie.get('session_token');
      baseBody['token'] = token;
      request.body = baseBody;

      if (zzhJs.config.envIs(['dev', 'test']) && this) {
        // this.weNotify('session_token:'+ token.length);
      }

      return next(resolveResponse);
    } else if (zzhJs.env.isInApp()) {
      // 兼容老内容
      if (this
        && this.$root != this
        && this.$route.query
        && this.$route.query['token']) {

        let token = this.$route.query.token;
        token = token.replace(/\s/g, "+");
        baseBody['token'] = token;
        Vue.cookie.clear('session_token');
        Vue.cookie.set('session_token', token, {expires: '1M', domain: location.host.replace(/\w+\./, '')});

        if (zzhJs.config.envIs(['dev', 'test']) && this) {
          this.weNotify('token:'+ token.length);
        }

        request.body = baseBody;
        return next(resolveResponse);
      }
        // 套一层if判断是为了防止老版本app因为没有附加新的交互接口，而出现在未登录的情况下课程列表页打不开的问题 (兼容android和ios，直接判断window.webkit.messageHandlers.messageToApp在android中会报错)
        if (window.zzhApp || window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.messageToApp) {
          zzhJs.messageBridge.listenOnce('provideUserToken', function(data) {
            baseBody['token'] = data['token'];

            if (zzhJs.config.envIs(['dev', 'test']) && this) {
              this.weNotify('tokenMessageBrigde:'+ token);
            }
            request.body = baseBody;
            next(resolveResponse);
          });

          return zzhJs.messageBridge.sendToApp({type: 'requestUserToken'});
        }


      // zzhJs.messageBridge.listenOnce('provideUserToken', function(data) {
      //   baseBody['token'] = data['token'];
      //
      //   if (zzhJs.config.envIs(['dev', 'test']) && this) {
      //     this.weNotify('tokenMessageBrigde:'+ token);
      //   }
      //   request.body = baseBody;
      //   next(resolveResponse);
      // });
      //
      // return zzhJs.messageBridge.sendToApp({type: 'requestUserToken'});

    } else if (zzhJs.config.envIs('dev')) {
      baseBody['token'] = 'zhizihua';
    }

    request.body = baseBody;
    next(resolveResponse);
  }

  Vue.http.interceptors.push(resolveRequest);
})()