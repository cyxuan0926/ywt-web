import http from '@/service'

export default {
  getWhitemembers: ({ commit }, params) => {
    http.getWhitemembers(params).then(res => res && commit('getWhitemembers', res))
  },
  checkPhoneWhitemember: ({ commit }, params) => {
    return http.checkPhoneWhitemember(params).then(res => res)
  },
  deleteWhitemember: ({ commit }, params) => {
    return http.deleteWhitemember(params).then(res => res)
  },
  addWhitemember: ({ commit }, params) => {
    return http.addWhitemember(params).then(res => res)
  },
  updateWhitemember: ({ commit }, params) => {
    return http.updateWhitemember(params).then(res => res)
  }
}
