require('zepto/src/zepto');
require('zepto/src/selector');
require('zepto/src/event');

window._ = {
  ...require('lodash/object'),
  ...require('lodash/string'),
  ...require('lodash/lang'),
};

import Vue from 'vue';
window.Vue = Vue;

import VueRouter from 'vue-router';
Vue.use(VueRouter);

let router = new VueRouter({
  linkActiveClass:'active',
  routes: [{
    path:'/',
    name:'detail',
    component: require('./views/Detail.vue')
  }, {
    path:'/success',
    name:'success',
    component: require('./views/Success.vue')
  }],
});

router.beforeEach(function (to, from, next) {
  next();
});

let careWechatSign = function () {
  if (zzhJs.env.isInApp() || !window.wx) {
    return;
  }

  let apiUrl = zzhJs.helpers.routeParser('api.util.jssign', {
    url: encodeURIComponent(window.location.href.split('#')[0])
  });

  Vue.http.get(apiUrl)
    .then(function (res) {
      let response = res.data.data;
      wx.error(function(res) {alert("JSSDK配置错误:" + res.errMsg);});

      wx.ready(function () {
        let shareData = {
          title: '双11限时购 今年剁手为孩子！',
          desc: '点击领取300元剁手补贴。',
          link: window.share.link,
          imgUrl: window.share.imgUrl,
          type: 'link',
          success(data) {}
        };

        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareAppMessage(shareData);
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
}

careWechatSign();

// 初始化 appCaller
require('../library/resolveAppCaller');

import Vuex from 'vuex';
Vue.use(Vuex);
let store = new Vuex.Store({state: {}});

import components from '../library/components';

require('../library/rem');

import filter from '../library/filters'

import app from './App.vue';

new Vue({
  el: '#app',
  router,
  store,
  render(h) {
    return h(app)
  }
});