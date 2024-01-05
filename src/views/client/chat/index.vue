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
df = pd.read_csv('sales_data.csv')

# 顯示前五行數據以檢查數據是否正確載入
print(df.head())

# 基本的數據處理
# 計算每個商品的總銷售額
df['Total_Sales'] = df['Quantity'] * df['Price']

# 分組聚合，按商品名稱計算總銷售額
total_sales_per_product = df.groupby('Product')['Total_Sales'].sum()

# 輸出結果
print("Total Sales per Product:")
print(total_sales_per_product)

# 也可以進行其他統計計算，比如平均銷售價格等
average_price_per_product = df.groupby('Product')['Price'].mean()
print("Average Price per Product:")
print(average_price_per_product)
      `,
      tableData: [],
      isAllSelect: false,
      multipleSelection: [],
      // cuForm数据
      cuDialogVisible: false,
      curId: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      Prism.highlightAll()
    })
  },
  methods: {
    sendMessage(message) {
      this.newMessage = message
      if (!this.newMessage) return
      this.messages.push({ sender: 'user', text: this.newMessage })
      this.autoReply()
      this.newMessage = ''
    },
    autoReply() {
      setTimeout(() => {
        this.messages.push({ sender: 'bot', text: '嗨! 你好' })
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
