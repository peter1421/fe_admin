<template>
  <div class="app-container">
    <el-form ref="form" :model="form" inline>
      <el-form-item prop="search">
        <el-input v-model="form.search" clearable style="width:300px" prefix-icon="el-icon-search" placeholder="輸入權限名、描述、路徑搜索" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-search" size="medium" @click="search(form)">搜索</el-button>
        <el-button type="warning" icon="el-icon-refresh-left" size="medium" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button v-permission="['admin','system-permissions-add']" type="primary" style="margin-bottom:20px" icon="el-icon-plus" size="medium" @click="createPermission()">新增</el-button>
    <el-button v-permission="['admin','system-permissions-mdel']" type="danger" icon="el-icon-delete" :disabled="multipleSelection.length ? false : true" size="medium" @click="deletePermissions(form)">刪除</el-button>
    <el-table
      ref="table"
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @select-all="selectAllChange"
      @selection-change="handleSelectionChange"
      @select="selectChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="name"
        label="權限名"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="sign"
        label="權限標識"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="menu"
        label="是否為菜單"
        width="120"
      >
        <template slot-scope="{row}">
          <el-tag v-if="row.menu">是</el-tag>
          <el-tag v-else type="warning">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="path"
        label="請求路徑"
      />
      <el-table-column
        prop="method"
        label="請求方法"
        width="100"
      />
      <el-table-column
        prop="desc"
        label="描述"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="220"
      >
        <template slot-scope="{row}">
          <el-button v-permission="['admin','system-permissions-update']" type="primary" icon="el-icon-edit" size="mini" @click="updatePermission(row)">編輯</el-button>
          <el-button v-permission="['admin','system-permissions-del']" type="danger" icon="el-icon-delete" size="mini" @click="deletePermission(row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <cuForm :dialog-visible="cuDialogVisible" :cur-id="curId" :permissions="tableData" @close="close" @search="search" />
  </div>
</template>
<script>
import cuForm from './components/cuForm'
import { getPermissions, deletePermission, deletePermissions } from '@/api/system/permissions'
export default {
  name: 'Permissions',
  components: { cuForm },
  data() {
    return {
      form: {
        search: '',
        ordering: 'id'
      },
      tableData: [],
      isAllSelect: false,
      multipleSelection: [],
      // cuForm數據
      cuDialogVisible: false,
      curId: null
    }
  },
  created() {
    this.search()
  },
  methods: {
    // 獲取權限Tree列表/搜索功能
    search() {
      getPermissions(this.form).then(res => {
        this.tableData = res.data.results
      })
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
      this.search()
    },
    // 刪除權限
    deletePermission(row) {
      this.$confirm('此操作將刪除權限 "' + row.name + '" 及其子權限' + ' , 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePermission(row.id).then(res => {
          this.$message({
            message: '刪除權限' + row.name + '成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // 批量刪除權限
    deletePermissions() {
      this.$confirm('此操作將刪除選中權限及其子權限' + ', 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePermissions(this.multipleSelection).then(res => {
          this.$message({
            message: '刪除權限成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // table全選事件
    selectAllChange(selection) {
      // 如果選中的數目與請求到的數目相同就選中所有子節點，否則就清空
      console.log(selection)
      if (selection && selection.length === this.tableData.length && selection[0].id === this.tableData[0].id) {
        selection.forEach(val => {
          this.selectChange(selection, val)
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },
    // 選項框點擊事件
    selectChange(selection, row) {
      // 如果selection中存在row代表是選中，否則是取消選中
      if (selection.indexOf(row) !== -1) {
        if (row.children) {
          row.children.forEach(val => {
            selection.push(val)
            this.$refs.table.toggleRowSelection(val, true)
            this.selectChange(selection, val)
          })
        }
      } else {
        this.reverseRowSelection(selection, row)
      }
    },
    // 取消選擇
    reverseRowSelection(selection, data) {
      if (data.children) {
        data.children.forEach(val => {
          this.$refs.table.toggleRowSelection(val, false)
          if (val.children) {
            this.reverseRowSelection(selection, val)
          }
        })
      }
    },
    // 選項改變時觸發
    handleSelectionChange(val) {
      const deleteIds = []
      this.$refs.table.selection.forEach(data => deleteIds.push(data.id))
      this.multipleSelection = deleteIds
    },
    // cuForm子組件
    createPermission() {
      this.cuDialogVisible = true
    },
    updatePermission(row) {
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
