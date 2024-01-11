<template>
  <div class="app-container">
    <div id="content-page" class="content-page">
      <div class="row">
        <div class="col-sm-12">
          <div class="iq-card">
            <div class="iq-card-body chat-page p-0">
              <chat-header />
              <div class="chat-data-block">
                <div class="row">
                  <div class="col-lg-6 chat-data-left scroller  mt-2 pl-3">
                    <div class="chat-sidebar-channel scroller mt-2 pl-3">
                      <pre><code class="language-python line-numbers">{{ code }}</code></pre>
                    </div>
                  </div>
                  <div class="col-lg-6 chat-data p-0 chat-data-right">
                    <div class="tab-content">
                      <div
                        id="chatbox1"
                        class="tab-pane fade active show"
                        role="tabpanel"
                      >
                        <div id="chat-area" class="chat-content scroller">
                          <!-- 使用 v-for 渲染每條消息 -->
                          <chat-message v-for="(message, index) in messages" :key="index" :message="message" />
                        </div>
                        <!-- 聊天輸入區塊 -->
                        <message-input @sendMessage="sendMessage" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import chatHeader from './components/chatHeader'
import chatMessage from './components/chatMessage'
import messageInput from './components/messageInput'
import '../../../assets/css/bootstrap.min.css'
import '../../../assets/css/style.css'
import '../../../assets/css/remixicon.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css' // 主題樣式
import 'prismjs/plugins/line-numbers/prism-line-numbers.css' // 行號樣式
import { mapGetters } from 'vuex'
import { sendMessage } from '@/api/chatbot/message'
import store from '@/store'

export default {
  name: 'MainComponent',
  components: {
    chatHeader,
    chatMessage,
    messageInput
  },
  data() {
    return {
      newMessage: '',
      messages: [],
      form: {
        search: '',
        ordering: 'id'
      },
      code: `
import pandas as pd
# 讀取 CSV 文件
      `,
      tableData: [],
      isAllSelect: false,
      multipleSelection: [],
      // cuForm数据
      cuDialogVisible: false,
      curId: null
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
  },
  mounted() {
    this.$nextTick(() => {
      Prism.highlightAll()
    })
  },
  created() {
  },
  methods: {
    sendMessage(message) {
      this.newMessage = message
      if (!this.newMessage) return
      const messageLog = {
        'userId': this.userId,
        'sender': 'user',
        'message': this.newMessage
      }
      sendMessage(messageLog).then(res => {
        this.$message({
          message: '送出成功',
          type: 'success'
        })
      })
      // TODO:現在是全部重新載入，之後要改成只載入最新的
      store.dispatch('chatbot/getMessages').then(() => {
        this.messages = []
        this.chatMessages.forEach(chatMessage => {
          console.log(chatMessage)
          this.messages.push({ sender: chatMessage.sender, text: chatMessage.message })
        })
      })
      this.newMessage = ''
    },
    autoReply() {
      setTimeout(() => {
        const message = '嗨!' + this.name + ' 你好'
        this.messages.push({ sender: 'bot', text: message })
      }, 1000)
    }
  }
}
</script>
<style>
/* 新增的 CSS 樣式 */
.chat-message {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
}
.chat-message-user {
  background-color: #e1f5fe;
  text-align: left;
}
.chat-message-bot {
  background-color: #fce4ec;
  text-align: right;
}
</style>
