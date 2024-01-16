<template>
  <el-dialog :visible.sync="dialogVisible" :title="curId ? '編輯使用者' : '新增使用者'" width="700px" :before-close="close">
    <el-form ref="ruleForm" label-position="left  " :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
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
import { getUser, updateUser, createUser } from '@/api/system/users'
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
        name: '',
        description: '',
        content: '',
        author: '',
        publisher: '',
        publish_date: '',
        category: '',
        difficulty: ''
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
          getUser(this.curId).then(res => {
            this.ruleForm = res.data
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
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.curId) {
            if (!this.ruleForm.department) {
              this.ruleForm.department = null
            }
            updateUser(this.curId, this.ruleForm).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.search()
            })
          } else {
            createUser(this.ruleForm).then(res => {
              this.$message({
                message: '新增成功, 默认密码123456',
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
