<template>
  <header class="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
    <!-- 頭部內容 -->
    <div class="d-flex align-items-center">
      <div id="sidebar-toggle" class="sidebar-toggle">
        <i class="ri-menu-3-line" />
      </div>
      <div class="avatar chat-user-profile m-0 mr-3">
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
      <h5 class="mb-0">瑜伯伯-機器人聊天室</h5>
    </div>

    <div class="chat-header-icons d-flex">
      <a href="javascript:void();" class="chat-icon-phone">
        <i class="ri-phone-line" />
      </a>
      <a href="javascript:void();" class="chat-icon-video">
        <i class="ri-vidicon-line" />
      </a>
      <a href="javascript:void();" class="chat-icon-delete">
        <i class="ri-delete-bin-line" />
      </a>
      <span class="dropdown">
        <i
          id="dropdownMenuButton"
          class="ri-more-2-line cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer pr-0"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          role="menu"
        />
        <span
          class="dropdown-menu dropdown-menu-right"
          aria-labelledby="dropdownMenuButton"
        >
          <a
            class="dropdown-item"
            href="JavaScript:void(0);"
          ><i class="fa fa-thumb-tack" aria-hidden="true" /> Pin
            to top</a>
          <a
            class="dropdown-item"
            href="JavaScript:void(0);"
          ><i class="fa fa-trash-o" aria-hidden="true" /> Delete
            chat</a>
          <a
            class="dropdown-item"
            href="JavaScript:void(0);"
          ><i class="fa fa-ban" aria-hidden="true" /> Block</a>
        </span>
      </span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'ChatHeader'
  // props, data, methods...
}
</script>

<style scoped>
/* 聊天頭部的樣式 */
</style>
