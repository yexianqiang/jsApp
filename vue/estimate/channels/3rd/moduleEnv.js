
let moduleEnv = {
  channel: 'third_party',
  isLogined() {
    return true;
  },
  getToken() {
    return '';
  },
};

window.zzh = _.assign({}, window.zzh, { env: _.assign(window.zzhJs.env, moduleEnv) });

if (window.Vue) {
  window.Vue.prototype.zzh = window.zzh;
}
