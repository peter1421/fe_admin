<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" :title="curId ? '編輯權限' : '新增權限'" width="700px" :before-close="close">
    <el-form ref="ruleForm" label-position="left  " :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="權限名" prop="name">
        <el-input v-model="ruleForm.name" clearable />
      </el-form-item>
      <el-form-item label="權限標識" prop="sign">
        <el-input v-model="ruleForm.sign" clearable />
      </el-form-item>
      <el-form-item label="是否為菜單" prop="menu">
        <el-switch
          v-model="ruleForm.menu"
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
      <template v-if="ruleForm.menu===false">
        <el-form-item label="請求方法" prop="method">
          <el-select v-model="ruleForm.method" clearable placeholder="選擇請求方法">
            <el-option
              v-for="item in permissionMethods"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="請求路徑" prop="path">
          <el-input v-model="ruleForm.path" clearable />
        </el-form-item>
      </template>
      <el-form-item label="父權限" prop="pid">
        <treeselect
          v-model="ruleForm.pid"
          :options="permissions"
          style="width: 178px"
          placeholder="選擇父權限"
        />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="ruleForm.desc" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { getPermission, updatePermission, createPermission, getPermissionMethods } from '@/api/system/permissions'
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
    permissions: {
      type: Array,
      default: () => {
        return
      }
    }
  },

  data() {
    return {
      ruleForm: {
        name: '',
        sign: '',
        menu: true,
        method: '',
        path: '',
        pid: null,
        desc: ''
      },
      permissionMethods: [],
      rules: {
        name: [{ required: true, trigger: 'blur', message: '權限名不能為空' }],
        sign: [{ required: true, trigger: 'blur', message: '權限標識不能為空' }],
        menu: [{ required: true, trigger: 'blur', message: '是否為菜單不能為空' }],
        method: [{ required: true, trigger: 'blur', message: '請求方法不能為空' }],
        path: [{ required: true, trigger: 'blur', message: '請求路徑不能為空' }]
      }
    }
  },
  watch: {
    dialogVisible(v) {
      if (v) {
        if (this.curId) {
          getPermission(this.curId).then(res => {
            this.ruleForm = res.data
          })
        }
        // 獲取請求方法
        this.getMethod()
      }
    }
  },
  methods: {
    close() {
      this.$refs.ruleForm.resetFields()
      this.ruleForm.method = ''
      this.ruleForm.path = ''
      this.$emit('close')
    },
    search() {
      this.close()
      this.$emit('search')
    },
    getMethod() {
      getPermissionMethods().then(res => {
        this.permissionMethods = res.data.results
      })
    },
    // 提交表單
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.curId) {
            if (!this.ruleForm.pid) {
              this.ruleForm.pid = null
            }
            if (this.ruleForm.menu === true) {
              this.ruleForm.method = ''
              this.ruleForm.path = ''
            }
            updatePermission(this.curId, this.ruleForm).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.search()
            })
          } else {
            createPermission(this.ruleForm).then(res => {
              this.$message({
                message: '新增成功',
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
