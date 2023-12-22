<template>
  <div class="app-container">
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
                <div class="col-lg-6 chat-data-left scroller">
                  <div class="chat-sidebar-channel scroller mt-2 pl-3">
                    <pre class="line-numbers"><code class="language-python">
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
                                        </code></pre>
                  </div>
                </div>
                <div class="col-lg-6 chat-data p-0 chat-data-right">
                  <div class="tab-content">
                    <div
                      id="chatbox1"
                      class="tab-pane fade active show"
                      role="tabpanel"
                    >
                      {% comment %}
                      <div id="chatbox1" class="tab-pane fade" role="tabpanel">
                        {% endcomment %}

                        <div id="chat-area" class="chat-content scroller">
                          <!-- 聊天内容将在这里显示 -->
                        </div>

                        <!-- 聊天輸入區塊 -->
                        <div class="chat-footer p-3 bg-white">
                          <form
                            id="chat-form"
                            class="d-flex align-items-center"
                            action="javascript:void(0);"
                          >
                            <input
                              id="message-input"
                              type="text"
                              class="form-control mr-3"
                              placeholder="Type your message"
                            >
                            <button
                              type="submit"
                              class="btn btn-primary d-flex align-items-center p-2"
                            >
                              <i
                                class="fa fa-paper-plane-o"
                                aria-hidden="true"
                              /><span class="d-none d-lg-block ml-1">Send</span>
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
import { getDepartments, deleteDepartment, deleteDepartments } from '@/api/system/departments'
export default {
  name: 'Departments',
  data() {
    return {
      form: {
        search: '',
        ordering: 'id'
      },
      tableData: [],
      isAllSelect: false,
      multipleSelection: [],
      // cuForm数据
      cuDialogVisible: false,
      curId: null
    }
  },
  created() {
    this.search()
  },
  methods: {
    // 获取部门Tree列表/搜索功能
    search() {
      getDepartments(this.form).then(res => {
        this.tableData = res.data.results
      })
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
      this.search()
    },
    // 删除部门
    deleteDepartment(row) {
      this.$confirm('此操作将删除部门 "' + row.name + '" 及其子部门' + ' , 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDepartment(row.id).then(res => {
          this.$message({
            message: '删除部门' + row.name + '成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // 批量删除部门
    deleteDepartments() {
      this.$confirm('此操作将删除选中部门及其子部门' + ', 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDepartments(this.multipleSelection).then(res => {
          this.$message({
            message: '删除部门成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // table全选事件
    selectAllChange(selection) {
      // 如果选中的数目与请求到的数目相同就选中所有子节点，否则就清空
      console.log(selection)
      if (selection && selection.length === this.tableData.length && selection[0].id === this.tableData[0].id) {
        selection.forEach(val => {
          this.selectChange(selection, val)
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },
    // 选项框点击事件
    selectChange(selection, row) {
      // 如果selection中存在row代表是选中，否则是取消选中
      if (selection.indexOf(row) !== -1) {
        if (row.children) {
          row.children.forEach(val => {
            selection.push(val)
            this.$refs.table.toggleRowSelection(val, true)
            this.selectChange(selection, val)
          })
        }
      } else {
        this.reverseRowSelection(selection, row)
      }
    },
    // 取消选择
    reverseRowSelection(selection, data) {
      if (data.children) {
        data.children.forEach(val => {
          this.$refs.table.toggleRowSelection(val, false)
          if (val.children) {
            this.reverseRowSelection(selection, val)
          }
        })
      }
    },
    // 选项改变时触发
    handleSelectionChange(val) {
      const deleteIds = []
      this.$refs.table.selection.forEach(data => deleteIds.push(data.id))
      this.multipleSelection = deleteIds
    },
    // cuForm子组件
    createDepartment() {
      this.cuDialogVisible = true
    },
    updateDepartment(row) {
      this.curId = row.id
      this.cuDialogVisible = true
    },
    close() {
      this.cuDialogVisible = false
      this.curId = null
    }
  }
}
</script>
