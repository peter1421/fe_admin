<template>
  <div class="app-container">
    <el-row>
      <el-col :span="17">
        <el-form ref="form" :model="form" inline>
          <el-form-item prop="search">
            <el-input v-model="form.search" clearable style="width:300px" prefix-icon="el-icon-search" placeholder="輸入任務函數名、函數功能描述搜索" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-search" size="medium" @click="search(form)">搜索</el-button>
            <el-button type="warning" icon="el-icon-refresh-left" size="medium" @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button v-permission="['admin','system-jobs-add']" type="primary" style="margin-bottom:20px" icon="el-icon-plus" size="medium" @click="createJob()">新增</el-button>
        <el-button type="info" icon="el-icon-notebook-1" size="medium" @click="showFunctionsDialog()">函數清單</el-button>
        <el-button v-permission="['admin','system-jobs-clear']" type="danger" icon="el-icon-delete" size="medium" @click="deleteJobs()">清除任務</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>任務調度</span>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序號"
              width="50"
            />
            <el-table-column
              prop="name"
              label="函數名稱"
              show-overflow-tooltip
            />
            <el-table-column
              prop="desc"
              label="功能描述"
              show-overflow-tooltip
            />
            <el-table-column
              prop="next_run_time"
              label="下次執行時間"
            />
            <el-table-column
              label="任務狀態"
              min-width="60"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <el-tag v-if="row.next_run_time" type="success">已運行</el-tag>
                <el-tag v-else type="warning">已暫停</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="cron"
              label="Cron表達式"
            />
            <el-table-column
              fixed="right"
              align="center"
              label="操作"
              width="150"
            >
              <template slot-scope="{row}">
                <el-tooltip content="歷史" placement="top">
                  <el-button v-permission="['admin','system-jobs-history']" type="info" icon="el-icon-message" size="mini" circle @click="executionDialog(row)" />
                </el-tooltip>
                <el-button v-if="row.next_run_time" v-permission="['admin','system-jobs-ps']" type="warning" icon="el-icon-video-pause" size="mini" circle @click="updateJob(row,'false')" />
                <el-button v-else v-permission="['admin','system-jobs-ps']" type="success" icon="el-icon-video-play" size="mini" circle @click="updateJob(row,'true')" />
                <el-button v-permission="['admin','system-jobs-del']" type="danger" icon="el-icon-delete" size="mini" circle @click="deleteJob(row)" />
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
    </el-row>
    <cuForm :dialog-visible="cuDialogVisible" @close="close" @search="search" />
    <executionDialog :execution-dialog-visible="executionDialogVisible" :job-i-d="jobID" @executionDialogClose="executionDialogClose" />
    <functionsDialog :function-dialog-visible="functionDialogVisible" @functionDialogClose="functionDialogClose" />
  </div>
</template>
<script>
import cuForm from './components/cuForm'
import executionDialog from './components/executionDialog'
import functionsDialog from './components/functionsDialog'
import { getJobs, updateJob, deleteJob, deleteJobs } from '@/api/system/jobs'
export default {
  name: 'Roles',
  components: { cuForm, executionDialog, functionsDialog },
  data() {
    return {
      form: {
        page: 1,
        size: 10,
        search: ''
      },
      tableData: [],
      total: 0,
      // cuForm數據
      cuDialogVisible: false,
      // executionDialog數據
      executionDialogVisible: false,
      jobID: '',
      // functionDialog數據
      functionDialogVisible: false
    }
  },
  created() {
    this.search()
  },
  methods: {
    // 獲取調度任務列表/搜索功能
    search() {
      getJobs(this.form).then(res => {
        this.tableData = res.data.results
        this.total = res.data.count
      })
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
      this.search()
    },
    // 刪除調度任務
    deleteJob(row) {
      this.$confirm('此操作將刪除該調度任務, 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteJob(row.id).then(res => {
          this.$message({
            message: '刪除成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // 刪除所有調度任務
    deleteJobs() {
      this.$confirm('此操作將刪除所有調度任務, 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteJobs().then(res => {
          this.$message({
            message: '刪除成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // 啟動/暫停調度任務
    updateJob(row, status) {
      updateJob(row.id, { 'status': status }).then(res => {
        this.$message({
          message: status === 'true' ? '啟動成功' : '暫停成功',
          type: 'success'
        })
        // 刷新table
        this.search()
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
    createJob() {
      this.cuDialogVisible = true
    },
    close() {
      this.cuDialogVisible = false
    },
    executionDialog(row) {
      this.executionDialogVisible = true
      this.jobID = row.id
    },
    executionDialogClose() {
      this.executionDialogVisible = false
      this.jobID = ''
    },
    showFunctionsDialog(row) {
      this.functionDialogVisible = true
    },
    functionDialogClose() {
      this.functionDialogVisible = false
    }
  }
}
</script>
