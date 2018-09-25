import http from '@/service'

export default {
  // 上传文件
  uploadFile({ commit }, params) {
    let formData = new FormData()
    params && formData.append('file', params)
    return http.uploadFile(formData).then(res => {
      if (!res) return
      commit('uploadFile', res)
      return true
    })
  }
}
