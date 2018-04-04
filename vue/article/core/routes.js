module.exports = [
  {
    path:'/',
    name:'article.list',
    component: require('../views/List.vue')
  },{
    path:'/:id(\\d+)',
    name:'article.detail',
    component: require('../views/Detail.vue')
  },
  {
    path:'/:id(\\d+)/comments',
    name:'article.comments',
    component:require('../views/ArticleAllComment.vue')
  }
];
