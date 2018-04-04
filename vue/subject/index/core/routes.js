
module.exports = [
  {
    path:'/',
    name:'subject.index',
    component: require('../views/Index.vue'),
  },
  {
    path:'/audio',
    name:'subject.audio.list',
    component: require('../views/SubjectList.vue')
  },
  {
    path:'/video',
    name:'subject.video.list',
    component: require('../views/SubjectList.vue')
  },
  {
    path:'/solutions/:id(\\d+)',
    name:'solutions.index',
    component: require('../views/Solution.vue')
  }
];