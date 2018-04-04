"use strict";

import Vue from 'vue';
window.Vue = Vue;

import VueResorce from 'vue-resource';
Vue.use(VueResorce);

//vue-awe-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

window._ = {
  ...require('lodash/object'),
  ...require('lodash/string'),
  ...require('lodash/lang'),
}

require('zepto/src/zepto');
require('zepto/src/selector');
require('zepto/src/event');

// 取 Bearer Token
let bearerToken = '';
let $metaBearerToken = $('meta[name="bearer-token"]');
if ($metaBearerToken.length) {
  bearerToken = $metaBearerToken.attr('content');
}
window.bearerToken = bearerToken;

require('../../../zhizihua').exclude(['requestJava', 'requestPhp']);
require('./moduleEnv');
require('./helpers');
require('./request');

// Store
import store from '../../core/store';

// Report Modules
import reports from '../../views/report/index';

// Router
import router from './router';

import app from './App.vue';

let vApp = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(app)
});

/**
 * Vue 根实例注册
 *
 * @type {Vue}
 * @global
 */
window.vApp = vApp;