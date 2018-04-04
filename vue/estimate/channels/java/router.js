import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../../core/store';

Vue.use(VueRouter);

let router = new VueRouter({
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  // mode: 'history',
  routes,
  beforeEnter(to, from, next) {

    if (!to.name) {
      alert('页面不存在!');
      next('/');
      return;
    }

    if (to.meta.needCurrent && !storeInc.getters.current) {
      next('/');
      return;
    }

    next();
  }
});

router.beforeEach(function (to, from, next) {
  next();

  if (zzhJs.env.isInApp() || !window.wx) {
    return;
  }

  let apiUrl = zzhJs.helpers.routeParser('api.util.jssign', {
    url: encodeURIComponent(window.location.href.split('#')[0])
  });

  router.app.$http.get(apiUrl)
    .then(function (res) {
      let response = res.data.data;
      wx.error(function(res) {alert("JSSDK配置错误:" + res.errMsg);});

      wx.ready(function () {
        var shareData = {
          title: '《杰出心智训练营》开营啦！！！',
          desc: '2017年知子花101期心智训练火热报名中。。。',
          link: 'http://www.baidu.com',
          imgUrl: '',
          type: 'link',
          success: function (data) {}
        };

        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareQQ(shareData);
        wx.onMenuShareWeibo(shareData);
        wx.onMenuShareQZone(shareData);
      });


      let config = _.assign(response.config, {
        debug: false,
        jsApiList: [
          'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems',
          'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'onMenuShareQZone', 'chooseWXPay'
        ]
      });

      wx.config(config);
    });
});

export default router;