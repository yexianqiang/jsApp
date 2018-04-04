require('zepto/src/zepto');
require('zepto/src/selector');
require('zepto/src/event');

window._ = {
  ...require('lodash/object'),
  ...require('lodash/string'),
  ...require('lodash/lang'),
};

//======================vue======================

import Vue from 'vue';
window.Vue = Vue;

import VueResorce from 'vue-resource';
Vue.use(VueResorce);

// Framwork Library
require('../zhizihua').exclude(['requestPhp']);

import router from './core/router';
import store from './core/store';

// vue-scroller
import VueScroller from 'vue-scroller'
Vue.use(VueScroller);


import app from './App.vue';

window.vApp = new Vue({
  el: '#app',
  router,
  store,
  render(h) {
    return h(app)
  }
});
