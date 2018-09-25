import * as service from '../config/service'

export default {
  // 下载文件
  downloadFile: filename =>
    service.get('/download/downloadfile', { filepath: filename }).then(res => res).catch(err => err)
}
