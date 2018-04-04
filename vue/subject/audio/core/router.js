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

if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      window.location.reload()
    }

  });
}

export default router;