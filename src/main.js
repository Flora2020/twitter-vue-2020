import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosPlugin from 'vue-axios-cors'
import VueSocketIO from "vue-socket.io"

Vue.config.productionTip = false

Vue.use(AxiosPlugin)
Vue.use(
  new VueSocketIO({
    debug: true, // debug调试，生产建议关闭
    connection: 'http://localhost:3000'
  })
)

new Vue({
  sockets: {
    connecting () {
      console.log('正在连接');
    },
    disconnect () {
      console.log('Socket 断开');
    },
    connect_failed () {
      console.log('连接失败');
    },
    connect () {
      console.log('socket connected');
    }
  },
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
