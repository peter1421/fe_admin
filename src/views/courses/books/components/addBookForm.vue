<template>
  <el-dialog :visible.sync="dialogVisible" :title="curId ? '編輯書籍' : '新增書籍'" width="700px" :before-close="close">
    <el-form ref="ruleForm" label-position="left  " :model="bookForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
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
        </el-select>
      </el-form-item>
      <el-form-item label="難度">
        <el-select v-model="bookForm.difficulty" placeholder="請選擇">
          <el-option label="簡單" value="easy" />
          <el-option label="中等" value="medium" />
          <el-option label="困難" value="hard" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">送出</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { createBook, getBook, updateUser } from '@/api/courses/books'
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
    },
    departmentsData: {
      type: Array,
      default: () => {
        return
      }
    }

  },

  data() {
    return {
      ruleForm: {
        username: '',
        name: '',
        mobile: '',
        email: '',
        department: null,
        roles: null
      },
      rolesData: [],
      rules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        mobile: [{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
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
          // 编辑
        // this.$nextTick(() => {
        //   getUser(this.curId).then(res => {
        //     this.ruleForm = res.data
        //   })
        // })
          getBook(this.curId).then(res => {
            this.ruleForm = res.data
            console.log(this.ruleForm)
          })
        }
        this.getRoles()
      }
    }
  },
  methods: {
    close() {
      this.$refs.ruleForm.resetFields()
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
      console.log(this.bookForm)
      this.saveBook()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.bookId) {
            updateUser(this.bookId, this.bookForm).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.search()
            })
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            createBook(this.bookForm).then(res => {
              this.$message({
                message: this.bookForm.name + '新增成功',
                type: 'success'
              })
              this.search()
            })
            this.$message({
              message: this.bookForm.name + '新增成功',
              type: 'success'
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
