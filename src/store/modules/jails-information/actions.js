import http from '@/service'

export default {
  // 获取监狱基本信息
  getJailInformation: ({ commit }) => {
    return http.getJailInformation().then(res => res && commit('getJailInformation', res))
  },
  // 编辑监狱信息
  editJails: ({ commit }, regs) => {
    return http.editJails(regs).then(res => res.code === 200)
  }
}
