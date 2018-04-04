import Vue from  'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import routes from './routes';

const router = new VueRouter({
  linkActiveClass:'active',
  routes
});

router.beforeEach(function (to, from, next) {
  next();

  if (zzhJs.env.isInApp() || !window.wx) {
    return;
  }

  let apiUrl = zzhJs.config.apiDomain+'/zzhedu/wx/web/jssign.action',
    currentUrl = window.location.href.split('#')[0];

  router.app.$http.post(apiUrl,{
    url:currentUrl
  })
    .then(res => {
      let response = res.data;
      wx.error(function(res) {alert("JSSDK配置错误:" + res.errMsg);});
      wx.ready(function () {});
      let config = {
        debug:false,
        appId:response.data['appid'],
        timestamp:response.data['timestamp'],
        nonceStr:response.data['nonce_str'],
        signature:response.data['signature'],
        jsApiList:[
          'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems',
          'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'onMenuShareQZone', 'chooseWXPay'
        ]
      }

      // let config = _.assign(response.data, {
      //   debug: false,
      //   jsApiList: [
      //     'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems',
      //     'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'onMenuShareQZone', 'chooseWXPay'
      //   ]
      // });


      wx.config(config);
    });
});

export default router;