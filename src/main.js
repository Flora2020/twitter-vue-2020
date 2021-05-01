import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosPlugin from 'vue-axios-cors'
import VueSocketIO from "vue-socket.io"

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE5ODMzMDE5LCJleHAiOjE2MTk4NjE4MTl9.yIXXjdwunH510KACkTxJ7kJK5dOWhQlbWCfWmL0IAYI'

Vue.config.productionTip = false

Vue.use(AxiosPlugin)
Vue.use(
  new VueSocketIO({
    debug: true, // debug调试，生产建议关闭
    connection: `http://localhost:3000?token=${token}`
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
