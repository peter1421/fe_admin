<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>個人資訊</span>
          </div>
          <div>
            <div style="text-align: center">
              <div class="el-upload">
                <img :src="avatar" title="點擊上傳頭像" class="avatar" @click="toggleShow">
                <myUpload
                  v-model="show"
                  :headers="headers"
                  :url="updateAvatarApi"
                  method="PUT"
                  field="image"
                  @crop-upload-success="cropUploadSuccess"
                />
              </div>
            </div>
            <ul class="user-info">
              <li><div style="height: 100%"><svg-icon icon-class="login" /> 登錄帳號<div class="user-right">{{ username }}</div></div></li>
              <li><svg-icon icon-class="user1" /> 用戶姓名 <div class="user-right">{{ name }}</div></li>
              <li><svg-icon icon-class="dept" /> 年級 <div class="user-right"> {{ department }}</div></li>
              <li><svg-icon icon-class="phone" /> 手機號碼 <div class="user-right">{{ mobile }}</div></li>
              <li><svg-icon icon-class="email" /> 信箱 <div class="user-right">{{ email }}</div></li>
              <li>
                <svg-icon icon-class="anq" /> 安全設置
                <div class="user-right">
                  <a @click="$refs.pass.dialogVisible = true">修改密碼</a>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="box-card" style="margin-left: 20px;">
          <div slot="header" class="clearfix">
            <span>個人資訊</span>
          </div>
          <div>
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" style="width: 40%" />
                <span style="color: #C0C0C0;margin-left: 10px;">用戶真實姓名或暱稱</span>
              </el-form-item>
              <el-form-item label="手機號" prop="mobile">
                <el-input v-model="form.mobile" style="width: 40%" />
                <span style="color: #C0C0C0;margin-left: 10px;">手機號可用於登錄使用</span>
              </el-form-item>
              <el-form-item label="郵箱" prop="email">
                <el-input v-model="form.email" style="width: 40%" />
              </el-form-item>
              <el-form-item label="性別" prop="gender">
                <el-input v-model="form.gender" style="width: 40%" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">保存配置</el-button>
              </el-form-item>
            </el-form></div>
        </el-card>
      </el-col>
    </el-row>
    <updatePass ref="pass" />
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
import updatePass from './components/updatePass'
import { validatePhone, validateEMail } from '@/utils/rulesValidate'
import { changeInformation } from '@/api/information/centre'
import { mapGetters } from 'vuex'
import store from '@/store'
import { getToken } from '@/utils/auth'
export default {
  name: 'Centre',
  components: { updatePass, myUpload },
  data() {
    return {
      show: false,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      form: {},
      rules: {
        name: [
          { min: 2, max: 20, message: '長度在 2 到 20 個字符', trigger: 'blur' }
        ],
        email: [
          { validator: validateEMail, trigger: 'blur' }
        ],
        mobile: [
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
      updateAvatarApi: process.env.VUE_APP_BASE_API + '/information/change-avatar/'
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'department',
      'name',
      'avatar',
      'mobile',
      'email',
      'gender'
    ])
  },
  created() {
    this.form = { name: this.name, mobile: this.mobile, email: this.email, gender: this.gender }
    store.dispatch('user/getInfo').then(() => {})
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    // 頭像上傳成功的回調
    cropUploadSuccess() {
      store.dispatch('user/getInfo').then(() => {})
    },
    // 修改個人資訊
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //   if (this.form.mobile === '') {
        //     this.form.mobile = null
        //   }
          changeInformation(this.form).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            store.dispatch('user/getInfo').then(() => {})
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-info {
    padding-left: 0;
    list-style: none;
    li{
      border-bottom: 1px solid #F0F3F4;
      padding: 11px 0;
      font-size: 13px;
    }
    .user-right {
      float: right;
      a{
        color: #317EF3;
      }
    }
  }
</style>
