
let moduleEnv = {
  channel: 'php',
  getToken() {
    return window.bearerToken? window.bearerToken: null;
  },
};

if (zzhJs.env.envIs('wechat')) {
  moduleEnv = _.assign(moduleEnv, {
    callLogin(params) {
      params = params? params: {};
      let authUrl = zzhJs.helpers.routeParser('wechat.authorize', _.assign({channel: (zzhJs.config.envIs('dev') ?'php': '')}, params));
      window.location = authUrl;
    }
  });
}

window.zzhJs = _.assign({}, window.zzhJs, { env: _.assign(window.zzhJs.env, moduleEnv) });

if (window.Vue) {
  window.Vue.prototype.zzhJs = window.zzhJs;
}
