import actions from './actions'
import mutations from './mutations'

let state = {
  prisons: { contents: [], total: 0 },
  prison: { imageUrl: '', usual: [null], weekend: [null], special: [{ date: '', queue: [null] }] }
}

export default {
  actions,
  mutations,
  state
}
