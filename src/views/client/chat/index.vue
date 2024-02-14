<template>
  <div class="app-container">
    <div id="content-page" class="content-page">
      <div class="row">
        <div class="col-sm-12">
          <div class="iq-card">
            <div class="iq-card-body chat-page p-0">
              <chat-header v-if="botData.student" :bot-data="botData" />
              <div class="chat-data-block">
                <div class="row">
                  <div class="col-lg-6 chat-data-left scroller  mt-2 pl-3">
                    <div class="chat-sidebar-channel scroller mt-2 pl-3">
                      <div class="language-python line-numbers" v-html="code" />
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
                        <message-input @sendMessage="sendMessage" @exitChat="exitChat" />
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
import { getMessages, sendMessage } from '@/api/chatbot/message'
import { getStudentBookBot, createStudentBookBot, updateStudentBookBot } from '@/api/chatbot/bookbot'
import store from '@/store'
// import { data } from 'vue-echarts'
// import { data } from 'vue-echarts'

// TODO:把重複或用不到的變數拿掉
export default {
  name: 'MainComponent',
  components: {
    chatHeader,
    chatMessage,
    messageInput
  },
  data() {
    return {
      botId: null,
      student: null,
      book: null,
      newMessage: '',
      messages: [],
      botData: {},
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
      // cuForm數據
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
      'userId'
    ])

  },
  mounted() {
    this.$nextTick(() => {
      Prism.highlightAll()
    })
  },
  created() {
    this.init()
    this.scrollToBottom()
  },
  methods: {
    init() {
      this.student = this.userId
      this.book = this.$route.params.bookId
      this.getStudentBookBot()
    },
    getStudentBookBot() {
      const params = {
        student: this.student,
        book: this.book
      }
      getStudentBookBot(params)
        .then(res => {
          console.log(res.data)
          this.botData = res.data
          this.botId = res.data.bot_id
          this.code = res.data?.book?.content?.replace(/\n/g, '<br>')
          this.$message({
            message: `機器人ID: ${this.botId} 學生ID: ${this.student} 書籍ID: ${this.book}`,
            type: 'success'
          })
        })
        .catch(error => {
          console.error('獲取機器人失敗:', error)
          this.$message({
            message: '獲取機器人失敗，正在為您創造新的機器人',
            type: 'warning'
          })
          this.createStudentBookBot()
        }).finally(() => {
          this.getMessages()
        })
    },
    createStudentBookBot() {
      const data = {
        student: parseInt(this.student),
        book: parseInt(this.book)
      }
      createStudentBookBot(data)
        .then(res => {
          this.init()
        })
        .catch(error => {
          const message = this.student + '創建機器人: ' + this.book + '失敗\n' + error
          console.error(message)
          this.$message({
            message: message,
            type: 'error'
          })
        })
    },
    sendMessage(message) {
      // TODO:整理成function
      console.log('sendMessage')
      this.newMessage = message
      if (!this.newMessage) return
      const messageLog = {
        'userId': this.userId,
        'sender': 'user',
        'message': this.newMessage,
        'student_book_bot_id': this.botId,
        'chatroom_id': 0
      }
      const userMessage = { sender: messageLog.sender, text: messageLog.message }
      this.updateMessages(userMessage)
      console.log(userMessage)
      sendMessage(messageLog).then(res => {
        this.$message({
          message: '送出成功',
          type: 'success'
        })
        const data = res.data
        // 將用戶消息和機器人回復添加到消息列表
        const botMessage = { sender: data.bot_message.sender, text: data.bot_message.message }
        this.updateMessages(botMessage)
      })
    },
    getMessages() {
      const params = {
        'bot_id': this.botId
      }
      console.log('getMessages')
      getMessages(params).then((res) => {
        // TODO:這裡有鬼 BJ4
        this.messages = []
        this.chatMessages = res.data
        // console.log(res)
        // console.log(res.data)
        // console.log(this.chatMessages)
        res.data.forEach(chatMessage => {
          this.messages.push({ sender: chatMessage.sender, text: chatMessage.message })
        })
      })
      this.newMessage = ''
    },
    getMessages2() {
      // TODO:現在是全部重新載入，之後要改成只載入最新的
      store.dispatch('chatbot/getMessages').then(() => {
        this.messages = []
        this.chatMessages.forEach(chatMessage => {
          this.messages.push({ sender: chatMessage.sender, text: chatMessage.message })
        })
      })
      this.newMessage = ''
    },
    // 更新消息列表
    updateMessages(newMessages) {
      // this.$nextTick(() => {
      this.messages.push(newMessages)
      this.scrollToBottom()
      // })
    },
    scrollToBottom() {
      this.$nextTick(() => {
        var chatArea = document.getElementById('chat-area')
        if (chatArea) {
          chatArea.scrollTop = chatArea.scrollHeight
        }
      })
    },
    autoReply() {
      setTimeout(() => {
        const message = '嗨!' + this.name + ' 你好'
        this.messages.push({ sender: 'bot', text: message })
      }, 1000)
    },
    exitChat() {
      const data = {
        student: parseInt(this.student),
        book: parseInt(this.book)
      }
      updateStudentBookBot(data)
        .then(res => {
          this.init()
        })
        .catch(error => {
          const message = this.student + '創建機器人: ' + this.book + '失敗\n' + error
          console.error(message)
          this.$message({
            message: message,
            type: 'error'
          })
        })
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
