import Vue from 'vue'
import Router from 'vue-router'
import MainContent from '@/components/MainContent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Simple Image Editor',
      component: MainContent,
      meta: {title: 'Image Editor'}
    }
  ]
})
