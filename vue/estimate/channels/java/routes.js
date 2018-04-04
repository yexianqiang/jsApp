const routes = [
  {
    path: '/',
    name: 'estimate.home',
    component: require('../../views/List2.vue')
  },
  {
    path: '/estimate/:id(\\d+)',
    name: 'estimate.detail',
    component: require('../../views/Detail.vue')
  },
  {
    path: '/estimate/:id(\\d+)/questions',
    name: 'estimate.questions',
    component: require('../../views/Question.vue')
  },
  {
    path: '/estimate/:id(\\d+)/questions/research',
    name: 'estimate.research',
    component: require('../../views/Research.vue')
  },
  {
    path:'/estimate/:id(\\d+)/report',
    name:'estimate.report',
    component: require('../../views/Report.vue')
  },
  {
    path: '/estimate/pay/confirm',
    name: 'pay.confirm',
    component: require('../../views/pay/Confirm.vue')
  },
  {
    path:'/estimate/pay/success',
    name:'pay.success',
    component: require('../../views/pay/Success.vue')
  },
  {
    path: '/estimate/pay/call',
    name: 'pay.call',
    component: require('../../views/pay/Call.vue')
  },
  {
    path: '/mine',
    name: 'mine.estimate',
    component: require('../../views/MyEsitmate.vue')
  }
];

export default routes;