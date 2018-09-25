import actions from './actions'
import mutations from './mutations'

let state = {
  prisoners: { contents: [], total: 0 },
  notification: {},
  notificationFamilies: []
}

export default {
  actions,
  mutations,
  state
}
