require('zepto/src/zepto');
require('zepto/src/selector');
require('zepto/src/event');

window._ = {
  ...require('lodash/object'),
  ...require('lodash/string'),
  ...require('lodash/lang'),
  ...require('lodash/math'),
};

// = ---------------------------= Vue =--------------------------- =
import Vue from 'vue';
window.Vue = Vue;

import VueResorce from 'vue-resource';
Vue.use(VueResorce);

// 取 Bearer Token
let bearerToken = '';
let $metaBearerToken = $('meta[name="bearer-token"]');
if ($metaBearerToken.length) {
  bearerToken = $metaBearerToken.attr('content');
}
window.bearerToken = bearerToken;

require('../../zhizihua').exclude(['requestJava', 'requestPhp']);
require('./library/moduleEnv');
require('./library/request');


// vue-scroller
import VueScroller from 'vue-scroller'
Vue.use(VueScroller);

import router from './core/router';
import store from './core/store';

import app from './App.vue';

window.vApp = new Vue({
  el: '#app',
  router,
  store,
  mounted() {},
  render(h) {
    return h(app)
  },
});
