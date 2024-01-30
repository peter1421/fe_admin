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
          <div
            v-for="(book, index) in tableData"
            :key="index"
            class="col-lg-4 col-md-6 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div class="course-item bg-light">
              <!-- ... 其他代码 ... -->
              <div class="position-relative overflow-hidden">
                <img class="img-fluid" :src="require('@/assets/img/course-2.jpg')" alt="">
                <div
                  class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4"
                >
                  <a
                    class="flex-shrink-0 btn btn-sm btn-primary px-3"
                    style="width :40%;border-radius: 20px;font-size: 120%;"
                    @click="goToChat(book.book_id)"
                  >聊天</a>
                </div>
              </div>
              <div class="text-center p-4 pb-0">
                <div style="height: 400px; display: flex; flex-direction: column;">
                  <h3 class="mb-0" style="flex:0 1 auto">{{ book.name }}</h3>
                  <hr>
                  <div class="mb-3" style="flex: 1 1 auto;overflow: hidden;">
                    <p style="overflow: hidden; text-overflow: ellipsis; width: 100%;"> {{ book.description }}</p>
                  </div>
                </div>
                <div class="d-flex border-top">
                  <small
                    class="text-center border-end py-2 flex-grow-1"
                  ><i class="fa fa-user-tie text-primary me-2" style="overflow: hidden;" />{{ book.difficulty }}</small>
                  <small
                    class="text-center border-end py-2 flex-grow-1"
                  ><i class="fa fa-clock text-primary me-2" style="overflow: hidden;" />{{ book.category }}</small>
                  <small
                    class="text-center py-2 flex-grow-1"
                  ><i class="fa fa-user text-primary me-2" style="overflow: hidden; text-overflow: ellipsis;" />{{ book.author }}</small>
                </div>
              </div>
            <!-- ... 其他代码 ... -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Courses End -->
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { getBooks } from '@/api/courses/books'
import { creatStudentBookBot } from '@/api/chatbot/bookbot'
import { mapGetters } from 'vuex'
export default {
  name: 'Users',
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
      filterText: ''
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
    // 获取部门Tree结构
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
    // 获取書籍列表/搜索功能
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
      // form中未使用department_id字段需手动清除
      this.form.department_id = ''
      this.search()
    },
    joinCourse(book) {
      const student = this.userId
      const message = student + '創建機器人: ' + book
      const data = {
        student: student,
        book: book
      }
      creatStudentBookBot(data)
        .then(res => {
          this.$message({
            message: message + '成功',
            type: 'success'
          })
          this.search()
        })
    },
    goToChat(bookId) {
      this.$router.push({ path: `/client/chat/${bookId}` })
    }
  }

}
</script>
<style scoped>
/* 導航欄的 CSS */

</style>
