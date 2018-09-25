import http from '@/service'

export default {
  // 下载文件
  downloadFile: ({ commit }, regs) =>
    http.downloadFile(regs).then(res => res.code === 200 && commit('downloadFile', res)).catch(err => console.log(err))
}
