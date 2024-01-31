<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
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
        <el-button v-permission="['admin','system-users-add']" type="primary" style="margin-bottom:20px" icon="el-icon-plus" size="medium" @click="addBook()">新增書籍</el-button>
        <el-button v-permission="['admin','system-users-mdel']" type="danger" icon="el-icon-delete" :disabled="multipleSelection.length ? false : true" size="medium" @click="deleteBooks(form)">刪除</el-button>
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
            prop="book_id"
            label="ID"
          />
          <el-table-column
            prop="name"
            label="名稱"
          />
          <el-table-column
            prop="description"
            label="簡介"
            width="180"
          />
          <el-table-column
            prop="author"
            label="作者"
          />
          <el-table-column
            prop="publisher"
            label="出版社"
            width="180"
          />
          <el-table-column
            prop="category"
            label="分類"
            width="180"
          /><el-table-column
            prop="difficulty"
            label="難度"
            width="180"
          />
          <el-table-column
            fixed="right"
            align="center"
            label="動作"
            width="230"
          >
            <template slot-scope="{row}">
              <el-button v-permission="['admin','system-users-update']" type="primary" icon="el-icon-edit" size="mini" @click="updateBook(row)" />
              <el-button v-permission="['admin','system-users-del']" type="danger" icon="el-icon-delete" size="mini" @click="deleteBook(row)" />
              <!-- <el-tooltip content="使用者權限" placement="top">
                <el-button v-permission="['admin','system-users-permissions']" type="warning" icon="el-icon-user-solid" size="mini" @click="userPermissions(row)" />
              </el-tooltip> -->
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
    <addBookForm :dialog-visible="bookDialogVisible" :departments-data="departmentsData" :cur-id="curId" @close="close" @search="search" />
    <cuForm :dialog-visible="cuDialogVisible" :departments-data="departmentsData" :cur-id="curId" @close="close" @search="search" />
    <resetPwdForm :reset-pass-dialog-visible="resetPassDialogVisible" :reset-cur-id="curId" @resetClose="resetClose" />
    <permissionsDialog :permissions-dialog-visible="permissionsDialogVisible" :user-id="curId" @permissionsClose="permissionsClose" />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import addBookForm from './components/addBookForm'
import cuForm from './components/cuForm'
import resetPwdForm from './components/resetPwdForm'
import permissionsDialog from './components/permissionsDialog'
import { getBooks, deleteBook, deleteBooks } from '@/api/courses/books'
import { mapGetters } from 'vuex'
export default {
  name: 'Users',
  components: { addBookForm, cuForm, resetPwdForm, permissionsDialog },
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

      // book子組件
      bookDialogVisible: false,
      book_id: null

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
    this.search()
  },
  methods: {
    checkPermission,
    // 獲取部門Tree結構
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
    // 獲取書籍列表/搜索功能
    search() {
      getBooks(this.form).then(res => {
        this.tableData = res.data.results
        this.total = res.data.count
        console.log(this.tableData)
      })
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
      // form中未使用department_id字段需手動清除
      this.form.department_id = ''
      this.search()
    },

    // 刪除書籍
    deleteBook(row) {
      this.$confirm('此動作將刪除書籍: "' + row.name + '" , 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBook(row.book_id).then(res => {
          this.$message({
            message: '刪除書籍' + row.name + '成功',
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
      this.$refs.multipleTable.selection.forEach(data => deleteIds.push(data.book_id))
      this.multipleSelection = deleteIds
    },

    // 大量刪除書籍
    deleteBooks() {
      this.$confirm('此動作將刪除書籍' + ', 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBooks(this.multipleSelection).then(res => {
          this.$message({
            message: '刪除書籍成功',
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
    // addBookForm.vue
    addBook() {
      this.bookDialogVisible = true
    },
    // cuForm子組件
    createUser() {
      this.cuDialogVisible = true
    },
    updateBook(row) {
      this.curId = row.book_id
      this.bookDialogVisible = true
    },
    // updateUser(row) {
    //   this.curId = row.id
    //   this.cuDialogVisible = true
    // },
    close() {
      this.cuDialogVisible = false
      this.bookDialogVisible = false
      this.curId = null
      this.book_id = null
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
    }
  }

}
</script>
