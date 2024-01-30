<template>
  <div class="app-container">
    <!-- Service Start -->
    <div class="container-xxl py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="service-item text-center pt-3">
              <div class="p-4">
                <i class="fa fa-3x fa-graduation-cap text-primary mb-4" />
                <h5 class="mb-3">Skilled Instructors</h5>
                <p>
                  Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                  amet diam
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="service-item text-center pt-3">
              <div class="p-4">
                <i class="fa fa-3x fa-globe text-primary mb-4" />
                <h5 class="mb-3">Online Classes</h5>
                <p>
                  Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                  amet diam
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <div class="service-item text-center pt-3">
              <div class="p-4">
                <i class="fa fa-3x fa-home text-primary mb-4" />
                <h5 class="mb-3">Home Projects</h5>
                <p>
                  Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                  amet diam
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <div class="service-item text-center pt-3">
              <div class="p-4">
                <i class="fa fa-3x fa-book-open text-primary mb-4" />
                <h5 class="mb-3">Book Library</h5>
                <p>
                  Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                  amet diam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Service End -->
    <!-- About Start -->
    <div class="container-xxl py-5">
      <div class="container">
        <div class="row g-5">
          <div
            class="col-lg-6 wow fadeInUp"
            data-wow-delay="0.1s"
            style="min-height: 400px"
          >
            <div class="position-relative h-100">
              <img
                class="img-fluid position-absolute w-100 h-100"
                :src="require('@/assets/img/about.jpg')"
                alt=""
                style="object-fit: cover"
              >
            </div>
          </div>
          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
            <h6 class="section-title bg-white text-start text-primary pe-3">
              About Us
            </h6>
            <h1 class="mb-4">Welcome to eLEARNING</h1>
            <p class="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit.
            </p>
            <p class="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet
            </p>
            <div class="row gy-2 gx-4 mb-4">
              <div class="col-sm-6">
                <p class="mb-0">
                  <i class="fa fa-arrow-right text-primary me-2" />Skilled
                  Instructors
                </p>
              </div>
              <div class="col-sm-6">
                <p class="mb-0">
                  <i class="fa fa-arrow-right text-primary me-2" />Online
                  Classes
                </p>
              </div>
              <div class="col-sm-6">
                <p class="mb-0">
                  <i class="fa fa-arrow-right text-primary me-2" />International Certificate
                </p>
              </div>
              <div class="col-sm-6">
                <p class="mb-0">
                  <i class="fa fa-arrow-right text-primary me-2" />Skilled
                  Instructors
                </p>
              </div>
              <div class="col-sm-6">
                <p class="mb-0">
                  <i class="fa fa-arrow-right text-primary me-2" />Online
                  Classes
                </p>
              </div>
              <div class="col-sm-6">
                <p class="mb-0">
                  <i class="fa fa-arrow-right text-primary me-2" />International Certificate
                </p>
              </div>
            </div>
            <a class="btn btn-primary py-3 px-5 mt-2" href="">Read More</a>
          </div>
        </div>
      </div>
    </div>
    <!-- About End -->

    <!-- Categories Start -->
    <div class="container-xxl py-5 category">
      <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 class="section-title bg-white text-center text-primary px-3">
            Categories
          </h6>
          <h1 class="mb-5">Courses Categories</h1>
        </div>
        <div class="row g-3">
          <div class="col-lg-7 col-md-6">
            <div class="row g-3">
              <div class="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                <a class="position-relative d-block overflow-hidden" href="">
                  <img class="img-fluid" :src="require('@/assets/img/cat-1.jpg')" alt="">
                  <div
                    class="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                    style="margin: 1px"
                  >
                    <h5 class="m-0">Web Design</h5>
                    <small class="text-primary">49 Courses</small>
                  </div>
                </a>
              </div>
              <div class="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                <a class="position-relative d-block overflow-hidden" href="">
                  <img class="img-fluid" :src="require('@/assets/img/cat-2.jpg')" alt="">
                  <div
                    class="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                    style="margin: 1px"
                  >
                    <h5 class="m-0">Graphic Design</h5>
                    <small class="text-primary">49 Courses</small>
                  </div>
                </a>
              </div>
              <div class="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                <a class="position-relative d-block overflow-hidden" href="">
                  <img class="img-fluid" :src="require('@/assets/img/cat-3.jpg')" alt="">

                  <div
                    class="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                    style="margin: 1px"
                  >
                    <h5 class="m-0">Video Editing</h5>
                    <small class="text-primary">49 Courses</small>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div
            class="col-lg-5 col-md-6 wow zoomIn"
            data-wow-delay="0.7s"
            style="min-height: 350px"
          >
            <a class="position-relative d-block h-100 overflow-hidden" href="">
              <img class="img-fluid" :src="require('@/assets/img/cat-4.jpg')" alt="">
              <div
                class="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                style="margin: 1px"
              >
                <h5 class="m-0">Online Marketing</h5>
                <small class="text-primary">49 Courses</small>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Categories Start -->

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
    <!-- Team Start -->
    <div class="container-xxl py-5">
      <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 class="section-title bg-white text-center text-primary px-3">
            Instructors
          </h6>
          <h1 class="mb-5">Expert Instructors</h1>
        </div>
        <div class="row g-4">
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="team-item bg-light">
              <div class="overflow-hidden">
                <img class="img-fluid" :src="require('@/assets/img/team-1.jpg')" alt="">
              </div>
              <div
                class="position-relative d-flex justify-content-center"
                style="margin-top: -23px"
              >
                <div class="bg-light d-flex justify-content-center pt-2 px-1">
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-facebook-f" /></a>
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-twitter" /></a>
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-instagram" /></a>
                </div>
              </div>
              <div class="text-center p-4">
                <h5 class="mb-0">Instructor Name</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="team-item bg-light">
              <div class="overflow-hidden">
                <img class="img-fluid" :src="require('@/assets/img/team-2.jpg')" alt="">
              </div>
              <div
                class="position-relative d-flex justify-content-center"
                style="margin-top: -23px"
              >
                <div class="bg-light d-flex justify-content-center pt-2 px-1">
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-facebook-f" /></a>
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-twitter" /></a>
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-instagram" /></a>
                </div>
              </div>
              <div class="text-center p-4">
                <h5 class="mb-0">Instructor Name</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div class="team-item bg-light">
              <div class="overflow-hidden">
                <img class="img-fluid" :src="require('@/assets/img/team-3.jpg')" alt="">
              </div>
              <div
                class="position-relative d-flex justify-content-center"
                style="margin-top: -23px"
              >
                <div class="bg-light d-flex justify-content-center pt-2 px-1">
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-facebook-f" /></a>
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-twitter" /></a>
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-instagram" /></a>
                </div>
              </div>
              <div class="text-center p-4">
                <h5 class="mb-0">Instructor Name</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div class="team-item bg-light">
              <div class="overflow-hidden">
                <img class="img-fluid" :src="require('@/assets/img/team-4.jpg')" alt="">
              </div>
              <div
                class="position-relative d-flex justify-content-center"
                style="margin-top: -23px"
              >
                <div class="bg-light d-flex justify-content-center pt-2 px-1">
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-facebook-f" /></a>
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-twitter" /></a>
                  <a
                    class="btn btn-sm-square btn-primary mx-1"
                    href=""
                  ><i class="fab fa-instagram" /></a>
                </div>
              </div>
              <div class="text-center p-4">
                <h5 class="mb-0">Instructor Name</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Team End -->

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
    }
  }

}
</script>
<style scoped>
/* 導航欄的 CSS */

</style>
