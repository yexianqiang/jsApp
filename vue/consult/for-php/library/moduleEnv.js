
let moduleEnv = {
  channel: 'php',
  getTokey() {
    return window.bearerToken? window.bearerToken: null;
  },
};

window.zzh = _.assign({}, window.zzh, { env: _.assign(window.zzhJs.env, moduleEnv) });

if (window.Vue) {
  window.Vue.prototype.zzh = window.zzh;
}
