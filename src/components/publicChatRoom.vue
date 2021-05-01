<template>
  <div id="app55">
    <div id="nav55">
      <button @click="connect">建立连接</button>
      <button @click="sendMessage">发送数据</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  methods: {
    // 连接socket
    connect () {
      this.$socket.open() // 开始连接socket
      // 订阅事件
      this.sockets.subscribe("welcome", data => {
        console.log("welcome data==> ", data)
      })
    },

    // 发送消息
    sendMessage () {
      this.$socket.emit("hello", "这里是客户端");
    }
  },

  sockets: {
    connect (data) {
      console.log(data);
    },
    //
    welcome: data => {
      console.log("welcome data数据返回= >", data);
    },
    error: data => {
      console.log('error:', data)
    }
  },
  beforeDestroy () {
    this.sockets.unsubscribe('welcome')
  }
};
</script>
