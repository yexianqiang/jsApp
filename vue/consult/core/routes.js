
module.exports = [
  {
    path:'/',
    name:'consult.list',
    component: require('../views/List.vue')
  },
  {
    path:'/:id(\\d+)',
    name:'consult.detail',
    component: require('../views/Detail.vue')
  },
  {
    path:'/mine',
    name:'consult.mine',
    component: require('../views/MineConsult.vue')
  },
  {
    path:'/success/:id(\\d+)',
    name:'consult.success',
    component: require('../views/Success.vue')
  },
  {
    path:'/teacher',
    name:"consult.lesson",
    component: require('../views/TeacherLesson.vue')
  },
  {
    path:'/comments/:id(\\d+)',
    name:'consult.allComment',
    component: require('../views/ConsultAllComment.vue')
  }

];