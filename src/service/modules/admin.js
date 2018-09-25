import * as service from '../config/service'

export default {
  // 获取囚犯账户信息列表
  getAccounts: pagination =>
    service.get('/accounts/page', pagination).then(res => res),
  // 获取囚犯账户详情信息
  getAccountDetail: id =>
    service.get('/accounts/details', id).then(res => res)
}
