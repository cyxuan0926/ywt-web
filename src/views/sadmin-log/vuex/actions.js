import http from '@/service'

export default {
  getAppLogs: ({ commit }, regs) => {
    http.getAppLogs(regs).then(res => res && commit('getAppLogs', res))
  }
}
