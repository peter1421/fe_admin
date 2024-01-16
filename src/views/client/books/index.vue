<template>
  <div class="app-container">

    <!-- Courses Start -->
    <div class="container-xxl py-5">
      <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 class="section-title bg-white text-center text-primary px-3">
            Courses
          </h6>
          <h1 class="mb-5">Popular Courses</h1>
        </div>
        <div class="row g-4 justify-content-center">
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="course-item bg-light">
              <div class="position-relative overflow-hidden">
                <img class="img-fluid" :src="require('@/assets/img/course-1.jpg')" alt="">
                <div
                  class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4"
                >
                  <a
                    href="#"
                    class="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                    style="border-radius: 30px 0 0 30px"
                  >Read More</a>
                  <a
                    href="/management/sign-in"
                    class="flex-shrink-0 btn btn-sm btn-primary px-3"
                  >登入帳戶</a>
                </div>
              </div>
              <div class="text-center p-4 pb-0">
                <h3 class="mb-0">$149.00</h3>
                <div class="mb-3">
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small>(123)</small>
                </div>
                <h5 class="mb-4">
                  Web Design & Development Course for Beginners
                </h5>
              </div>
              <div class="d-flex border-top">
                <small
                  class="flex-fill text-center border-end py-2"
                ><i class="fa fa-user-tie text-primary me-2" />John
                  Doe</small>
                <small
                  class="flex-fill text-center border-end py-2"
                ><i class="fa fa-clock text-primary me-2" />1.49 Hrs</small>
                <small
                  class="flex-fill text-center py-2"
                ><i class="fa fa-user text-primary me-2" />30
                  Students</small>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="course-item bg-light">
              <div class="position-relative overflow-hidden">
                <img class="img-fluid" :src="require('@/assets/img/course-2.jpg')" alt="">
                <div
                  class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4"
                >
                  <a
                    href="#"
                    class="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                    style="border-radius: 30px 0 0 30px"
                  >Read More</a>
                  <a
                    href="#"
                    class="flex-shrink-0 btn btn-sm btn-primary px-3"
                    style="border-radius: 0 30px 30px 0"
                  >Join Now</a>
                </div>
              </div>
              <div class="text-center p-4 pb-0">
                <h3 class="mb-0">$149.00</h3>
                <div class="mb-3">
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small>(123)</small>
                </div>
                <h5 class="mb-4">
                  Web Design & Development Course for Beginners
                </h5>
              </div>
              <div class="d-flex border-top">
                <small
                  class="flex-fill text-center border-end py-2"
                ><i class="fa fa-user-tie text-primary me-2" />John
                  Doe</small>
                <small
                  class="flex-fill text-center border-end py-2"
                ><i class="fa fa-clock text-primary me-2" />1.49 Hrs</small>
                <small
                  class="flex-fill text-center py-2"
                ><i class="fa fa-user text-primary me-2" />30
                  Students</small>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div class="course-item bg-light">
              <div class="position-relative overflow-hidden">
                <img class="img-fluid" :src="require('@/assets/img/course-3.jpg')" alt="">
                <div
                  class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4"
                >
                  <a
                    href="#"
                    class="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                    style="border-radius: 30px 0 0 30px"
                  >Read More</a>
                  <a
                    href="#"
                    class="flex-shrink-0 btn btn-sm btn-primary px-3"
                    style="border-radius: 0 30px 30px 0"
                  >Join Now</a>
                </div>
              </div>
              <div class="text-center p-4 pb-0">
                <h3 class="mb-0">$149.00</h3>
                <div class="mb-3">
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small class="fa fa-star text-primary" />
                  <small>(123)</small>
                </div>
                <h5 class="mb-4">
                  Web Design & Development Course for Beginners
                </h5>
              </div>
              <div class="d-flex border-top">
                <small
                  class="flex-fill text-center border-end py-2"
                ><i class="fa fa-user-tie text-primary me-2" />John
                  Doe</small>
                <small
                  class="flex-fill text-center border-end py-2"
                ><i class="fa fa-clock text-primary me-2" />1.49 Hrs</small>
                <small
                  class="flex-fill text-center py-2"
                ><i class="fa fa-user text-primary me-2" />30
                  Students</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Courses End -->
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
import { mapGetters } from 'vuex'
import '../../../assets/css/bootstrap.min.css'
import '../../../assets/css/style.css'
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
      multipleSelection: [], // 已选择的用户id数组
      filterText: '',
      departmentsData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 以下为cuForm子组件数据
      cuDialogVisible: false,
      curId: null,
      // 以下为resetPwdForm子组件数据
      resetPassDialogVisible: false,
      // permissionsDialog子组件
      permissionsDialogVisible: false
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
    this.getDepartments()
  },
  methods: {
    checkPermission,
    // 获取部门Tree结构
    getDepartments() {
      getDepartments().then(res => {
        this.departmentsData = res.data.results
      })
    },
    // 部门Tree过滤方法
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 过滤部门下的用户列表
    handleNodeClick(data) {
      this.form.department_id = data.id
      this.search()
    },
    // 获取用户列表/搜索功能
    search() {
      getUsers(this.form).then(res => {
        this.tableData = res.data.results
        this.total = res.data.count
      })
    },
    // 重置
    resetForm() {
      this.$refs.form.resetFields()
      // form中未使用department_id字段需手动清除
      this.form.department_id = ''
      this.search()
    },
    // 修改用户状态
    changeIsActive(event, row) {
      const message = !event ? '锁定' : '激活'
      this.$confirm('此操作将' + message + '用户 "' + row.username + '" , 是否继续？', '提示', {
        confirmButtonText: '确定',
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
    // 删除用户
    deleteUser(row) {
      this.$confirm('此操作将删除用户 "' + row.username + '" , 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row.id).then(res => {
          this.$message({
            message: '删除用户' + row.username + '成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },

    // table选择功能的change事件
    handleSelectionChange() {
      const deleteIds = []
      this.$refs.multipleTable.selection.forEach(data => deleteIds.push(data.id))
      this.multipleSelection = deleteIds
    },

    // 批量删除用户
    deleteUsers() {
      this.$confirm('此操作将删除选中用户' + ', 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUsers(this.multipleSelection).then(res => {
          this.$message({
            message: '删除用户成功',
            type: 'success'
          })
          // 刷新table
          this.search()
        })
      })
    },
    // 分页
    handleSizeChange(val) {
      this.form.size = val
      this.search()
    },
    handleCurrentChange(val) {
      this.form.page = val
      this.search()
    },
    // cuForm子组件
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
    // 重置密码子组件
    resetPass(row) {
      this.resetPassDialogVisible = true
      this.curId = row.id
    },
    resetClose() {
      this.resetPassDialogVisible = false
      this.curId = null
    },
    // 用户权限组件
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
<style scoped>
/* 導航欄的 CSS */

</style>
