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
          label="会见申请"
          name="first" />
        <el-tab-pane
          label="未授权"
          name="PENDING" />
      </el-tabs>
      <el-table
        ref="meetingTable"
        :data="meetings.contents"
        border
        stripe
        style="width: 100%"
        @sort-change="sortChange">
        <el-table-column
          prop="prisonerNumber"
          min-width="68px"
          label="囚号" />
        <el-table-column
          prop="prisonArea"
          min-width="84px"
          label="监区"
          :sortable="'custom'" />
        <el-table-column
          label="申请时间"
          min-width="124px">
          <template slot-scope="scope">
            <span >{{scope.row.createdAt}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="会见时间"
          min-width="138px" :sortable="'custom'" prop="meetingTime">
          <template slot-scope="scope">
            <span >{{scope.row.meetingTime || scope.row.applicationDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="服刑人员姓名" min-width="92" prop="prisonerName"></el-table-column>
        <el-table-column label="家属" min-width="116">
          <template slot-scope="scope">
            <div v-if="scope.row.families && scope.row.families.length">
              <el-button
                type="text"
                size="small"
                v-for="family in scope.row.families"
                :key="family.familyId"
                style="margin-left: 0px; margin-right: 8px;"
                @click="showFamilyDetail(family.familyId)">
                {{family.familyName}}
              </el-button>
            </div>
            <el-button
              type="text"
              size="small"
              v-else
              style="margin-left: 0px; margin-right: 8px;"
              @click="showFamilyDetail(scope.row.familyId)">
              {{scope.row.name}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          class-name="orange"
          min-width="78px"
          label="申请状态">
          <template slot-scope="scope">
            <span v-if="!scope.row.content">{{scope.row.status | applyStatus}}</span>
            <el-tooltip v-else :content="scope.row.content" placement="top">
              <span>{{scope.row.status | applyStatus}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="76px">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 'PENDING'"
              size="mini"
              @click="handleAuthorization(scope.row)">授权</el-button>
            <el-button
              v-else-if="scope.row.status === 'PASSED' && scope.row.isWithdrawFlag === 1"
              size="mini"
              @click="handleWithdraw(scope.row)">撤回</el-button>
            <el-button
              v-if="scope.row.status != 'PENDING'"
              type="text"
              size="mini"
              class="button-detail"
              @click="onDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="auditRealName"
          min-width="150px"
          label="审核信息">
          <template v-if="scope.row.auditRealName" slot-scope="scope">{{ scope.row.auditRealName }}<br />{{ scope.row.auditUserName }}<br />({{ scope.row.auditAt | Date }})</template>
        </el-table-column> -->
      </el-table>
    </el-col>
    <m-pagination
      ref="pagination"
      :total="meetings.total"
      @onPageChange="getDatas" />
    <el-dialog
      :visible.sync="show.authorize"
      class="authorize-dialog"
      @close="closeAuthorize"
      title="授权"
      width="530px">
      <div
        v-if="!show.agree && !show.disagree"
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
      <div
        v-if="show.agree"
        class="button-box">
        <el-button
          plain
          @click="onAuthorization('PASSED')">确定申请通过？</el-button>
        <el-button
          plain
          @click="show.agree=false">返回</el-button>
        <el-button
          type="danger"
          plain
          @click="show.authorize = false">关闭</el-button>
      </div>
      <div
        v-if="show.disagree"
        class="button-box">
        <div style="margin-bottom: 10px;">请选择驳回原因</div>
        <el-select v-model="remarks">
          <el-option
            v-for="(remark,index) in frontRemarks"
            :value="remark"
            :label="remark"
            :key="index">
          </el-option>
        </el-select>
        <el-form v-if="remarks === '其他'" :model="refuseForm" :rules="rule" ref="refuseForm" class="withdraw-box">
          <el-form-item prop="refuseRemark">
            <el-input type="textarea" placeholder="请输入驳回原因..." :autosize="{ minRows: 5 }"
                      v-model="refuseForm.refuseRemark"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          plain
          @click="onAuthorization('DENIED')">提交</el-button>
        <el-button
          plain
          @click="closeAuthorize('back')">返回</el-button>
        <el-button
          type="danger"
          plain
          @click="show.authorize = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="show.withdraw"
      @close="closeWithdraw"
      class="authorize-dialog"
      title="撤回"
      width="530px">
      <el-form
        :model="withdraw"
        :rules="rule"
        ref="withdrawForm">
        <el-form-item prop="remarks">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6 }"
            placeholder="请输入撤回理由"
            v-model="withdraw.remarks" />
        </el-form-item>
      </el-form>
      <el-row :gutter="0">
        <el-button
          class="button-add"
          size="mini"
          type="danger"
          @click="show.withdraw = false">取消</el-button>
        <el-button
          class="button-add"
          size="mini"
          @click="onWithdraw">确定</el-button>
      </el-row>
    </el-dialog>
    <el-dialog
      :visible.sync="toShow.id ? true : false"
      :title="'家属：' + toShow.name"
      width="530px"
      class="authorize-dialog"
      @close="onCloseShow">
      <div class="flex-dialog">
        <div style="width: 100%;"><label>与囚犯关系：</label><span>{{ toShow.relationship }}</span></div>
        <div style="width: 50%;"><label>预约时间：</label><span>{{ toShow.meetingTime }}</span></div>
        <div style="width: 50%;"><label>终端号：</label><span>{{ toShow.terminalNumber }}</span></div>
        <div style="width: 50%;"><label>审核人账号：</label><span>{{ toShow.auditUserName }}</span></div>
        <div style="width: 50%;"><label>审核人姓名：</label><span>{{ toShow.auditRealName }}</span></div>
        <div style="width: 50%;"><label>审核时间：</label><span>{{ toShow.auditAt | Date }}</span></div>
        <div style="width: 50%;"><label>审核状态：</label><span>{{ toShow.status | applyStatus }}</span></div>
        <div style="width: 50%;"><label>会见时长：</label><span></span></div>
        <div v-if="toShow.status === 'DENIED'" style="width: 100%;"><label>拒绝原因：</label><span>{{ toShow.content }}</span></div>
      </div>
    </el-dialog>
    <el-dialog
      title="家属信息"
      :visible.sync="show.familiesDetialInform"
      @close="family = {}">
      <el-row :gutter="0">
        <el-col :span="12">
          <el-col :span="24">
            <label for="">姓名：</label>
            <span>{{ family.familyName }}</span>
          </el-col>
          <el-col :span="24">
            <label for="">关系：</label>
            <span>{{ family.relationship }}</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="row-flex" :gutter="20" justify="space-between" type="flex">
        <el-col :span="12" class="img-idCard">
          <label for="">身份证正面：</label>
          <m-img-viewer v-if="family.familyIdCardFront" :url="family.familyIdCardFront" title="身份证正面"/>
        </el-col>
        <el-col :span="12" class="img-idCard">
          <label for="">身份证背面：</label>
          <m-img-viewer v-if="family.familyIdCardBack" :url="family.familyIdCardBack" title="身份证背面"/>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" class="img-idCard">
          <label for="">关系证明图：</label>
          <m-img-viewer v-if="family.familyRelationalProofUrl" :url="family.familyRelationalProofUrl" title="关系证明图"/>
        </el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import validator, { helper } from '@/utils'
export default {
  data() {
    return {
      tabs: 'PENDING',
      searchItems: {
        name: { type: 'input', label: '家属姓名' },
        prisonerNumber: { type: 'input', label: '囚号' },
        prisonArea: { type: 'select', label: '监区', options: JSON.parse(localStorage.getItem('user')).prisonConfigList, belong: { value: 'prisonConfigName', label: 'prisonConfigName' } },
        auditName: { type: 'input', label: '审核人' },
        status: { type: 'select', label: '审核状态', options: this.$store.state.applyStatus, miss: true },
        auditAt: { type: 'date', label: '审核时间' },
        applicationDate: { type: 'date', label: '会见时间' }
      },
      show: {
        authorize: false,
        agree: false,
        disagree: false,
        withdraw: false,
        detail: false,
        familiesDetialInform: false
      },
      toAuthorize: {},
      toShow: {},
      remarks: '您的身份信息错误',
      withdraw: {},
      rule: {
        remarks: [{ required: true, message: '请填写撤回理由', trigger: 'blur' }],
        refuseRemark: [ { required: true, message: '请填写驳回原因' }, { validator: validator.lengthRange, max: 200 } ]
      },
      refuseForm: {},
      family: {},
      sortObj: {}
    }
  },
  computed: {
    ...mapState(['meetings', 'frontRemarks'])
  },
  watch: {
    tabs(val) {
      if (val !== 'first') {
        this.searchItems.status.miss = true
      }
      else {
        delete this.filter.status
        this.searchItems.status.miss = false
      }
      this.onSearch()
    },
    toShow: {
      handler: function(val) {
        if (val.id) this.show.detail = true
        else this.show.detail = false
      },
      deep: true
    },
    sortObj: {
      handler: function(val) {
        // this.$parent.$parent.$refs.meetingTable && this.$parent.$parent.$refs.meetingTable.clearSort()
      },
      deep: true
    },
    remarks(val) {
      if (val !== '其他' && this.refuseForm.refuseRemark) this.$refs['refuseForm'].resetFields()
    }
  },
  mounted() {
    this.getDatas()
  },
  methods: {
    ...mapActions(['getMeetings', 'authorizeMeeting', 'withdrawMeeting', 'getMeettingsDetail']),
    sizeChange(rows) {
      this.$refs.pagination.handleSizeChange(rows)
      this.getDatas()
    },
    getDatas() {
      if (this.tabs !== 'first') this.filter.status = this.tabs
      this.getMeetings({ ...this.filter, ...this.pagination })
    },
    onSearch() {
      if (helper.isEmptyObject(this.sortObj)) {
        this.filter = Object.assign(this.filter, this.sortObj)
      }
      else {
        this.$refs.meetingTable && this.$refs.meetingTable.clearSort()
        delete this.filter.sortDirection
        delete this.filter.orderField
      }
      this.$refs.pagination.handleCurrentChange(1)
    },
    handleAuthorization(e) {
      this.toAuthorize = e
      this.show.agree = false
      this.show.disagree = false
      this.show.authorize = true
    },
    handleWithdraw(e) {
      this.toAuthorize = e
      this.withdraw = {}
      this.show.withdraw = true
    },
    onDetail(e) {
      this.toShow = Object.assign({}, e)
    },
    onCloseShow() {
      this.toShow.id = ''
    },
    onAuthorization(e) {
      let params = { id: this.toAuthorize.id, status: e }
      if (e === 'DENIED') {
        if (this.remarks === '其他') {
          this.$refs['refuseForm'].validate(valid => {
            if (valid) {
              params.remarks = this.refuseForm.refuseRemark
            }
          })
        }
        else {
          params.remarks = this.remarks
        }
        if (params.remarks) this.handleSubmit(params)
      }
      else {
        this.handleSubmit(params)
      }
    },
    handleSubmit(params) {
      this.authorizeMeeting(params).then(res => {
        if (!res) return
        this.closeAuthorize()
        this.toAuthorize = {}
        this.getDatas()
      })
    },
    onWithdraw() {
      this.$refs['withdrawForm'].validate(valid => {
        if (valid) {
          let params = { id: this.toAuthorize.id, status: 'DENIED', remarks: this.withdraw.remarks }
          this.withdrawMeeting(params).then(res => {
            if (!res) return
            this.closeWithdraw()
            this.toAuthorize = {}
            this.getDatas()
          })
        }
      })
    },
    closeAuthorize(e) {
      if (e === 'back') this.show.disagree = false
      else this.show.authorize = false
      this.remarks = '您的身份信息错误'
      this.$refs['refuseForm'] && this.$refs['refuseForm'].resetFields()
    },
    closeWithdraw() {
      this.show.withdraw = false
      this.$refs['withdrawForm'].resetFields()
    },
    showFamilyDetail(e) {
      let params = { id: e }
      this.show.familiesDetialInform = true
      this.getMeettingsDetail(params).then(res => {
        if (!res.family) return
        this.family = Object.assign({}, res.family)
      })
    },
    sortChange({ column, prop, order }) {
      if (!prop && !order) {
        this.sortObj = {}
        delete this.filter.sortDirection
        delete this.filter.orderField
      }
      else {
        this.sortObj.orderField = prop
        if (order === 'descending') this.sortObj.sortDirection = 'desc'
        else if (order === 'ascending') this.sortObj.sortDirection = 'asc'
        this.filter = Object.assign(this.filter, this.sortObj)
      }
      this.getDatas()
    }
  }
}
</script>

<style type="text/stylus" lang="stylus" scoped>
.cell img
  width: 126.8px;
  cursor: pointer;
.button-detail
  display: block;
  margin-left: 0;
  width: 56px;
.flex-dialog
  display: flex;
  flex-wrap: wrap;
  label
    display: inline-block;
    width: 90px;
    text-align: right;
.withdraw-box
  margin-bottom: 20px;
.row-flex
  flex-wrap: wrap;
img
  display: block;
.img-idCard
  min-width: 350px;
</style>
