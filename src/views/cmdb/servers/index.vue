<template>
  <div class="app-container">
    <el-form ref="form" :model="form" inline>
      <el-form-item prop="search">
        <el-input v-model="form.search" clearable style="width:320px" prefix-icon="el-icon-search" placeholder="輸入服務器名稱、編號、IP搜索" />
      </el-form-item>
      <el-form-item prop="asset_status">
        <el-select v-model="form.asset_status" style="width:120px" clearable placeholder="狀態">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-search" size="medium" @click="search(form)">搜索</el-button>
        <el-button type="warning" icon="el-icon-refresh-left" size="medium" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button v-permission="['admin','cmdb-servers-add']" type="primary" style="margin-bottom:20px" icon="el-icon-plus" size="medium" @click="createServer()">新增</el-button>
    <el-button v-permission="['admin','cmdb-servers-mdel']" type="danger" icon="el-icon-delete" :disabled="multipleSelection.length ? false : true" size="medium" @click="deleteServers(form)">刪除</el-button>
    <el-table
      ref="table"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px;"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="所在機房">
              <span>{{ props.row.idc }}</span>
            </el-form-item>
            <el-form-item label="所在機櫃">
              <span>{{ props.row.cabinet_display }}</span>
            </el-form-item>
            <el-form-item label="用途">
              <span>{{ props.row.server.use }}</span>
            </el-form-item>
            <el-form-item label="備注">
              <span>{{ props.row.memo }}</span>
            </el-form-item>
            <el-form-item label="系統類型">
              <span>{{ props.row.server.server_system_type_display }}</span>
            </el-form-item>
            <el-form-item label="系統版本">
              <span>{{ props.row.server.model }}</span>
            </el-form-item>
            <el-form-item label="用戶">
              <span v-for="(item,index) in props.row.server.accounts" :key="item.id">{{ index+1 }}、{{ item.username }}/{{ item.password }}/{{ item.port }}   </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="服務器名稱"
        prop="name"
        min-width="100"
        show-overflow-tooltip
      />
      <el-table-column
        label="設備編號"
        prop="sn"
        show-overflow-tooltip
      />
      <el-table-column
        label="類型"
        prop="server.server_type_display"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <el-tag v-if="row.server.server_type==='pm'" effect="plain">{{ row.server.server_type_display }}</el-tag>
          <el-tag v-else type="success" effect="plain">{{ row.server.server_type_display }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="系統"
        prop="server.server_system_type_display"
        show-overflow-tooltip
      />
      <el-table-column
        label="服務器狀態"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <el-tag v-if="row.asset_status===0">{{ row.asset_status_display }}</el-tag>
          <el-tag v-else-if="row.asset_status===1" type="success">{{ row.asset_status_display }}</el-tag>
          <el-tag v-else-if="row.asset_status===2" type="info">{{ row.asset_status_display }}</el-tag>
          <el-tag v-else-if="row.asset_status===3" type="danger">{{ row.asset_status_display }}</el-tag>
          <el-tag v-else type="warning">{{ row.asset_status_display }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="IP"
        prop="manage_ip"
        show-overflow-tooltip
      />
      <el-table-column
        label="管理員"
        prop="admin_display"
        show-overflow-tooltip
      />
      <el-table-column
        label="到期時間"
        prop="expire_day"
        show-overflow-tooltip
      />
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="200"
      >
        <template slot-scope="{row}">
          <el-button v-permission="['admin','cmdb-servers-update']" type="primary" icon="el-icon-edit" size="mini" @click="updateServer(row)">編輯</el-button>
          <el-button v-permission="['admin','cmdb-servers-del']" type="danger" icon="el-icon-delete" size="mini" @click="deleteServer(row)">刪除</el-button>
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
    <cuForm :dialog-visible="cuDialogVisible" :cur-id="curId" :status-options="statusOptions" @close="close" @search="search" />
  </div>
</template>
<script>
import cuForm from './components/cuForm'
import { getServers, deleteServer, deleteServers } from '@/api/cmdb/servers'
import { getAssetsStatus } from '@/api/cmdb/assets'
export default {
  name: 'Permissions',
  components: { cuForm },
  data() {
    return {
      form: {
        page: 1,
        size: 10,
        search: '',
        ordering: '',
        asset_status: ''
      },
      tableData: [],
      total: 0,
      statusOptions: [],
      multipleSelection: [],
      // cuForm數據
      cuDialogVisible: false,
      curId: null
    }
  },
  created() {
    this.search()
    this.getAssetsStatus()
  },
  methods: {
    // 獲取服務器列表/搜索功能
    search() {
      getServers(this.form).then(res => {
        this.tableData = res.data.results
        this.total = res.data.count
      })
    },
    // 獲取服務器資產狀態列表
    getAssetsStatus() {
      getAssetsStatus().then(res => {
        this.statusOptions = res.data.results
      })
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
      this.search()
    },
    // 刪除服務器
    deleteServer(row) {
      this.$confirm('此操作將刪除該服務器, 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteServer(row.id).then(res => {
          this.$message({
            message: '刪除成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // 批量刪除服務器
    deleteServers() {
      this.$confirm('此操作將刪除選中服務器, 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteServers(this.multipleSelection).then(res => {
          this.$message({
            message: '刪除成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // 選項改變時觸發
    handleSelectionChange(val) {
      const deleteIds = []
      this.$refs.table.selection.forEach(data => deleteIds.push(data.id))
      this.multipleSelection = deleteIds
    },
    // cuForm子組件
    createServer() {
      this.cuDialogVisible = true
    },
    updateServer(row) {
      this.curId = row.id
      this.cuDialogVisible = true
    },
    close() {
      this.cuDialogVisible = false
      this.curId = null
    },
    // 分頁
    handleSizeChange(val) {
      this.form.size = val
      this.search()
    },
    handleCurrentChange(val) {
      this.form.page = val
      this.search()
    }

  }
}
</script>
<style lang="scss" scoped>
.demo-table-expand {
font-size: 0;
}
.app-container ::v-deep .demo-table-expand label {
width: 90px;
color: #99a9bf;
}
.demo-table-expand .el-form-item {
margin-right: 0;
margin-bottom: 0;
width: 50%;
}
</style>
