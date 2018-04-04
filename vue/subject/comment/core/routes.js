
module.exports = [
  {
    path:'/:id(\\d+)/:channel*',
    name:'subject.comment',
    component: require('../views/CommentPage.vue')
  },
];