<template>
  <div class="app-container">
    <h3>申请列表</h3>
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
        <el-table-column label="申请人" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.sellerInfo.storename }}
          </template>
        </el-table-column>
        <el-table-column label="身份证号" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sellerInfo.storeCategory.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="银行卡号" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sellerInfo.mainCategory.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实名认证" width="180" align="center">
          <template slot-scope="scope">
            <i class="el-icon-coin">&#12288;{{ scope.row.sellerInfo.turnover }}</i>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="230" align="center">
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
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="success" @click="">接收申请</el-button>&nbsp;
            <el-button type="info" @click="">拒绝申请</el-button>
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
export default {
  name: 'Certification'
}
</script>

<style scoped>

</style>
