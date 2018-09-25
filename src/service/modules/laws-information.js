import * as service from '../config/service'

export default {
  // 获取法律法规信息
  getLawsInformation: params =>
    service.get(`/laws.json`, params).then(res => res).catch(err => err),
  // 添加法律法规信息
  addLaw: law =>
    service.postFile(`/laws`, law).then(res => res).catch(err => err),
  // 编辑法律法规信息
  editLaw: law =>
    service.postFile(`/laws/update`, law).then(res => res).catch(err => err),
  // 根据id删除法律法规
  deleteLawById: id =>
    service.remove(`/laws/${ id }`).then(res => res).catch(err => err)
}
