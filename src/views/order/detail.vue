<template>
  <div>
    <el-row gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单信息</span>
          </div>
          <div class="text item">
            <h4>
              {{
                '收货地址：' + address.username + address.telephone +
                address.address + address.detailAddress
              }}
            </h4>
            <h4>{{ '订单编号：' + order.id }}</h4>
            <h4>{{ '店铺名称：' + order.product.seller.storename }}</h4>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card2">
          <div slot="header" class="clearfix2">
          <span align="center">
            <i class="el-icon-shopping-cart-full"></i>
            订单状态：{{ order.status }}
          </span>
          </div>
          <div class="text item">
            <h4>支付状态：{{ order.isPay | statusFilter }}</h4>
            <h4>创建时间：{{ order.createtime | formatDate }}</h4>
            <h4>更新时间：{{ order.updatetime | formatDate }}</h4>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <table class="table" border="1">
      <thead>
      <tr align="center">
        <th align="center">商品</th>
        <th align="center">数量</th>
        <th align="center">单价</th>
        <th align="center">金额</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>
          <el-image
            style="width: 100px; height: 100px"
            :src="order.orderDetail.productimageUrl"
            fit="fill"></el-image>
          <div align="center">
            {{ order.product.name }}
          </div>
        </th>
        <th>{{ order.orderDetail.productnumber }}</th>
        <th>{{ order.orderDetail.productprice }}</th>
        <th>{{ order.orderDetail.productnumber * order.orderDetail.productprice|formatMoney }}</th>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {formatDate} from '@/utils/date'
import {getAddress, getOrder} from '@/api/order'

export default {
  filters: {
    formatMoney: function (value) {
      return value.toFixed(2);
    },
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
    fetchData: function () {
      var param = {'orderID': this.orderId}
      getOrder(param).then(response => {
        this.order = response.data.order
        this.getAddress()
      })
    },
    getAddress: function () {
      console.log('22' + this.order)
      const param = {addressID: this.order.buyeraddress}
      console.log(param)
      getAddress(param).then(response => {
        this.address = response.data.address
      })
    }
  }
}
</script>

<style scoped>

.item {
  margin-bottom: 20px;
}

.clearfix2:before,
.clearfix2:after {
  display: table;
  content: "";
}

.clearfix2:after {
  clear: both
}

.box-card {
  width: 480px;
  height: 260px;
  margin: 30px;
  background: #B8CFE2;
}

.box-card2 {
  width: 480px;
  height: 260px;
  margin: 30px;
  background: lightgrey;
}

.table {
  margin: 25px;
  width: 1025px;
  align: center;
  border: 1px solid black;
  border-collapse: collapse;
}

th {
  font-family: '华文宋体';
  font-size: 18px;
}
</style>
