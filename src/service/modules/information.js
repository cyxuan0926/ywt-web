import * as service from '../config/service'

export default {
  // 监狱基本信息管理-详情
  getJailInformation: () => {
    return service.get('/jails/getJailsDetail').then(res => res && res.data)
  },
  // 获取狱务公开信息
  getNewsList: params => {
    return service.get('/news/page', params).then(res => res && res.data)
  },
  // 获取新闻详情
  getNewsDetail: params => {
    return service.get(`/news/description?id=${ params }`).then(res => res)
  },
  // 根据id删除狱务公开信息
  deleteNews: params => {
    return service.post('/news/delete', params).then(res => res)
  },
  // 添加狱务公开信息
  addNews: params => {
    return service.post('/news/add', params).then(res => res)
  },
  // 编辑狱务公开信息
  editNews: params => {
    return service.post('/news/add', params).then(res => res)
  },
  // 实地探监-详情
  getPrisonVisitConfigDetail: params => {
    return service.get('/prisoner_visits/configDetail', params).then(res => res && res.data)
  },
  // 实地探监-编辑
  updatePrisonVisitConfig: params => {
    return service.postObj('/prisoner_visits/updateConfig', params).then(res => res && res.code === 200)
  }
}
