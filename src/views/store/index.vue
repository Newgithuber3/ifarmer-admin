<template>
  <div class="app-container">
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="box-card" style="margin-top: 20px">
            <div slot="header" class="clearfix">
              <span>总店铺数</span>
            </div>
            <div class="text">
              <i class="el-icon-s-shop"><span>&#12288;&#12288;{{ total }}</span></i>
            </div>
          </el-card>
          <p><br></p>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>营业中</span>
            </div>
            <div class="text">
              <i class="el-icon-finished"><span>&#12288;&#12288;{{ runningCount }}</span></i>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <multi-line :line-data="lineData" />
        </el-col>
      </el-row>
    </div>
    <div class="search" style="float: right; margin-right: 3%">
      <el-input
        v-model="searchName"
        placeholder="输入店铺名称进行搜索"
        prefix-icon="el-icon-search"
        style="width: 400px"
      />&nbsp;
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div><p><br></p>
    <div class="table">
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
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.sellerInfo.storename }}
          </template>
        </el-table-column>
        <el-table-column label="店铺类型" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sellerInfo.storeCategory.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主营类目" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sellerInfo.mainCategory.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总营业额" width="180" align="center">
          <template slot-scope="scope">
            <i class="el-icon-coin">&#12288;{{ scope.row.sellerInfo.turnover }}</i>
          </template>
        </el-table-column>
        <el-table-column label="店铺评分" width="230" align="center">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.sellerInfo.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            />
          </template>
        </el-table-column>
        <el-table-column label="店铺状态" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="detail(scope.row.id)">详情<i class="el-icon-view el-icon--right" /></el-link>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-pagination
        background
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
  </div>
</template>

<script>
import { formatDate } from '@/utils/date'
import { getRunningCount, getStoreList, searchStoreByName } from '@/api/seller'
import multiLine from '@/components/Chart/multiLine'

export default {
  inject: ['reload'],
  components: {
    multiLine
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    formatDate(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      runningCount: 8,
      lineData: {
        totalCount: [20, 32, 45, 70],
        runningCount: [20, 25, 35, 60]
      },
      searchName: null
    }
  },
  created() {
    this.getRunningCount()
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      this.listLoading = true
      var param = {
        'pageNum': this.currentPage, 'pageSize': this.pageSize
      }
      getStoreList(param).then(response => {
        this.total = response.data.pageInfo.total
        this.list = response.data.pageInfo.list
        this.listLoading = false
      })
    },
    getRunningCount() {
      getRunningCount().then(res => {
        this.runningCount = res.data.runningCount
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
      console.log(`当前页: ${val}`)
    },
    detail(id) {
      this.$router.push({
        path: '/store/detail',
        query: { sellerID: id }
      })
    },
    search() {
      if (this.searchName === null) {
        this.reload()
        return
      }
      var param = { storeName: this.searchName }
      searchStoreByName(param).then(res => {
        this.list = res.data.sellers
      })
    }
  }
}
</script>

<style scoped>
.top {
  margin-left: 50px;
  margin-top: 20px;
}
.text {
  font-size: 30px;
}

.table {
  margin-left: 30px;
  margin-bottom: 100px;
  width: 1300px;
  text-align: center;
}
</style>
