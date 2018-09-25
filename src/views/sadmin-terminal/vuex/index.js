import actions from './actions'
import mutations from './mutations'

let state = {
  terminals: { contents: [], total: 0 },
  terminal: {}
}

export default {
  actions,
  mutations,
  state
}
