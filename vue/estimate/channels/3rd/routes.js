const routes = [
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
    path:'/estimate/:id(\\d+)/report',
    name:'estimate.report',
    component: require('../../views/Report.vue')
  }
];

export default routes;