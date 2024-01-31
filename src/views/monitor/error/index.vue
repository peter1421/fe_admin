<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-form ref="form" :model="form" inline>
          <el-form-item prop="search">
            <el-input v-model="form.search" clearable style="width:300px" prefix-icon="el-icon-search" placeholder="輸入內容搜索" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-search" size="medium" @click="search(form)">搜索</el-button>
            <el-button type="warning" icon="el-icon-refresh-left" size="medium" @click="resetForm()">重置</el-button>
            <el-button v-permission="['admin','monitor-error-clear']" type="danger" icon="el-icon-delete" size="medium" @click="deleteLogs()">清空日志</el-button>
          </el-form-item>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            width="50"
          />
          <el-table-column
            prop="username"
            label="用戶名"
          />
          <el-table-column
            prop="ip"
            label="IP"
            width="180"
          />
          <el-table-column
            prop="view"
            label="視圖"
          />
          <el-table-column
            prop="desc"
            label="描述"
            show-overflow-tooltip
          />
          <el-table-column
            prop="create_time"
            label="錯誤時間"
            width="180"
          />
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="220"
          >
            <template slot-scope="{row}">
              <el-button type="text" size="mini" @click="dialogVisible(row)">錯誤詳情</el-button>
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
    <el-dialog title="錯誤詳情" :visible.sync="dialogTableVisible">
      <pre class="errorPre">{{ errorDetails }}</pre>
    </el-dialog>
  </div>
</template>

<script>
import { deleteErrorLogs, getErrorLogs } from '@/api/monitor/error'
export default {
  name: 'Users',
  data() {
    return {
      form: {
        page: 1,
        size: 10,
        search: ''
      },
      errorDetails: '',
      dialogTableVisible: false,
      tableData: [],
      total: 0
    }
  },
  created() {
    this.search()
  },
  methods: {
    // 獲取錯誤日志列表/搜索功能
    search() {
      getErrorLogs(this.form).then(res => {
        this.tableData = res.data.results
        this.total = res.data.count
      })
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
      this.search()
    },
    // 清空錯誤日志
    deleteLogs() {
      this.$confirm('此操作將清空所有錯誤日志信息 , 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteErrorLogs().then(res => {
          this.$message({
            message: '清空成功',
            type: 'success'
          })
          this.search()
        })
      })
    },
    // 錯誤詳情dialog顯示
    dialogVisible(row) {
      this.errorDetails = row.detail
      this.dialogTableVisible = true
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
pre{
  white-space:pre-wrap;
  word-wrap: break-word
};
.errorPre{
  height: 60vh;
  overflow: auto;
}
</style>
