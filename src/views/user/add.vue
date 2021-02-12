<template>
  <div class="container" style="margin: 0 auto; width: 600px; text-align: center;">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname" />
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="ruleForm.telephone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
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
import { addUser } from '@/api/user'
import { parseTime } from '@/utils'

export default {
  name: 'Add',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        nickname: '',
        telephone: '',
        password: '',
        checkPass: '',
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
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
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
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.birthday = parseTime(this.ruleForm.birthday, '{y}-{m}-{d}')
          addUser(this.ruleForm).then(res => {
            if (res.success === true) {
              this.confirm()
            }
          }).catch(() => {
            alert('添加用户失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    confirm() {
      this.$confirm('添加用户成功, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.$refs.ruleForm.resetFields()
        this.$router.push('/add/index')
      }).catch(() => {
        this.$router.push('/user/index')
      })
    }
  }
}
</script>

<style scoped>
.ruleForm{
  width: 400px;
}
</style>
