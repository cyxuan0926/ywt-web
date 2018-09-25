import mutations from './mutations'
import getters from './getters'
import actions from './actions'

let state = {
  loading: false // 是否显示loading遮罩层
}

export default {
  actions,
  mutations,
  getters,
  state
}
