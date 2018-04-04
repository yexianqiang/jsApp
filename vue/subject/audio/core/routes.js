
module.exports = [
  {
    path:'/audio/play/:id(\\d+)',
    name:'subject.audio.play',
    component: require('../views/AudioPlay.vue')
  },
  {
    path:'/:id(\\d+)',
    name:'subject.audio.detail',
    component: require('../views/AudioDetail.vue')
  },
  {
    path:'/audio/try',
    name:'estimate.try',
    component: require('../views/AudioCommentPage.vue')
  }
];