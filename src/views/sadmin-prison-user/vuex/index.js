import actions from './actions'
import mutations from './mutations'

let state = {
  prisonUsers: { contents: [], total: 0 },
  prisonUser: { prisonConfigIds: [] }
}

export default {
  actions,
  mutations,
  state
}
