
module.exports = [
  {
    path:'/:id(\\d+)',
    name:'subject.video.detail',
    component: require('../views/VideoDetail.vue')
  },
  {
    path:'/video/play/:id(\\d+)',
    name:'subject.video.play',
    component: require('../views/VideoPlay.vue')
  },
  // {
  //   path:'/success/:id(\\d+)',
  //   name:'success',
  //   component: require('')
  // }
];