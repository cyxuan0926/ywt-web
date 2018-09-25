export default {
  getPrisonUsers: (state, params) => {
    state.prisonUsers.contents = params.items
    state.prisonUsers.total = params.itemSize
  },
  getPrisonUserDetail: (state, params) => {
    state.prisonUser = Object.assign({}, { prisonConfigIds: [] }, params)
  }
}
