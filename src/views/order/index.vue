<template>
  <div>
    <div class="search">
      <el-input
        v-model="productName"
        placeholder="输入商品标题进行搜索"
        prefix-icon="el-icon-search"
        style="width: 400px"
      />
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <p><br><br></p>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单号" width="150">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" width="150">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付状态" width="150">
        <template slot-scope="scope">
          {{ scope.row.isPay | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易额" width="150">
        <template slot-scope="scope">
          {{ scope.row.money }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.createtime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易商品" width="200">
        <template slot-scope="scope">
          {{ scope.row.product.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-link type="primary" @click="detail(scope.row.id)">详情<i class="el-icon-view el-icon--right" /></el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5, 8, 10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="float:right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

import { getOrderList } from '@/api/order'
import { formatDate } from '@/utils/date'

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
      list: [],
      listLoading: true,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      productName: null,
      createTime: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      this.listLoading = true
      var param = {
        'pageNum': this.currentPage, 'pageSize': this.pageSize,
        'productName': this.productName, 'createTime': this.createTime
      }
      getOrderList(param).then(response => {
        this.total = response.data.pageInfo.total
        this.list = response.data.pageInfo.list
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.fetchData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.fetchData()
      console.log(`当前页: ${val}`)
    },
    search() {
      this.fetchData()
    },
    detail(id) {
      this.$router.push({
        path: '/order/detail',
        query: { orderId: id }
      })
    }
  }
}
</script>

<style scoped>
.search{
  width: 500px;
  float: right;
}
</style>
