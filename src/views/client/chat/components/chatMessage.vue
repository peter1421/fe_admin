<template>
  <div class="chat" :class="{'chat-left': message.sender === 'bot'}">
    <div class="chat-message">
      <p>{{ message.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    message: {
      type: Object,
      required: true,
      default: () => ({ text: '', sender: '' })
    }
  }
}
</script>

<style scoped>

</style>
