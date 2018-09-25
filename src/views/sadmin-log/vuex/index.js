import actions from './actions'
import mutations from './mutations'

let state = {
  appLogs: { contents: [], total: 0 }
}

export default {
  actions,
  mutations,
  state
}
