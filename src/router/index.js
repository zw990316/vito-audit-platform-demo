import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { 
    path: '/',
    name: 'auditList',
    component:()=> import('@/views/auditList.vue'),
  },
  { 
    path: '/management',
    name:'auditManage', 
    component: ()=> import('@/views/auditManage.vue') 
  }

  
]

const router = createRouter({

  history:createWebHashHistory(),
  routes,
})

export default router