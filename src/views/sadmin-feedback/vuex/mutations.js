export default {
  getFeedbacks(state, params) {
    state.feedbacks.contents = params.feedbacks
    state.feedbacks.total = params.listSize
  }
}
