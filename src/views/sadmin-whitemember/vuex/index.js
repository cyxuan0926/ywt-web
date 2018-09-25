import actions from './actions'
import mutations from './mutations'

let state = {
  whitemembers: { contents: [], total: 0 },
  whitemember: {}
}

export default {
  actions,
  mutations,
  state
}
