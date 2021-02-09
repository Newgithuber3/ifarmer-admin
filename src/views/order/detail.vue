<template>
  <div>
    <el-container style="margin: 50px">
      <el-aside width="400px">
        <div style="margin: 40px; border:1px solid #000;border-radius: 4px;width: 300px">
          <h4>订单信息</h4>
          <h5>收货地址：
            {{ address.username+address.telephone+
               address.address+address.detailAddress
            }}
          </h5>
          <h5>订单编号：{{order.id}} </h5>
          <h5>店铺名称：{{ order.product.seller.storename}} </h5>
        </div>
      </el-aside>
      <el-main>
        <div class="status">
          <div class="icon" align="center">
            <i class="el-icon-shopping-cart-full" ></i>
            订单状态：{{order.status}}
          </div>
          <h4>支付状态：{{order.isPay | statusFilter}}</h4>
          <h4>创建时间：{{order.createtime | formatDate}}</h4>
          <h4>更新时间：{{order.updatetime | formatDate}}</h4>

        </div>
      </el-main>
    </el-container>
    <div style="margin: 100px">
      <el-row :gutter="15" align="center">
        <el-col :span="6">商品</el-col>
        <el-col :span="6">单价</el-col>
        <el-col :span="6">数量</el-col>
        <el-col :span="6">金额</el-col>
      </el-row>
      <p><br><br><br></p>
      <el-row :gutter="15" align="center">
        <el-col :span="6"  >
          <el-image
            style="width: 100px; height: 100px"
            :src="order.orderDetail.productimageUrl"
            fit="fill"></el-image>
          <div align="center">
          {{order.product.name}}</div>
        </el-col>
        <el-col :span="6">{{order.orderDetail.productnumber}}</el-col>
        <el-col :span="6">{{order.orderDetail.productprice}}</el-col>
        <el-col :span="6">{{order.orderDetail.productnumber*order.orderDetail.productprice}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
import { getAddress, getOrder } from '@/api/order'

export default {
  filters: {
    statusFilter(status) {
      return status === true ? '完成支付' : '未支付'
    },
    formatDate(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      order: {},
      orderId: null,
      address: null
    }
  },
  created() {
    this.orderId = this.$route.query.orderId
    console.log('orderid:' + this.orderId)
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      var param = { 'orderID': this.orderId }
      getOrder(param).then(response => {
        this.order = response.data.order
        this.getAddress()
      })
    },
    getAddress: function() {
      console.log('22' + this.order)
      const param = { addressID: this.order.buyeraddress }
      console.log(param)
      getAddress(param).then(response => {
        this.address = response.data.address
      })
    }
  }
}
</script>

<style scoped>
.icon{
  width: 500px;
  font-size: 30px;
  font-family: "微软雅黑",serif;
}
.status{
border: 1px solid #20a0ff ;
}
</style>
