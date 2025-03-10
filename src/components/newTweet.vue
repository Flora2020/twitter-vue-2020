<template>
  <div id="newTweet" v-show="modalOn" @click.self="closeModal()">
    <form @submit.prevent.stop="handleSubmit">
      <textarea
        v-model="description"
        placeholder="有什麼新鮮事？"
        @keydown.prevent.stop.enter.exact="handleSubmit"
      >
      </textarea>
      <button
        type="submit"
        class="button"
        :disabled="isProcessing"
        :class="{isProcessing}"
      >推文</button>
      <div class="close" @click.self="closeModal()">×</div>
    </form>
  </div>
</template>

<script>
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import Bus from '../bus.js'

export default {
  data () {
    return {
      description: '',
      isProcessing: false,
      modalOn: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (!this.description) {
          Toast.fire({
            icon: 'warning',
            title: '您尚未填寫任何文字'
          })
          return
        }
        this.isProcessing = true

        const { data } = await tweetsAPI.create({
          description: this.description
        })

        if (data.status === 'error') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '新增推文成功'
        })
        this.isProcessing = false
        this.description = ''
        this.modalOn = !this.modalOn
        Bus.$emit('tweetSuccess')
      } catch (error) {
        this.isProcessing = false

        Toast.fire({
          icon: 'error',
          title: '推文內容不能超過140字'
        })
        console.error(error.message)
      }
    },
    closeModal(){
      if(this.description){
        Toast.fire({
          title: '儲存變更?',
          position: 'center',
          showDenyButton: true,
          showConfirmButton: true,
          confirmButtonText: `儲存`,
          denyButtonText: `取消儲存`,
          timer: undefined
        }).then(result => {
          if (result.isConfirmed) {
            this.modalOn = !this.modalOn
          } else if (result.isDenied) {
            this.description = ''
            this.modalOn = !this.modalOn
          }
        })
      } else {
        this.modalOn = !this.modalOn
      }
    }
  },
  created() {
    Bus.$on('totweet', () => {
      this.modalOn = !this.modalOn
    })
  }

}
</script>

<style lang="sass">
$font-color: rgba(#b0d7f6, .8)
#newTweet
  display: flex
  align-items: center
  justify-content: center
  form
    position: relative
    textarea
      resize: none
      width: 50vw
      height: 30vh
      font-size: 20px
      margin:
        top: 10px
      padding: 5px 10px
      border-radius: 10px
    button
      position: absolute
      right: 10px
      bottom: 10px
      background:
        color: $font_color
      width: 60px
      height: 30px
      font-size: 16px
      text-align: center
      border-radius: 15px
      margin:
        top: 20px
      &:hover
        cursor: pointer
    .isProcessing:hover
      cursor: default
    .close
      position: absolute
      top: 10px
      right: 5px
      font-size: 18px
      &:hover
        cursor: pointer
</style>
