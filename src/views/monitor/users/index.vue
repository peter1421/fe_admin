<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-form ref="form" :model="form" inline>
          <el-form-item prop="search">
            <el-input v-model="form.search" clearable style="width:300px" prefix-icon="el-icon-search" placeholder="輸入用戶名或IP搜索" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-search" size="medium" @click="search(form)">搜索</el-button>
            <el-button type="warning" icon="el-icon-refresh-left" size="medium" @click="resetForm()">重置</el-button>
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
            prop="name"
            label="姓名"
          />
          <el-table-column
            prop="ip"
            label="登錄IP"
            width="130"
          />
          <el-table-column
            prop="browser"
            label="瀏覽器"
            width="180"
          />
          <el-table-column
            prop="os"
            label="系統"
            width="180"
          />
          <el-table-column
            prop="last_time"
            label="最後操作時間"
            width="180"
          />
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="220"
          >
            <template slot-scope="{row}">
              <el-button v-permission="['admin','monitor-users-lock']" type="primary" icon="el-icon-edit" size="mini" @click="lockUser(row)">鎖定</el-button>
              <el-button v-permission="['admin','monitor-users-black-ip']" type="danger" icon="el-icon-delete" size="mini" @click="blackIP(row)">拉黑IP</el-button>
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
  </div>
</template>

<script>
import { getUsers } from '@/api/monitor/users'
import { updateUserActive } from '@/api/system/users'
import { createIp } from '@/api/monitor/ip'
export default {
  name: 'Users',
  data() {
    return {
      form: {
        page: 1,
        size: 10,
        search: ''
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    this.search()
  },
  methods: {
    // 獲取用戶列表/搜索功能
    search() {
      getUsers(this.form).then(res => {
        this.tableData = res.data.results
        this.total = res.data.count
      })
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
      this.search()
    },
    // 鎖定用戶
    lockUser(row) {
      this.$confirm('此操作將鎖定用戶 "' + row.username + '" , 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { 'is_active': false }
        updateUserActive(row.id, data).then(res => {
          this.$message({
            message: '鎖定' + row.username + '成功',
            type: 'success'
          })
        })
      })
    },
    // 拉黑IP
    blackIP(row) {
      this.$confirm('此操作將拉黑IP "' + row.ip + '" , 是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        createIp({ 'ip': row.ip }).then(res => {
          this.$message({
            message: '拉黑成功',
            type: 'success'
          })
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
    }
  }

}
</script>
