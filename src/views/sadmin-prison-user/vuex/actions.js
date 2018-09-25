import http from '@/service'

export default {
  getPrisonUsers: ({ commit }, params) => {
    return http.getPrisonUsers(params).then(res => {
      if (!res) return
      res.items.forEach(user => {
        let configList = []
        if (!user.prisonConfigList) return
        user.prisonConfigList.forEach(c => { configList.push(c.prisonConfigName) })
        user.prisonAreas = configList.join('、')
      })
      commit('getPrisonUsers', res)
      return true
    })
  },
  deletePrisonUser: ({ commit }, params) => {
    return http.deletePrisonUser(params).then(res => res)
  },
  addPrisonUser: ({ commit }, params) => {
    return http.addPrisonUser(params).then(res => res)
  },
  getPrisonUserDetail: ({ commit }, params) => {
    return http.getPrisonUserDetail(params).then(res => {
      if (!res) return
      commit('getPrisonUserDetail', res)
      return true
    })
  },
  updatePrisonUser: ({ commit }, params) => {
    return http.updatePrisonUser(params).then(res => res)
  },
  enableOrDisablePrisonUser: ({ commit }, params) => {
    return http.enableOrDisablePrisonUser(params).then(res => res)
  }
}
