import actions from './actions'
import mutations from './mutations'

let state = {
  visits: { contents: [], total: 0 },
  meetingAdjustment: { meetingQueue: [], terminals: [], meetings: [] }
}

export default {
  actions,
  mutations,
  state
}
