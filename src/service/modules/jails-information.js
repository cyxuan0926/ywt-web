import * as service from '../config/service'

export default {
  // 富文本上传图片
  uploadImageFromEditor: image =>
    service.postFile('/upload', image).then(res => res).catch(err => err),
  // 编辑监狱信息
  editJails: jails => {
    return service.postObj('/jails/updateJails', jails).then(res => res)
  },
  // 添加监狱信息
  addJails: jails => {
    return service.postObj('/jails/addJails', jails).then(res => res)
  }
}
