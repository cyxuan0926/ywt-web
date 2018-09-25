import http from '@/service'

export default {
  getFeedbacks: ({ commit }, params) => {
    http.getFeedbacks(params).then(res => res && commit('getFeedbacks', res))
  }
}
