<template>
  <div class="chat-footer p-3 bg-white">
    <form @submit.prevent="send">
      <input v-model="newMessage" type="text" class="form-control" style="width: 80%;float: left;" placeholder="Type your message">
      <button type="submit" class="btn btn-primary p-2" style="width: 20%;text-align: center;position: relative;top: -1px;">
        <span class="d-none d-lg-block ml-1">Send</span>
      </button>
    </form>
    <button type="submit" class="btn btn-danger my-4 px-3 py-2" style="width: 100%;" @click="exit()">
      <span class="d-none d-lg-block ml-1">離開此次對話</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'MessageInput',
  data() {
    return {
      newMessage: ''
    }
  },
  methods: {
    send() {
      // alert(this.newMessage)
      this.$emit('sendMessage', this.newMessage)

      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //   //   if (this.form.mobile === '') {
      //   //     this.form.mobile = null
      //   //   }
      // changeInformation(this.form).then(res => {
      //   this.$message({
      //     message: '修改成功',
      //     type: 'success'
      //   })
      //   store.dispatch('user/getInfo').then(() => {})
      // })
      //   }
      // })
      this.newMessage = ''
    },
    exit() {
      this.$emit('exitChat')
    }
  }
}
</script>

<style scoped>
/* 聊天輸入的樣式 */
</style>
