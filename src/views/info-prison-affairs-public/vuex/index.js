import actions from './actions'
import mutations from './mutations'

let state = {
  newsList: { contents: [], total: 0 },
  newsAll: [], // 狱务公开管理模块全部原始数据
  news: {},
  newsTotal: 0, // 狱务公开管理模块全部数据
  // prisonAffairsDisclosure: [], // 狱务公开信息
  // prisonAffairsDisclosureOrigin: [], // 狱务公开最初的信息
  // prisonAffairsDisclosureTotal: 0, // 狱务公开记录条数
  // workingDynamics: [], // 工作动态信息
  // workingDynamicsOrigin: [], // 工作动态最初的信息
  // workingDynamicsTotal: 0, // 工作动态记录条数
  // complaintsProposals: [], // 投诉建议信息
  // complaintsProposalsOrigin: [], // 投诉建议最初的信息
  // complaintsProposalsTotal: 0, // 投诉建议的记录条数
  newsForEdit: {}, // 待编辑的新闻信息对象
  editNewsResult: {}, // 编辑狱务公开信息的结果
  addNewsResult: {} // 添加狱务公开信息的结果
}

export default {
  actions,
  mutations,
  state
}
