import http from '@/service'

export default {
  // 获取狱务通app版本号
  getVersions({ commit }, params) {
    http.getVersions(params).then(res => res && commit('getVersions', res))
  },
  // 更新狱务通版本信息
  updateVersion({ commit }, params) {
    return http.updateVersion(params).then(res => res)
  }
}
