<template>
  <div class="app-container">
    <el-button type="primary" @click="addUser" style="float:right">添加用户</el-button>
    <p>
      <br>
    </p>
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
      <el-table-column label="用户名" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="telephone" width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.telephone }}
        </template>
      </el-table-column>
      <el-table-column label="gender" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="生日" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.birthday | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="address" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <el-tooltip class="item" effect="dark" content="修改" placement="top">
          <el-button type="primary" icon="el-icon-edit" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
          <el-button type="primary" icon="el-icon-delete" />
        </el-tooltip>
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

import { getUserList } from '@/api/user'
import { formatDate } from '@/utils/date'

export default {
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
      pageSize: 5
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      this.listLoading = true
      var param = {
        'pageNum': this.currentPage, 'pageSize': this.pageSize
      }
      getUserList(param).then(response => {
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
    addUser() {
      this.$router.push('/add')
    }
  }
}
</script>
