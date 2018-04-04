
module.exports = [
  {
    path:'/',
    name:'list',
    component: require('../views/List.vue')
  },
  {
    path:'/:id(\\d+)',
    name:'detail',
    component: require('../views/Detail.vue')
  },
  {
    path:'/success/:id(\\d+)',
    name:'success',
    component: require('../views/Success.vue')
  }
];