<template>
  <div class="container" style="margin: 0 auto; width: 600px; text-align: center;">
    <p>{{ ruleForm.uid }}</p>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="ruleForm">
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="ruleForm.username" disabled="true" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname" />
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="ruleForm.telephone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" :type="passwordType" autocomplete="off" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio v-model="ruleForm.gender" label="男">男</el-radio>
        <el-radio v-model="ruleForm.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="选择生日日期" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="住址" prop="address">
        <el-input v-model="ruleForm.address" placeholder="请填写居住城市" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user'
import { parseTime } from '@/utils'

export default {
  name: 'Add',
  inject: ['reload'],
  data() {
    return {
      passwordType: 'password',
      ruleForm: {
        uid: '',
        username: '',
        nickname: '',
        telephone: '',
        password: '',
        gender: '男',
        birthday: '',
        address: ''
      },
      rules: {
        username: [
          { required: true, message: '请输用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输大陆手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在为 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请填写出生日期', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写居住城市', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.ruleForm.uid = this.$route.query.uid
    this.getUser()
  },
  methods: {
    getUser() {
      var params = { 'uid': this.ruleForm.uid }
      getUser(params).then(res => {
        console.log(res.data.user)
        Object.assign(this.ruleForm, res.data.user)
        console.log(this.ruleForm)
      }).catch(() => {
        alert('获取数据失败')
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.birthday = parseTime(this.ruleForm.birthday, '{y}-{m}-{d}')
          updateUser(this.ruleForm).then(res => {
            if (res.success === true) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              })
              this.$router.push('/user/index')
            }
          }).catch(() => {
            this.$message({
              message: '修改失败！',
              type: 'error'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.reload()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  }
}
</script>

<style scoped>

.ruleForm{
  width: 400px;
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 3px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
</style>
