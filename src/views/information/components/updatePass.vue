<template>
  <el-dialog :visible.sync="dialogVisible" title="修改密碼" width="500px" :before-close="close">
    <el-form ref="ruleForm" label-position="left  " :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="舊密碼" prop="old_password">
        <el-input v-model="ruleForm.old_password" type="password" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密碼" prop="password">
        <el-input v-model="ruleForm.password" type="password" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item label="確認密碼" prop="confirm_password">
        <el-input v-model="ruleForm.confirm_password" type="password" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import store from '@/store'
import { changePassword } from '@/api/information/centre'
export default {
  name: 'UpdatePassword',
  data() {
    const confirmPass = (rule, value, callback) => {
      if (value) {
        if (this.ruleForm.password !== value) {
          callback(new Error('兩次輸入的密碼不一致'))
        } else {
          callback()
        }
      } else {
        callback(new Error('請再次輸入密碼'))
      }
    }
    return {
      dialogVisible: false,
      ruleForm: {
        old_password: '',
        password: '',
        confirm_password: ''
      },
      rules: {
        old_password: [
          { required: true, message: '請輸入舊密碼', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '請輸入新密碼', trigger: 'blur' },
          { min: 6, max: 20, message: '長度在 6 到 20 個字符', trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, validator: confirmPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
    },
    // 提交表單
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePassword(this.ruleForm).then(res => {
            this.$message({
              message: '密碼修改成功，請重新登錄',
              type: 'success'
            })
            setTimeout(() => {
              store.dispatch('user/logout').then(() => {
                location.reload() // 為了重新實例化vue-router對象 避免bug
              })
            }, 1500)
          })
        } else {
          return false
        }
      })
    },
    // 重置表單
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
