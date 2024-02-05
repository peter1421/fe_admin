<template>
  <header class="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
    <!-- 頭部內容 -->
    <div class="d-flex align-items-center">
      <div id="sidebar-toggle" class="sidebar-toggle">
        <i class="ri-menu-3-line" />
      </div>
      <div class="chat-user-profile m-0 mr-3">
        <img
          id="character"
          :src="require('@/assets/img/chat/fish1.gif')"
          alt="Character Image"
          class="avatar-130"
          style="text-align: center"
        >
        <span
          class="avatar-status"
        ><i class="ri-checkbox-blank-circle-fill text-success" /></span>
      </div>
      <h5 class="mb-0">{{ botData.student.name }} 的 {{ botData.book.name }}-機器人聊天室</h5>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChatHeader',
  // props, data, methods...
  props: {
    botData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'department',
      'name',
      'avatar',
      'mobile',
      'email',
      'gender',
      'userId',
      'chatMessages'
    ])
  }
}
</script>

<style scoped>
/* 聊天頭部的樣式 */
</style>
