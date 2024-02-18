
<template>
  <div class="app-container">
    <div id="content-page" class="content-page">
      <div class="row">
        <div class="col-sm-12">
          <div class="iq-card">
            <div class="iq-card-body chat-page p-0">
              <chat-header v-if="botData.student.name" :bot-data="botData" />
              <div class="chat-data-block">
                <div class="row">
                  <div class="col-lg-6 chat-data-left scroller  mt-2 pl-3">
                    <div class="chat-sidebar-channel scroller mt-2 pl-3">
                      <!-- 用於顯示代碼的容器 -->
                      <CodeBlock :code="yourCodeHere" />
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
<!-- PrismJS Core JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/prism.js"></script>
<!-- Line Numbers Plugin JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.js"></script>

<script>
import CodeBlock from './components/CodeBlock.vue'; // 确保路径正确
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
import { getStudetnBookBot, creatStudentBookBot } from '@/api/chatbot/bookbot'
import store from '@/store'
// import { data } from 'vue-echarts'
// import { data } from 'vue-echarts'

// TODO:把重複或用不到的變數拿掉
export default {
  name: 'MainComponent',
  components: {
    chatHeader,
    chatMessage,
    CodeBlock,
    messageInput
  },
  data() {
    return {
      times:0,
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
      codeContent: `
import pandas as pd\n# 讀取 CSV 文件\n`,
yourCodeHere: `x = input("Enter numbers separated by space: ").split();\nnums = [int(i) for i in x];\ndef gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a\ndef findCommonFactors(n1, n2):\n    commonFactors = []\n    for i in range(1, min(n1, n2)+1):\n        if n1 % i == n2 % i == 0:\n            commonFactors.append(i)\n    return commonFactors\n\nresult = nums[0]\nfor n in nums[1:]:\n    result = findCommonFactors(result, n)\n\nprint("Common factors:", result);`,
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
      'userId',
      'chatMessages'
    ])

  },
  mounted() {
    this.$nextTick(() => {
      Prism.highlightAll()
      this.highlightCode();
    })
  },
  created() {
    this.init()
    this.scrollToBottom()
  },
  watch: {
    codeContent() {
      this.$nextTick(() => {
        this.highlightCode();
      });
    },
  },
  methods: {
    init() {
      this.student = this.userId
      this.book = this.$route.params.bookId
      this.getStudetnBookBot()
    },
    highlightCode() {
      Prism.highlightAllUnder(this.$refs.codeBlock.parentElement);
    },
    getStudetnBookBot() {
      const params = {
        student: this.student,
        book: this.book
      }
      getStudetnBookBot(params)
        .then(res => {
          console.log(res.data)
          this.botData = res.data
          this.botId = res.data.bot_id
          this.code = res.data?.book?.content?.replace(/\n/g, '<br>')
          this.$message({
            message: `機器人ID: ${this.botId} 學生ID: ${this.student} 課程ID: ${this.book}`,
            type: 'success'
          })
        })
        .catch(error => {
          console.error('獲取機器人失敗:', error)
          this.$message({
            message: '獲取機器人失敗，正在為您創造新的機器人',
            type: 'warning'
          })
          this.creatStudentBookBot()
        }).finally(() => {
          this.getMessages()
        })
    },
    creatStudentBookBot() {
      const data = {
        student: parseInt(this.student),
        book: parseInt(this.book)
      }
      creatStudentBookBot(data)
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
      this.times++
      this.newMessage = message
      var botMessage = 'HHH'
      if (!this.newMessage) return

      const userMessage = { sender: 'user', text: this.newMessage }
      this.updateMessages(userMessage)
      if(this.times==1){
        //你好
         botMessage = '在這段程式碼中，你想要找出一個數字列表中所有數字的公因數。\n讓我們先聚焦於可以聚焦於你提供的代碼中的 gcd 函數。我注意到這個函數在你的程式碼中被定義了，但似乎沒有被使用。這是否是你刻意為之，還是可能遺忘了某些計劃中要使用它的地方？ (第 3 行)'
      }else if (this.times==2) {
        //我應該把它拿掉，他並沒有用處
         botMessage = '移除未使用的 gcd 函數是一個明智的選擇，這樣做可以提高代碼的清晰度和易讀性，是否有代碼可以進一步重構以提高其效率和可讀性。再來聚焦於 findCommonFactors 函數。這個函數的實作是否真正達到了你想要的目標？在找出公因數時，比對 n1 % i == n2 % i == 0 是否是最合適的條件？ (第 10 行)'
      }else if (this.times==3) {
        //我認為是 這樣可以找出這兩個餘數為0的值
         botMessage = '我理解你的想法是尋找能同時整除 n1 和 n2 的數字。\n但讓我們再深入探討一下：當你使用 == 來比較 n1 % i 和 n2 % i 與 0 的關係時，你是不是在檢查 i 是否同時是 n1 和 n2 的因數？如果是這樣，是否有更直觀或簡化的方式來表達這個條件？ (第 10 行)'
      }else if (this.times==4) {
        //那我用n1%i==0 and n2%i==0 是否可以
         botMessage = '使用 n1 % i == 0 and n2 % i == 0 確實是一種更清晰和直接的方式來檢查 i 是否同時是 n1 和 n2 的因數。這樣的表達不僅讓人更容易理解程式碼的意圖，而且也維持了程式的正確性。 (第 10 行)'
      }
      else{
         botMessage = '移除未使用的 gcd 函數是一個明智的選擇，這樣做可以提高代碼的清晰度和易讀性，是否有代碼可以進一步重構以提高其效率和可讀性。再來聚焦於 findCommonFactors 函數。這個函數的實作是否真正達到了你想要的目標？在找出公因數時，比對 n1 % i == n2 % i == 0 是否是最合適的條件？'
      }
      const delay = 2+Math.floor(Math.random() * 5000);

      // 使用setTimeout来延迟机器人消息的发送
      setTimeout(() => {
        const botMessages = { sender: 'bot', text: botMessage };
        this.updateMessages(botMessages);
      }, delay); // 2000毫秒后执行，即2秒
      // console.log(userMessage)
      // sendMessage(messageLog).then(res => {
      //   this.$message({
      //     message: '送出成功',
      //     type: 'success'
      //   })
      //   const data = res.data
      //   // 將用戶消息和機器人回復添加到消息列表
      //   const botMessage = { sender: data.bot_message.sender, text: data.bot_message.message }
      //   this.updateMessages(botMessage)
      // })
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
    //暫時無用
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
code[class*="language-"],
    pre[class*="language-"] {
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 16px;
    }
    .app-container {
  padding: 20px;
}

.chat-page {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
}

.chat-data-block {
  background-color: #ffffff;
  border-radius: 8px;
  margin-top: 20px;
}

.chat-sidebar-channel {
  padding: 10px;
}

pre[class*="language-"] {
  background-color: #f5f5f5 !important; /* 覆蓋默認的 PrismJS 背景色 */
}
</style>
