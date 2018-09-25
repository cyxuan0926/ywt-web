export default {
  getRegistrations(state, params) {
    state.registrations.contents = params.registrations
    state.registrations.total = params.total
  }
}
