
window._ = {
  ...require('lodash/object'),
  ...require('lodash/string'),
  ...require('lodash/lang'),
  ...require('lodash/math'),
};

require('zepto/src/zepto');
require('zepto/src/selector');
require('zepto/src/event');

import Vue from 'vue';
import '../zhizihua/rem';
import re from './index';

import app from './App.vue';

new Vue({
  el: '#app',
  render: h => h(app)
});