require('zepto/src/zepto');
require('zepto/src/selector');
require('zepto/src/event');

window._ = {
  ...require('lodash/object'),
  ...require('lodash/string'),
  ...require('lodash/lang'),
};

//======================vue======================
import 'babel-polyfill'
import Vue from 'vue';
import Es6Promise from 'es6-promise'

require('es6-promise').polyfill();
Es6Promise.polyfill()
window.Vue = Vue;

import VueResorce from 'vue-resource';
Vue.use(VueResorce);

// Framwork Library
require('../zhizihua').exclude(['requestPhp']);

import router from './core/router';
import store from './core/store';


import app from './App.vue';

window.vApp = new Vue({
  el: '#app',
  router,
  store,
  render(h) {
    return h(app)
  }
});
