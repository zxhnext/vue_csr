import Vue from 'vue'
import Router from 'vue-router'
import Address from '@/views/address'
import Content from '@/views/content'
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    }
  ]
})
