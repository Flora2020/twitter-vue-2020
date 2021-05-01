import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosPlugin from 'vue-axios-cors'
import VueSocketIO from 'vue-socket.io'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE5ODMzMDE5LCJleHAiOjE2MTk4NjE4MTl9.yIXXjdwunH510KACkTxJ7kJK5dOWhQlbWCfWmL0IAYI'

Vue.config.productionTip = false

Vue.use(AxiosPlugin)
Vue.use(
  new VueSocketIO({
    debug: true, // debug 用，正式發佈時建議關閉
    connection: `http://localhost:3000?token=${token}`
  })
)

new Vue({
  sockets: {
    connecting () {
      console.log('正在連接')
    },
    disconnect () {
      console.log('Socket 失去連接')
    },
    connect_failed () {
      console.log('連接失敗')
    },
    connect () {
      console.log('socket connected')
    }
  },
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
