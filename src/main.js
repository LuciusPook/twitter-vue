import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from "@/components/SvgIcon.vue"

Vue.component("icon", SvgIcon)
Vue.config.productionTip = false

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context("@/assets/icon", false, /\.svg$/)
requireAll(req)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
