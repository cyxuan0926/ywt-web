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
        v-model="tabs"
        type="card">
        <el-tab-pane
          label="家属注册"
          name="first" />
        <el-tab-pane
          label="未授权"
          name="PENDING" />
      </el-tabs>
      <el-table
        :data="registrations.contents"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名" />
        <el-table-column
          width="148px"
          label="身份证信息">
          <template slot-scope="scope">
            <m-img-viewer v-if="scope.row.idCardFront" :url="scope.row.idCardFront" title="身份证正面照" />
            <m-img-viewer v-if="scope.row.idCardBack" :url="scope.row.idCardBack" title="身份证背面照" style="margin-top: 5px;" />
          </template>
        </el-table-column>
        <!-- <el-table-column
          width="148px"
          label="身份证背面">
          <template slot-scope="scope">
            <m-img-viewer v-if="scope.row.idCardBack" :url="scope.row.idCardBack" title="身份证背面照"/>
          </template>
        </el-table-column> -->
        <el-table-column
          min-width="86px"
          label="申请时间">
          <template slot-scope="scope"> {{scope.row.createdAt | Date}} </template>
        </el-table-column>
        <el-table-column
          prop="prisonerNumber"
          min-width="92px"
          label="囚号" />
        <el-table-column
          prop="prisonArea"
          min-width="88px"
          label="监区" />
        <el-table-column
          prop="relationship"
          min-width="64px"
          label="关系" />
        <el-table-column label="家属会见告知书">
          <template slot-scope="scope">
            <span :class="[
              'bold',
              { 'red' : !scope.row.notifyId },
              { 'green' : scope.row.notifyId }
              ]">{{ scope.row.notifyId ? '已签订' : '未签订' }}</span>
            <el-button
              v-if="scope.row.notifyId"
              type="text"
              size="small"
              @click="showSign(scope.row.notifyId)">点击查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="申请状态"
          min-width="74px"
          class-name="orange">
          <template slot-scope="scope"> {{scope.row.status | registStatus}} </template>
        </el-table-column>
        <el-table-column
          prop="auditRealName"
          min-width="150px"
          label="审核信息">
          <template v-if="scope.row.auditAt" slot-scope="scope">{{ scope.row.auditRealName }}<br />{{ scope.row.auditUserName }}<br />({{ scope.row.auditAt | Date }})</template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 'PENDING'"
              size="mini"
              @click="handleAuthorization(scope.row)">授权
            </el-button>
            <el-button
              v-if="scope.row.status == 'PASSED'"
              size="mini"
              @click="handleCallback(scope.row)">撤回
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <m-pagination
      ref="pagination"
      :total="registrations.total"
      @onPageChange="getDatas" />
    <el-dialog
      :visible.sync="show.authorize"
      class="authorize-dialog"
      :title="show.callback ? '撤回' : '授权'"
      width="530px">
      <div style="margin-bottom: 10px;">请核对申请人照片:</div>
      <div class="img-box">
        <m-img-viewer v-if="toAuthorize.idCardFront" :url="toAuthorize.idCardFront" title="身份证正面照"/>
        <m-img-viewer v-if="toAuthorize.idCardBack" :url="toAuthorize.idCardBack" title="身份证背面照"/>
        <m-img-viewer v-if="toAuthorize.avatarUrl" :url="toAuthorize.avatarUrl" title="头像"/>
        <m-img-viewer v-if="toAuthorize.relationalProofUrl" :url="toAuthorize.relationalProofUrl" title="关系证明图"/>
      </div>
      <div
        v-if="!show.agree && !show.disagree && !show.callback"
        class="button-box">
        <el-button
          plain
          @click="show.agree = true">同意</el-button>
        <el-button
          plain
          @click="show.disagree = true">不同意</el-button>
        <el-button
          type="danger"
          plain
          @click="show.authorize = false">关闭</el-button>
      </div>
      <!-- 同意 -->
      <div
        v-if="show.agree"
        class="button-box">
        <el-button
          plain
          :loading="btnDisable"
          @click="onAuthorization('PASSED')">确定申请通过？</el-button>
        <el-button
          plain
          @click="show.agree=false">返回</el-button>
        <el-button
          type="danger"
          plain
          @click="show.authorize = false">关闭</el-button>
      </div>
      <!-- 不同意 -->
      <div
        v-if="show.disagree"
        class="button-box">
        <div style="margin-bottom: 10px;">请选择驳回原因</div>
        <el-select v-model="remarks">
          <el-option
            v-for="(remark,index) in registRemarks"
            :value="remark"
            :label="remark"
            :key="index">
          </el-option>
        </el-select>
        <el-form v-if="remarks === '其他'" :model="refuseForm" :rules="withdrawRule" ref="refuseForm" class="withdraw-box">
          <el-form-item prop="anotherRemarks">
            <el-input type="textarea" placeholder="请输入驳回原因..." v-model="refuseForm.anotherRemarks"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          plain
          :loading="btnDisable"
          @click="onAuthorization('DENIED')">提交</el-button>
        <el-button
          plain
          @click="show.disagree = false">返回</el-button>
        <el-button
          type="danger"
          plain
          @click="closeWithdraw('refuseForm')">关闭</el-button>
      </div>
      <!-- 撤回 -->
      <div
        v-if="show.callback"
        class="button-box">
        <div style="margin-bottom: 10px;">请选择驳回原因</div>
        <el-select v-model="remarks">
          <el-option
            v-for="(remark,index) in registRemarks"
            :value="remark"
            :label="remark"
            :key="index">
          </el-option>
        </el-select>
        <el-form v-if="remarks === '其他'" :model="refuseForm" :rules="withdrawRule" ref="refuseForm" class="withdraw-box">
          <el-form-item prop="anotherRemarks">
            <el-input type="textarea" placeholder="请输入驳回原因..." v-model="refuseForm.anotherRemarks"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="withdrawForm" :rules="withdrawRule" ref="withdrawForm" class="withdraw-box">
          <el-form-item prop="withdrawReason">
            <el-input type="textarea" placeholder="请输入撤回理由..." v-model="withdrawForm.withdrawReason"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          plain
          :loading="btnDisable"
          @click="onAuthorization('WITHDRAW')"
          >提交</el-button>
        <el-button
          type="danger"
          plain
          @click="closeWithdraw('withdrawForm')">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="notificationShow"
      title="会见告知书"
      width="530px"
      class="authorize-dialog">
      <div class="flex-dialog">
        <div style="width: 100%;"><label>家属姓名：</label><span>{{ notification.familyName }}</span></div>
        <div style="width: 100%;"><label>家属身份证号：</label><span>{{ notification.familyUuid }}</span></div>
        <div style="width: 100%;"><label>与服刑人员关系：</label><span>{{ notification.familyRelationship }}</span></div>
        <div style="width: 100%;"><label>协议编号：</label><span>{{ notification.protoNum }}</span></div>
        <div style="width: 100%;"><label>签署日期：</label><span>{{ notification.signDate }}</span></div>
      </div>
      <el-row :gutter="0">
        <el-button
          class="button-add"
          size="mini"
          type="danger"
          @click="notificationShow = false">关闭</el-button>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      searchItems: {
        name: { type: 'input', label: '家属姓名' },
        prisonerNumber: { type: 'input', label: '囚号' },
        prisonArea: { type: 'select', label: '监区', options: JSON.parse(localStorage.getItem('user')).prisonConfigList, belong: { value: 'prisonConfigName', label: 'prisonConfigName' } },
        auditName: { type: 'input', label: '审核人' },
        status: { type: 'select', label: '审核状态', options: this.$store.state.registStatus, miss: true, no: ['DENIED'], value: '' },
        auditAt: { type: 'date', label: '审核时间' }
      },
      toAuthorize: {},
      show: {
        authorize: false,
        agree: false,
        disagree: false,
        callback: false
      },
      withdrawForm: {
        withdrawReason: ''
      },
      refuseForm: {
        anotherRemarks: ''
      },
      withdrawRule: {
        anotherRemarks: [{ required: true, message: '请填写驳回原因' }],
        withdrawReason: [{ required: true, message: '请填写撤回理由' }]
      },
      remarks: '身份信息错误',
      btnDisable: false, // 按钮禁用与启用
      tabs: 'PENDING',
      notificationShow: false
    }
  },
  watch: {
    tabs(val) {
      if (val !== 'first') {
        this.searchItems.status.miss = true
      }
      else {
        delete this.filter.status
        this.searchItems.status.value = ''
        this.searchItems.status.miss = false
      }
      this.onSearch()
    }
  },
  mounted() {
    this.getDatas()
  },
  computed: {
    ...mapState(['registrations', 'registRemarks', 'notification'])
  },
  methods: {
    ...mapActions(['getRegistrations', 'authorizeRegistrations', 'getNotification']),
    sizeChange(rows) {
      this.$refs.pagination.handleSizeChange(rows)
      this.getDatas()
    },
    getDatas() {
      if (this.tabs !== 'first') this.filter.status = this.tabs
      this.getRegistrations({ ...this.filter, ...this.pagination })
    },
    onSearch() {
      this.$refs.pagination.handleCurrentChange(1)
    },
    handleAuthorization(e) {
      this.toAuthorize = e
      this.show.agree = false
      this.show.disagree = false
      this.show.callback = false
      this.remarks = '身份信息错误'
      this.show.authorize = true
    },
    onAuthorization(e) {
      this.btnDisable = true
      let params = { id: this.toAuthorize.id, status: e }
      if ((e === 'DENIED' || e === 'WITHDRAW')) {
        if (this.remarks === '其他') {
          this.$refs.refuseForm.validate(valid => {
            if (valid) {
              params.remarks = this.refuseForm.anotherRemarks
            }
            else {
              this.btnDisable = false
            }
          })
        }
        else {
          params.remarks = this.remarks
        }
        if (e === 'WITHDRAW') {
          this.$refs.withdrawForm.validate(valid => {
            if (valid) {
              params.withdrawReason = this.withdrawForm.withdrawReason
            }
            else {
              this.btnDisable = false
            }
          })
        }
        if (this.btnDisable) this.handleSubmit(params)
      }
      else {
        this.handleSubmit(params)
      }
    },
    handleSubmit(params) {
      this.authorizeRegistrations(params).then(res => {
        this.btnDisable = false
        if (res) {
          this.closeWithdraw()
          this.toAuthorize = {}
          this.getDatas()
        }
      })
    },
    handleCallback(e) {
      this.toAuthorize = e
      this.show.authorize = true
      this.show.agree = false
      this.show.disagree = false
      this.show.callback = true
    },
    closeWithdraw() {
      this.show.authorize = false
      this.remarks = '身份信息错误'
      this.withdrawForm.withdrawReason = ''
      this.refuseForm.anotherRemarks = ''
      if (this.$refs.refuseForm) this.$refs.refuseForm.clearValidate()
      if (this.$refs.withdrawForm) this.$refs.withdrawForm.clearValidate()
    },
    showSign(e) {
      this.getNotification({ id: e }).then(res => {
        if (!res) return
        this.notificationShow = true
      })
    }
  }
}
</script>

<style type="text/stylus" lang="stylus" scoped>
.cell img
  width 126.8px
  cursor pointer
.withdraw-box
  margin-bottom 8px
.flex-dialog
  display: flex;
  flex-wrap: wrap;
  line-height: 32px;
  label
    display: inline-block;
    width: 120px;
    text-align: right;
</style>
