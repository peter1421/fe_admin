<template>
  <div class="chat-footer p-3 bg-white">
    <form @submit.prevent="send">
      <input v-model="newMessage" type="text" class="form-control mr-3" placeholder="Type your message">
      <button type="submit" class="btn btn-primary d-flex align-items-center p-2">
        <span class="d-none d-lg-block ml-1">Send</span>
      </button>
    </form>
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
    }
  }
}
</script>

<style scoped>
/* 聊天輸入的樣式 */
</style>
