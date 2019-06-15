// import Vue from 'vue'
// import App from './App'
// import router from './router'
// import store from './store'

// Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import { Button, Select } from 'element-ui'
// Vue.use(Button)
// Vue.use(Select)

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root)
