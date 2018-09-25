export default {
  getWhitemembers: (state, params) => {
    state.whitemembers.contents = params.whitenumbers
    state.whitemembers.total = params.whitenumbersSize
  },
  getWhitememberDetail: (state, params) => {
    state.whitemember = params
  }
}
