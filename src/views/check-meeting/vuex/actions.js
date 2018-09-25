import http from '@/service'

export default {
  getMeetings({ commit }, params) {
    http.getMeetings(params).then(res => res && commit('getMeetings', res))
  },
  authorizeMeeting({ commit }, params) {
    return http.authorizeMeeting(params).then(res => res)
  },
  withdrawMeeting({ commit }, params) {
    return http.withdrawMeeting(params).then(res => res)
  },
  getMeetingConfigs({ commit }, params) {
    return http.getMeetingConfigs(params).then(res => {
      if (!res) return
      commit('getMeetingConfigs', res)
      return true
    })
  },
  adjustMeeting({ commit }, params) {
    return http.adjustMeeting(params).then(res => res)
  },
  getFreeMeetings({ commit }, params) {
    http.getFreeMeetings(params).then(res => res && commit('getFreeMeetings', res))
  },
  getMeettingsDetail({ commit }, params) {
    return http.getMeettingsDetail(params).then(res => res)
  }
}
