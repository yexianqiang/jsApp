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
});

export default router;