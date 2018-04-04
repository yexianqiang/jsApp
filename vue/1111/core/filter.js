import Vue from 'vue';


//共享的价格过滤器，在价格前面添加货币符号
Vue.filter('currency', value=> {
  return '￥'+ value;
});
