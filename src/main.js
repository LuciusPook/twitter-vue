import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/_reset.scss'
import SocketIO  from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'



// const connection = io.connect('http://ce59-2001-b011-1005-5e71-545-8c13-cfec-99ff.ngrok.io',{
//   auth: { token },

//   auth: {token: store.state.token}
// }
// )

const token = localStorage.getItem('token')
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('https://simple-twitter-tim.herokuapp.com/', { auth: { token }, autoConnect: false }),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
