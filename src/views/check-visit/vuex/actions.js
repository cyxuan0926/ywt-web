import http from '@/service'

export default {
  getVisits({ commit }, params) {
    http.getVisits(params).then(res => res && commit('getVisits', res))
  },
  getCanceledVisit({ commit }, params) {
    http.getCanceledVisit(params).then(res => res && commit('getVisits', res))
  },
  authorizeVisit({ commit }, params) {
    return http.authorizeVisit(params).then(res => res)
  },
  withdrawVisit({ commit }, params) {
    return http.withdrawVisit(params).then(res => res)
  }
}
