<template>
  <div class="app-container">
    <el-form ref="form" :model="form" inline>
      <el-form-item prop="search">
        <el-input v-model="form.search" clearable style="width:300px" prefix-icon="el-icon-search" placeholder="搜尋班級" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-search" size="medium" @click="search(form)">搜尋</el-button>
        <el-button type="warning" icon="el-icon-refresh-left" size="medium" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button v-permission="['admin','system-departments-add']" type="primary" style="margin-bottom:20px" icon="el-icon-plus" size="medium" @click="createDepartment()">新增</el-button>
    <el-button v-permission="['admin','system-departments-mdel']" type="danger" icon="el-icon-delete" :disabled="multipleSelection.length ? false : true" size="medium" @click="deleteDepartments(form)">刪除</el-button>
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
        label="班級"
      />
      <el-table-column
        prop="create_time"
        label="新增時間"
      />
      <el-table-column
        fixed="right"
        align="center"
        label="動作"
        width="220"
      >
        <template slot-scope="{row}">
          <el-button v-permission="['admin','system-departments-update']" type="primary" icon="el-icon-edit" size="mini" @click="updateDepartment(row)">編輯</el-button>
          <el-button v-permission="['admin','system-departments-del']" type="danger" icon="el-icon-delete" size="mini" @click="deleteDepartment(row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <cuForm :dialog-visible="cuDialogVisible" :cur-id="curId" :departments="tableData" @close="close" @search="search" />
  </div>
</template>
<script>
import cuForm from './components/cuForm'
import { getDepartments, deleteDepartment, deleteDepartments } from '@/api/system/departments'
export default {
  name: 'Departments',
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
    // 獲取部門Tree列表/搜索功能
    search() {
      getDepartments(this.form).then(res => {
        this.tableData = res.data.results
      })
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
      this.search()
    },
    // 刪除部門
    deleteDepartment(row) {
      this.$confirm('此動作將刪除班級 "' + row.name + '" 及其群組' + ' , 是否繼續？', '提醒', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDepartment(row.id).then(res => {
          this.$message({
            message: '刪除班級' + row.name + '成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // 批量刪除部門
    deleteDepartments() {
      this.$confirm('此操作將刪除選中部門及其子部門' + ', 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDepartments(this.multipleSelection).then(res => {
          this.$message({
            message: '刪除部門成功',
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
    createDepartment() {
      this.cuDialogVisible = true
    },
    updateDepartment(row) {
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
