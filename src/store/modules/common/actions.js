export default {
  resetState: ({ commit }, params) => {
    if (!params) return
    commit('resetState', params)
  }
}
