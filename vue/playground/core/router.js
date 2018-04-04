import Vue from  'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import routes from './routes';

const router = new VueRouter({
  linkActiveClass:'active',
  routes
});

router.beforeEach(function (to, from, next) {
  next();
});

export default router;