<template>
  <div class="app-container">
    <div id="content-page" class="content-page">
      <div class="row">
        <div class="col-sm-12">
          <div class="iq-card">
            <div class="iq-card-body chat-page p-0">
              <div class="chat-head">
                <header
                  class="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3"
                >
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
              </div>
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
                          <div v-for="(message, index) in messages" :key="index" class="chat" :class="{'chat-left': message.sender === 'bot'}">
                            <div class="chat-message">
                              <p>{{ message.text }}</p>
                            </div>
                          </div>
                        </div>

                        <!-- 聊天輸入區塊 -->
                        <div class="chat-footer p-3 bg-white">
                          <form @submit.prevent="sendMessage">
                            <input v-model="newMessage" type="text" class="form-control mr-3" placeholder="Type your message">
                            <button type="submit" class="btn btn-primary d-flex align-items-center p-2">
                              <span class="d-none d-lg-block ml-1">Send</span>
                            </button>
                          </form>
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
  </div>
</template>
<script>
import '../../../assets/css/bootstrap.min.css'
import '../../../assets/css/style.css'
import '../../../assets/css/remixicon.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css' // 主題樣式
import 'prismjs/plugins/line-numbers/prism-line-numbers.css' // 行號樣式
export default {
  name: 'CodeHighlighter',
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
    sendMessage() {
      if (!this.newMessage) return
      this.messages.push({ sender: 'user', text: this.newMessage })
      this.autoReply()
      this.newMessage = ''
    },
    autoReply() {
      setTimeout(() => {
        this.messages.push({ sender: 'bot', text: '嗨! 有什么我可以帮助你的吗?' })
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
