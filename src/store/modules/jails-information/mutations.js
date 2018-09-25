export default {
  // 获取监狱基本信息
  getJailInformation: (state, params) => {
    state.jailInformation = Object.assign({}, params.jails, { meetingQueue1: [null] })
  },
  // 编辑监狱信息
  editJails: (state, editJailsResult) => { state.editJailsResult = editJailsResult }
}
