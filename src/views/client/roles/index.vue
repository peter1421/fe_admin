<template>
  <div class="app-container">
    <el-row>
      <el-col :span="17">
        <el-form ref="form" :model="form" inline>
          <el-form-item prop="search">
            <el-input v-model="form.search" clearable style="width:300px" prefix-icon="el-icon-search" placeholder="輸入角色名、描述搜索" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-search" size="medium" @click="search('search')">搜索</el-button>
            <el-button type="warning" icon="el-icon-refresh-left" size="medium" @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button v-permission="['admin','system-roles-add']" type="primary" style="margin-bottom:20px" icon="el-icon-plus" size="medium" @click="createRole()">新增</el-button>
        <el-button v-permission="['admin','system-roles-mdel']" type="danger" icon="el-icon-delete" :disabled="multipleSelection.length ? false : true" size="medium" @click="deleteRoles(form)">刪除</el-button>
      </el-col>
      <el-col :span="7">
        <el-steps :active="step" finish-status="success" simple style="margin-top: 20px; padding:20px 2%">
          <el-step title="點擊角色" />
          <el-step title="分配權限" />
          <el-step title="點擊授權" />
        </el-steps>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="17">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>角色列表</span>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            :row-key="getRowKeys"
            style="width: 100%"
            highlight-current-row
            @current-change="tableHandleCurrentChange"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              :selectable="checkSelectTable"
              width="55"
            />
            <el-table-column
              prop="name"
              label="角色"
            />
            <el-table-column
              prop="desc"
              label="描述"
            />
            <el-table-column
              prop="create_time"
              label="創建時間"
              width="180"
            />
            <el-table-column
              fixed="right"
              align="center"
              label="操作"
              width="220"
            >
              <template slot-scope="{row}">
                <el-button v-permission="['admin','system-roles-update']" type="primary" icon="el-icon-edit" size="mini" @click.native.stop="updateRole(row)">編輯</el-button>
                <el-button v-permission="['admin','system-roles-del']" type="danger" icon="el-icon-delete" size="mini" @click.native.stop="deleteRole(row)">刪除</el-button>
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
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="permissions-box-card" style="margin-left:10px">
          <div slot="header" class="clearfix">
            <span>權限分配</span>
            <el-button v-permission="['admin','system-roles-auth']" :disabled="!showButton" type="primary" style="float: right" icon="el-icon-check" size="medium" @click="authorize()">授權</el-button>
          </div>
          <el-tree
            ref="permissions"
            :data="permissionsData"
            :default-checked-keys="permissionIds"
            :props="defaultProps"
            check-strictly
            accordion
            show-checkbox
            node-key="id"
            @check="handleCheckClick"
          />
        </el-card>
      </el-col>
    </el-row>
    <cuForm :dialog-visible="cuDialogVisible" :cur-id="curId" @close="close" @search="search" />
  </div>
</template>
<script>
import cuForm from './components/cuForm'
import { getRoles, updateRolePermissions, deleteRole, deleteRoles } from '@/api/system/roles'
import { getPermissions } from '@/api/system/permissions'
export default {
  name: 'Roles',
  components: { cuForm },
  data() {
    return {
      form: {
        page: 1,
        size: 10,
        search: '',
        ordering: 'id'
      },
      tableData: [],
      total: 0,
      multipleSelection: [],
      currentId: null,
      // 權限數部分數據
      step: 0,
      showButton: false,
      permissionsData: [],
      permissionIds: [],
      defaultProps: { children: 'children', label: 'label' },
      // cuForm數據
      cuDialogVisible: false,
      curId: null
    }
  },
  created() {
    this.search()
    this.getPermissions()
  },
  methods: {
    // 獲取角色列表/搜索功能
    search(search) {
      if (search) {
        // 清空權限菜單部分數據
        this.showButton = false
        this.permissionIds = []
        this.$refs.permissions.setCheckedKeys([])
        this.changeDisabled(this.permissionsData, false)
        this.step = 0
        this.currentId = null
      }
      getRoles(this.form).then(res => {
        this.tableData = res.data.results
        this.total = res.data.count
      })
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
      this.search('search')
    },
    getRowKeys(row) {
      return row.id
    },
    // 獲取Permissions Tree的所有ID
    getAllPermissionDataId(array, datas) {
      for (const index in datas) {
        const id = datas[index].id
        array.push(id)
        if (datas[index].children) {
          this.getAllPermissionDataId(array, datas[index].children)
        }
      }
      return array
    },
    // 更改Permissions Tree的disabled屬性
    changeDisabled(data, disabled) {
      for (let index = 0; index < data.length; index++) {
        const children = data[index].children
        if (children !== undefined) {
          this.changeDisabled(children, disabled)
        }
        data[index].disabled = disabled
      }
    },
    // table選擇框功能的change事件
    handleSelectionChange() {
      const deleteIds = []
      this.$refs.multipleTable.selection.forEach(data => deleteIds.push(data.id))
      this.multipleSelection = deleteIds
    },
    // 設置admin角色行不可勾選
    checkSelectTable(row) {
      return row.name !== 'admin'
    },
    // table單選觸發單選
    tableHandleCurrentChange(val) {
      if (val) {
        // 清空菜單的選中
        this.$refs.permissions.setCheckedKeys([])
        if (val.name === 'admin') {
          this.changeDisabled(this.permissionsData, true)
          this.permissionIds = this.getAllPermissionDataId([], this.permissionsData)
          this.showButton = false
          this.step = 3
        } else {
          this.changeDisabled(this.permissionsData, false)
          // 保存當前的角色id
          this.currentId = val.id
          // 初始化默認選中的key
          this.permissionIds = val.permissions
          // 顯示授權按鈕
          this.showButton = true
          // 步驟顯示
          this.step = 1
        }
      }
    },
    // 刪除角色
    deleteRole(row) {
      this.$confirm('此操作將刪除角色 "' + row.name + '" , 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(row.id).then(res => {
          this.$message({
            message: '刪除角色' + row.name + '成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // 批量刪除用戶
    deleteRoles() {
      this.$confirm('此操作將刪除選中角色' + ', 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoles(this.multipleSelection).then(res => {
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
    // 獲取權限數結構數據
    getPermissions() {
      getPermissions().then(res => {
        this.permissionsData = res.data.results
      })
    },
    // tree權限節點被點擊時的回調
    handleCheckClick(currentObj, treeStatus) {
      if (this.currentId) {
        this.step = 2
      }
      // 用於：父子節點嚴格互不關聯時，父節點勾選變化時通知子節點同步變化，實現單向關聯。
      const selected = treeStatus.checkedKeys.indexOf(currentObj.id) // -1未選中
      // 選中
      if (selected !== -1) {
        // 子節點只要被選中父節點就被選中
        this.selectedParent(currentObj)
        // 統一處理子節點為相同的勾選狀態
        this.uniteChildSame(currentObj, true)
      } else {
        // 未選中 處理子節點全部未選中
        if (currentObj.children !== undefined) {
          if (currentObj.children.length !== 0) {
            this.uniteChildSame(currentObj, false)
          }
        }
      }
    },
    // 統一處理子節點為相同的勾選狀態
    uniteChildSame(treeList, isSelected) {
      this.$refs.permissions.setChecked(treeList.id, isSelected)
      if (treeList.children !== undefined) {
        for (let i = 0; i < treeList.children.length; i++) {
          this.uniteChildSame(treeList.children[i], isSelected)
        }
      }
    },
    // 統一處理父節點為選中
    selectedParent(currentObj) {
      const currentNode = this.$refs.permissions.getNode(currentObj)
      if (currentNode.parent.key !== undefined) {
        this.$refs.permissions.setChecked(currentNode.parent, true)
        this.selectedParent(currentNode.parent)
      }
    },
    // 角色授權
    authorize() {
      this.step = 3
      const permissionIds = this.$refs.permissions.getCheckedKeys()
      updateRolePermissions(this.currentId, permissionIds).then(res => {
        this.$message({
          message: '授權成功',
          type: 'success'
        })
        this.search()
      })
    },
    // cuForm子組件
    createRole() {
      this.cuDialogVisible = true
    },
    updateRole(row) {
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
<style lang="scss" scoped>
.permissions-box-card{
  ::v-deep{
    .el-card__body{
      max-height: 400px;
      overflow-y: auto;
    }
  }
}

</style>
