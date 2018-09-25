import actions from './actions'
import mutations from './mutations'

let state = {
  mailboxes: { contents: [], total: 0 },
  mailbox: {}
}

export default {
  actions,
  mutations,
  state
}
