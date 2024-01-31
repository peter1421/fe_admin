<template>
  <el-dialog :visible.sync="dialogVisible" :title="curId ? '編輯用戶' : '新增用戶'" width="700px" :before-close="close">
    <el-form ref="ruleForm" label-position="left  " :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用戶名" prop="username">
        <el-input v-model="ruleForm.username" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item label="手機號" prop="mobile">
        <el-input v-model="ruleForm.mobile" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item label="郵箱" prop="email">
        <el-input v-model="ruleForm.email" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item label="部門" prop="department">
        <treeselect
          v-model="ruleForm.department"
          :options="departmentsData"
          style="width: 178px"
          placeholder="選擇部門"
        />
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select v-model="ruleForm.roles" multiple placeholder="選擇角色">
          <el-option
            v-for="item in rolesData"
            :key="item.name"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { getUser, updateUser, createUser } from '@/api/system/users'
import { getRoles } from '@/api/system/roles'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'CuForm',
  components: { Treeselect },
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
        username: [{ required: true, trigger: 'blur', message: '用戶名不能為空' }],
        // mobile: [{ pattern: /^1[3-9]\d{9}$/, message: '請輸入正確的手機號' }],
        email: [{ type: 'email', message: '請輸入正確的郵箱地址', trigger: ['blur', 'change'] }]
      }
    }
  },
  watch: {
    dialogVisible(v) {
      if (v) {
        if (this.curId) {
          // 編輯
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
    // 提交表單
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
                message: '新增成功, 默認密碼123456',
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
