<template>
  <el-dialog :visible.sync="dialogVisible" :title="curId ? '編輯書籍' : '新增書籍'" width="700px" :before-close="close">
    <el-form ref="bookForm" label-position="left  " :model="bookForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="書籍名稱" required>
        <el-input v-model="bookForm.name" />
      </el-form-item>
      <el-form-item label="書籍簡介">
        <el-input v-model="bookForm.description" type="textarea" />
      </el-form-item>
      <el-form-item label="書籍內容">
        <el-input v-model="bookForm.content" type="textarea" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="bookForm.author" />
      </el-form-item>
      <el-form-item label="出版社">
        <el-input v-model="bookForm.publisher" />
      </el-form-item>
      <el-form-item label="出版日期">
        <el-date-picker v-model="bookForm.publish_date" type="date" placeholder="選擇日期" />
      </el-form-item>
      <el-form-item label="分類">
        <el-select v-model="bookForm.category" placeholder="請選擇">
          <el-option label="小說" value="fiction" />
          <el-option label="非小說" value="nonfiction" />
          <el-option label="科學" value="science" />
          <el-option label="歷史" value="history" />
          <el-option label="故事" value="story" />
          <el-option label="人社" value="人社" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="難度">
        <el-select v-model="bookForm.difficulty" placeholder="請選擇">
          <el-option label="繪本" value="繪本" />
          <el-option label="橋梁書" value="橋梁書" />
          <el-option label="初階文字書" value="初階文字書" />
          <el-option label="中階文字書" value="中階文字書" />
          <el-option label="高階文字書" value="高階文字書" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('bookForm')">送出</el-button>
        <el-button @click="resetForm('bookForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { createBook, getBook, updateBook } from '@/api/courses/books'
import { getRoles } from '@/api/system/roles'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'CuForm',
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    bookId: {
      type: Number,
      default: null
    },
    curId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      rolesData: [],
      rules: {
        name: [{ required: true, message: '書名不能為空', trigger: 'blur' }],
        description: [],
        content: [],
        author: [],
        publisher: [],
        publish_date: [
          { type: 'date', message: '請輸入正確的日期格式', trigger: ['blur', 'change'] }
        ],
        category: [],
        difficulty: []
      },
      bookForm: {
        name: null,
        description: null,
        content: null,
        author: null,
        publisher: null,
        publish_date: null,
        category: null,
        difficulty: null
      }
    }
  },
  watch: {
    dialogVisible(v) {
      if (v) {
        if (this.curId) {
          getBook(this.curId).then(res => {
            this.bookForm = res.data
          })
        }
        this.getRoles()
      }
    }
  },
  methods: {
    close() {
      this.$refs.bookForm.resetFields()
      this.$emit('close')
    },
    search() {
      this.close()
      this.$emit('search')
    },
    getRoles() {
      getRoles().then(res => {
        this.rolesData = res.data.results
      })
    },
    saveBook() {
      // 格式化 publish_date
      if (this.bookForm.publish_date) {
        const date = new Date(this.bookForm.publish_date)
        const formattedDate = date.toISOString().split('T')[0]
        this.bookForm.publish_date = formattedDate
      }
    },
    // 提交表单
    submitForm(formName) {
      this.saveBook()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.curId) {
            updateBook(this.curId, this.bookForm).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.search()
            })
          } else {
            createBook(this.bookForm).then(res => {
              this.$message({
                message: this.bookForm.name + '新增成功',
                type: 'success'
              })
              this.search()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
