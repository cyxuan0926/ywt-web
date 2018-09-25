<template>
  <el-row
    class="row-container"
    :gutter="0">
    <m-search
      :items="searchItems"
      @sizeChange="sizeChange"
      @search="onSearch" />
    <el-col :span="24">
      <el-tabs
        value="first"
        type="card">
        <el-tab-pane
          label="意见反馈"
          name="first" />
      </el-tabs>
      <el-table
        :data="feedbacks.contents"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名" />
        <el-table-column label="身份证正面">
          <template slot-scope="scope">
            <img
              v-if="scope.row.idCardFront"
              :src="scope.row.idCardFront + '?token=523b87c4419da5f9186dbe8aa90f37a3876b95e448fe2a'"
              @click="amplifyImage(scope.row.idCardFront)">
          </template>
        </el-table-column>
        <el-table-column label="身份证背面">
          <template slot-scope="scope">
            <img
              v-if="scope.row.idCardBack"
              :src="scope.row.idCardBack + '?token=523b87c4419da5f9186dbe8aa90f37a3876b95e448fe2a'"
              @click="amplifyImage(scope.row.idCardBack)">
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          show-overflow-tooltip
          label="内容" />
        <el-table-column
          label="反馈时间">
          <template slot-scope="scope">
            {{scope.row.createdAt | Date}}
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <m-pagination
      ref="pagination"
      :total="feedbacks.total"
      @onPageChange="getDatas" />
    <el-dialog
      :visible.sync="dialogVisible"
      class="img-idCard"
      width="382.4px">
      <img :src="imgSrc">
    </el-dialog>
  </el-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      searchItems: {
        name: { type: 'input', label: '家属姓名' }
      },
      dialogVisible: false,
      imgSrc: ''
    }
  },
  computed: {
    ...mapState(['feedbacks'])
  },
  mounted() {
    this.getDatas()
  },
  methods: {
    ...mapActions(['getFeedbacks']),
    sizeChange(rows) {
      this.$refs.pagination.handleSizeChange(rows)
      this.getDatas()
    },
    getDatas() {
      this.getFeedbacks({ ...this.filter, ...this.pagination })
    },
    onSearch() {
      this.$refs.pagination.handleCurrentChange(1)
    },
    amplifyImage(imgSrc) {
      this.imgSrc = `${ imgSrc }?token=523b87c4419da5f9186dbe8aa90f37a3876b95e448fe2a`
      this.dialogVisible = true
    }
  }
}
</script>

<style type="text/stylus" lang="stylus" scoped>
.cell img
  width: 126.8px;
  cursor: pointer;
</style>
