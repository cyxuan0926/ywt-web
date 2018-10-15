import actions from './actions'
import mutations from './mutations'

let state = {
  prisonReportList: { contents: [], total: 0 },
  prisonAreaReportList: { contents: [], total: 0 }
}

export default {
  actions,
  mutations,
  state
}
