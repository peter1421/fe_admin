<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-input v-model="filterText" clearable style="width:90%; margin-bottom: 20px;" prefix-icon="el-icon-search" placeholder="輸入班級名稱搜搜尋" />
        <el-tree
          ref="tree"
          class="filter-tree"
          :data="departmentsData"
          :props="defaultProps"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
        />
      </el-col>
      <el-col :span="20">
        <el-form ref="form" :model="form" inline>
          <el-form-item prop="search">
            <el-input v-model="form.search" clearable style="width:300px" prefix-icon="el-icon-search" placeholder="輸入學生名稱、手機號碼、電子郵件搜尋" />
          </el-form-item>
          <el-form-item prop="is_active">
            <el-select v-model="form.is_active" style="width:100px" clearable placeholder="狀態">
              <el-option label="啟動" value="true" />
              <el-option label="鎖定" value="false" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-search" size="medium" @click="search(form)">搜尋</el-button>
            <el-button type="warning" icon="el-icon-refresh-left" size="medium" @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button v-permission="['admin','system-users-add']" type="primary" style="margin-bottom:20px" icon="el-icon-plus" size="medium" @click="createUser()">新增</el-button>
        <el-button v-permission="['admin','system-users-mdel']" type="danger" icon="el-icon-delete" :disabled="multipleSelection.length ? false : true" size="medium" @click="deleteUsers(form)">刪除</el-button>
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />

          <el-table-column
            prop="role_name"
            label="身分"
          />
          <el-table-column
            prop="username"
            label="用戶名"
          />
          <el-table-column
            prop="name"
            label="姓名"
          />
          <el-table-column
            prop="mobile"
            label="暱稱"
            width="180"
          />
          <el-table-column
            prop="email"
            label="郵件"
            width="180"
          />
          <el-table-column
            prop="department_name"
            label="班級"
          />
          <el-table-column
            prop="gender"
            label="性別"
            width="180"
          />
          <el-table-column
            prop="date_joined"
            label="新增時間"
            width="180"
          />
          <el-table-column
            label="狀態"
            align="center"
            width="100"
          >
            <template slot-scope="{row}">
              <!-- v-model="row.is_active" -->
              <el-switch
                v-model="row.is_active"
                :disabled="!checkPermission(['admin','system-users-lock'])||row.id === userId"
                :active-value="true"
                :inactive-value="false"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeIsActive($event, row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="動作"
            width="230"
          >
            <template slot-scope="{row}">
              <el-button v-permission="['admin','system-users-update']" type="primary" icon="el-icon-edit" size="mini" @click="updateUser(row)" />
              <el-button v-permission="['admin','system-users-del']" type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(row)" />
              <el-tooltip content="使用者權限" placement="top">
                <el-button v-permission="['admin','system-users-permissions']" type="warning" icon="el-icon-user-solid" size="mini" @click="userPermissions(row)" />
              </el-tooltip>
              <el-tooltip content="修改密碼" placement="top">
                <el-button v-permission="['admin','system-users-reset-pwd']" type="warning" size="mini" @click="resetPass(row)"><svg-icon icon-class="reset_password" /></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--分頁組件-->
        <el-pagination
          :current-page="1"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
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
import { getRoles } from '@/api/system/roles'
import { mapGetters } from 'vuex'
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
      permissionsDialogVisible: false,
      rolesData: []
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
    this.getRoles()
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
        // 遍历用户数据，修改 roles
        this.change()
      })
    },
    change() {
      this.tableData.forEach(user => {
        // 由于每个用户只有一个角色，可以直接通过 user.roles[0] 获取该角色ID
        const roleId = user.roles[0] // 获取用户的角色ID
        const role = this.rolesData.find(r => r.id === roleId) // 根据角色ID查找对应的角色对象
        user.role_name = role ? role.name : `null` // 如果找到对应的角色，则将其名称分配给 role_name，否则显示角色ID的提示信息
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
    },
    getRoles() {
      getRoles().then(res => {
        this.rolesData = res.data.results
      })
    }
  }

}
</script>
