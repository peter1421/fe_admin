<template>
  <el-dialog :visible.sync="resetPassDialogVisible" title="重置密碼" width="700px" :before-close="close">
    <el-form ref="ruleForm" label-position="left  " :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密碼" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="確認密碼" prop="confirm_password">
        <el-input v-model="ruleForm.confirm_password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { resetPassword } from '@/api/system/users'
export default {
  name: 'CuForm',
  props: {
    resetPassDialogVisible: {
      type: Boolean,
      default: false
    },
    resetCurId: {
      type: Number,
      default: null
    }
  },

  data() {
    var validatePass = (rule, value, callback) => {
      if (this.ruleForm.confirm_password !== '') {
        this.$refs.ruleForm.validateField('confirm_password')
      }
      callback()
    }
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('兩次輸入密碼不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        password: '',
        confirm_password: ''
      },
      rules: {
        password: [
          { required: true, trigger: 'blur', message: '請輸入密碼' },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, trigger: 'blur', message: '請再次輸入密碼' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$refs.ruleForm.resetFields()
      this.$emit('resetClose')
    },
    // 提交表單
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          resetPassword(this.resetCurId, this.ruleForm).then(res => {
            this.$message({
              message: '重置成功',
              type: 'success'
            })
            this.close()
          })
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
