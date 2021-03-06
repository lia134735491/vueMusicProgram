import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index.vue'
import video from '@/views/video.vue'
import person from '@/views/person.vue'
import song from '@/views/songDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      title: '黑皮音乐',
      tabberShow: true
    }
  },
  {
    path: '/video',
    name: 'video',
    component: video,
    meta: {
      title: '视频',
      tabberShow: true
    }
  },
  {
    path: '/person',
    name: 'person',
    component: person,
    meta: {
      title: '个人中心',
      tabberShow: true
    },
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/testLogin.vue'),
    meta: {
      title: '登录中心'
    }
  },
  {
    path: '/recommendSong',
    component: ()=>import('@/views/recommendSong.vue'),
    meta:{
      title: '歌曲列表'
    }
  },
  {
    name: 'songDetail',
    path: '/songDetail',
    // component: ()=>import('@/views/songDetail.vue')
    component: song
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to,from,next)=>{
//   console.log(to,from,next)
//   console.log(22)
//   next()
// })

export default router
