<template>
  <div class="app-container">
    <!-- Categories Start -->
    <div class="container-xxl py-5 category">
      <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 class="section-title bg-white text-center text-primary px-3">
            Categories
          </h6>
          <h1 class="mb-5">課程選單</h1>
        </div>
        <div class="row g-3">
          <div class="col-lg-12 col-md-12">
            <div class="row g-3">
              <div class="col-lg-4 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                <a class="position-relative d-block overflow-hidden" href="#/client/books" style="height: 100%;"><!--使用此style不好，但先將就-->
                  <img class="img-fluid" :src="require('@/assets/img/cat-1.png')" alt="" style="height: 100%;"> <!--會因照片造成區塊大小不一 可針對照片進行設定-->
                  <div class="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style="margin: 1px">
                    <h5 class="m-0">魚姊姊</h5>
                    <small class="text-primary">聊書機器人</small>
                  </div>
                </a>
              </div>
              <div class="col-lg-4 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                <a class="position-relative d-block overflow-hidden" href="" style="height: 100%;">
                  <img class="img-fluid" :src="require('@/assets/img/cat-2.png')" alt="" style="height: 100%;">
                  <div
                    class="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                    style="margin: 1px"
                  >
                    <h5 class="m-0">視覺化課程</h5>
                    <small class="text-primary">0 Courses</small>
                  </div>
                </a>
              </div>
              <div class="col-lg-4 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                <a class="position-relative d-block overflow-hidden" href="" style="height: 100%;">
                  <img class="img-fluid" :src="require('@/assets/img/cat-3.png')" alt="" style="height: 100%;">

                  <div
                    class="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                    style="margin: 1px"
                  >
                    <h5 class="m-0">python 課程</h5>
                    <small class="text-primary">0 Courses</small>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Categories Start -->

    <cuForm :dialog-visible="cuDialogVisible" :departments-data="departmentsData" :cur-id="curId" @close="close" @search="search" />
    <resetPwdForm :reset-pass-dialog-visible="resetPassDialogVisible" :reset-cur-id="curId" @resetClose="resetClose" />
    <permissionsDialog :permissions-dialog-visible="permissionsDialogVisible" :user-id="curId" @permissionsClose="permissionsClose" />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import cuForm from './components/cuForm'
import resetPwdForm from './components/resetPwdForm'
import permissionsDialog from './components/permissionsDialog'
import { getUsers, updateUserActive, deleteUser, deleteUsers } from '@/api/system/users'
import { getDepartments } from '@/api/system/departments'
import { mapGetters } from 'vuex'
import '../../../assets/css/bootstrap.min.css'
import '../../../assets/css/style.css'
import '../../../assets/css/responsive.css'

export default {
  name: 'Users',
  components: { cuForm, resetPwdForm, permissionsDialog },
  data() {
    return {
      form: {
        page: 1,
        size: 10,
        search: '',
        is_active: '',
        ordering: 'id',
        department_id: ''
      },
      tableData: [],
      total: 0,
      multipleSelection: [], // 已選擇的用戶id數組
      filterText: '',
      departmentsData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 以下為cuForm子組件數據
      cuDialogVisible: false,
      curId: null,
      // 以下為resetPwdForm子組件數據
      resetPassDialogVisible: false,
      // permissionsDialog子組件
      permissionsDialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.search()
    this.getDepartments()
  },
  methods: {
    checkPermission,
    // 獲取部門Tree結構
    getDepartments() {
      getDepartments().then(res => {
        this.departmentsData = res.data.results
      })
    },
    // 部門Tree過濾方法
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 過濾部門下的用戶列表
    handleNodeClick(data) {
      this.form.department_id = data.id
      this.search()
    },
    // 獲取用戶列表/搜索功能
    search() {
      getUsers(this.form).then(res => {
        this.tableData = res.data.results
        this.total = res.data.count
      })
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
      // form中未使用department_id字段需手動清除
      this.form.department_id = ''
      this.search()
    },
    // 修改用戶狀態
    changeIsActive(event, row) {
      const message = !event ? '鎖定' : '激活'
      this.$confirm('此操作將' + message + '用戶 "' + row.username + '" , 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { 'is_active': row.is_active }
        updateUserActive(row.id, data).then(res => {
          this.$message({
            message: message + row.username + '成功',
            type: 'success'
          })
        }).catch(() => {
          row.is_active = !row.is_active
        })
      }).catch(() => {
        row.is_active = !row.is_active
      })
    },
    // 刪除用戶
    deleteUser(row) {
      this.$confirm('此操作將刪除用戶 "' + row.username + '" , 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row.id).then(res => {
          this.$message({
            message: '刪除用戶' + row.username + '成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },

    // table選擇功能的change事件
    handleSelectionChange() {
      const deleteIds = []
      this.$refs.multipleTable.selection.forEach(data => deleteIds.push(data.id))
      this.multipleSelection = deleteIds
    },

    // 批量刪除用戶
    deleteUsers() {
      this.$confirm('此操作將刪除選中用戶' + ', 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUsers(this.multipleSelection).then(res => {
          this.$message({
            message: '刪除用戶成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // 分頁
    handleSizeChange(val) {
      this.form.size = val
      this.search()
    },
    handleCurrentChange(val) {
      this.form.page = val
      this.search()
    },
    // cuForm子組件
    createUser() {
      this.cuDialogVisible = true
    },
    updateUser(row) {
      this.curId = row.id
      this.cuDialogVisible = true
    },
    close() {
      this.cuDialogVisible = false
      this.curId = null
    },
    // 重置密碼子組件
    resetPass(row) {
      this.resetPassDialogVisible = true
      this.curId = row.id
    },
    resetClose() {
      this.resetPassDialogVisible = false
      this.curId = null
    },
    // 用戶權限組件
    userPermissions(row) {
      this.permissionsDialogVisible = true
      this.curId = row.id
    },
    permissionsClose() {
      this.permissionsDialogVisible = false
      this.curId = null
    }
  }

}
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#chat-form').onsubmit = function() {
    const messageInput = document.querySelector('#message-input')
    const message = messageInput.value.trim() // 使用 trim() 移除兩端空白字符
    messageInput.value = '' // 清空輸入框

    if (message.length <= 0 || message.length > 500) {
      alert('你在填三小啦')
      return false
    }
    let emotion = 'excited' // 預設

    if (message.includes('sad')) {
      emotion = 'sad'
    } else if (message.includes('angry')) {
      emotion = 'angry'
    } else if (message.includes('excited')) {
      emotion = 'excited'
    } else if (message.includes('happy')) {
      emotion = 'happy'
    } else if (message.includes('neutral')) {
      emotion = 'neutral'
    } else if (message.includes('fearful')) {
      emotion = 'fearful'
    }
    // 顯示用戶消息
    const userMessageDiv = document.createElement('div')
    userMessageDiv.className = 'chat'
    userMessageDiv.innerHTML = `<div class="chat-message"><p>${message}</p></div>`
    document.querySelector('#chat-area').appendChild(userMessageDiv)

    // 發送 AJAX 請求到 Django 視圖
    fetch("{% url 'chatgpt_post' %}", {
      method: 'POST',
      body: JSON.stringify({ message: message }),
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // 顯示 ChatGPT 的回復
        const gptResponseDiv = document.createElement('div')
        gptResponseDiv.className = 'chat chat-left'
        gptResponseDiv.innerHTML = `<div class="chat-message"><p>${data.response}</p></div>`
        document.querySelector('#chat-area').appendChild(gptResponseDiv)
        speak(data.response, emotion)
      })
      .then(() => {
        // 滾動到底部
        const chatArea = document.querySelector('#chat-area')
        chatArea.scrollTop = chatArea.scrollHeight
      })
      .catch((error) => {
        console.error('Error:', error)
      })

    return false
  }
})

function getCookie(name) {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}
// JavaScript函數來控制語音
function speak(response, emotion) {
  var synth = window.speechSynthesis
  var utterThis = new SpeechSynthesisUtterance(response)
  switch (emotion) {
    case 'excited':
      utterThis.rate = 1.5 // 加快語速
      utterThis.pitch = 1.5 // 提高音調
      break
    case 'angry':
      utterThis.rate = 1.2 // 輕微加快語速
      utterThis.pitch = 0.7 // 降低音調
      utterThis.volume = 1.2 // 提高音量
      break
    case 'sad':
      utterThis.rate = 0.8 // 減慢語速
      utterThis.pitch = 0.6 // 降低音調
      utterThis.volume = 0.7 // 減少音量
      break
    case 'fearful':
      utterThis.rate = 1.1 // 輕微加快語速
      utterThis.pitch = 1.4 // 提高音調
      utterThis.volume = 0.7 // 減少音量
      break
    case 'surprised':
      utterThis.rate = 1.0 // 正常語速
      utterThis.pitch = 1.6 // 大幅提高音調
      break
    case 'calm':
      utterThis.rate = 1.0 // 正常語速
      utterThis.pitch = 0.8 // 略低音調
      break
        // 可以添加更多情感的處理
  }
  utterThis.onend = function() {
    // 模擬說完話後恢復原來表情
    document.getElementById('character').src =
          "{% core_custom_tag 'images/chat/fish1.gif' %}"
  }
  synth.speak(utterThis)

  // 更新GIF來模擬表情變化
  document.getElementById('character').src =
        "{% core_custom_tag 'images/chat/fish2.gif' %}"
}
</script>
<style scoped>
/* 導航欄的 CSS */

</style>
