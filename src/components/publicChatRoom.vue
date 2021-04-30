<script>
import { io } from "socket.io-client"
const option = {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  }
}
const socket = io('http://localhost:3000')
socket.emit("hello", "world")
</script>
