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
import 'babel-polyfill'
import Vue from 'vue';
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill();
Es6Promise.polyfill()
window.Vue = Vue;

import VueResorce from 'vue-resource';
Vue.use(VueResorce);

import router from './core/router';
import store from './core/store';

// Framwork Library
require('../zhizihua').exclude(['requestPhp']);

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
