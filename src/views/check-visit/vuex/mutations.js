export default {
  getVisits(state, params) {
    state.visits.contents = params.visits
    state.visits.total = params.total
  }
}
