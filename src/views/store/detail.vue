<template>
  <div class="app-container">
    <h2 style="margin-left: 40%">店铺详情</h2>
    <img style="width: 90%; height: 150px;margin-left: 3%" src="@/assets/images/storeBg.jpg" alt="header">
    <el-row :gutter="20" style="margin-left: 5%">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>主要信息</span>
          </div>
          <div class="content" style="margin-left: 20px">
            <el-row :gutter="20">
              <el-col :span="6"><span>店铺名称：</span></el-col>
              <el-col :span="8"><span>{{ store.sellerInfo.storename }}</span></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6"><span>掌柜：</span></el-col>
              <el-col :span="8"><span /></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6"><span>店铺类型：</span></el-col>
              <el-col :span="8"><span>{{ store.sellerInfo.storeCategory.category }}</span></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6"><span>主营类目：</span></el-col>
              <el-col :span="8"><span>{{ store.sellerInfo.mainCategory.name }}</span></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6"><span>已成交订单数：</span></el-col>
              <el-col :span="8"><span>{{ orderFinishedCount }}</span></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6"><span>总营业额：</span></el-col>
              <el-col :span="8"><i class="el-icon-coin"> <span>{{ store.sellerInfo.turnover }}&nbsp;元</span></i>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6"><span>店铺评价：</span></el-col>
              <el-col :span="8">
                <el-rate
                  v-model="store.sellerInfo.score"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="width: 400px; height: 370px">
          <div slot="header" class="clearfix">
            <span>店铺状态</span>
          </div>
          <div style="margin-left: 20px">
            <el-row :gutter="5">
              <el-col :span="6"><span>注册时间：</span></el-col>
              <el-col :span="8"><span>{{ store.sellerInfo.registTime | formatDate }}</span></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="6"><span>店铺状态：</span></el-col>
              <el-col :span="8"><span>{{ store.status }}</span></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="6"><span>状态信息：</span></el-col>
              <el-col :span="8"><span>{{ store.statusInfo }}</span></el-col>
            </el-row>
            <el-row :gutter="5" style="margin-top: 50px">
              <el-col :span="6"><span>操作：</span></el-col>
              <el-col :span="8"><el-button type="danger" :disabled="storeStatus" @click="dialogBannedVisible = true">封禁店铺</el-button></el-col>
              <el-col :span="8"><el-button type="success" :disabled="!storeStatus" @click="dialogUnbannedVisible = true">解封店铺</el-button></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="封禁店铺" :visible.sync="dialogBannedVisible">
      <span>请设置封禁时长:</span>&nbsp;&nbsp;
      <el-date-picker
        v-model="bannedTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <br><br><br>
      <span>填写封禁理由:</span><br><br><br>
      <el-input v-model="bannedReason" :autosize="{ minRows: 2, maxRows: 5}" type="textarea" style="width: 500px;height: 200px" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBannedVisible = false">取 消</el-button>
        <el-button type="primary" @click="banned('banned')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="解封" :visible.sync="dialogUnbannedVisible">
      <span>当前店铺 {{ store.statusInfo }}</span>&nbsp;&nbsp;
      <h3>确认是否解封?</h3>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUnbannedVisible = false">取 消</el-button>
        <el-button type="primary" @click="banned('unbanned')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
import { bannedStore, getStore } from '@/api/seller'

export default {
  inject: ['reload'],
  filters: {
    formatDate(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      sellerID: null,
      store: {},
      orderFinishedCount: 10,
      storeStatus: false,
      dialogBannedVisible: false,
      dialogUnbannedVisible: false,
      bannedTime: null,
      bannedReason: null
    }
  },
  created() {
    this.sellerID = this.$route.query.sellerID
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      var param = { 'sellerID': this.sellerID }
      getStore(param).then(res => {
        this.store = res.data.seller
        this.checkStatus()
      }).catch(() => {
        this.$message.error('获取数据失败')
      })
    },
    checkStatus() {
      if (this.store.status !== '正常') {
        this.storeStatus = true
      }
    },
    banned(type) {
      if (type === 'banned') {
        this.dialogBannedVisible = false
      }
      if (type === 'unbanned') {
        this.dialogUnbannedVisible = false
      }
      var params = { type: type, statusMsg: this.bannedReason,
        bannedTime: this.bannedTime, sellerID: this.store.id }
      console.log(params)
      bannedStore(params).then(res => {
        this.reload()
        console.log('banned success!')
      })
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.box-card {
  margin-left: 3%;
}
</style>
