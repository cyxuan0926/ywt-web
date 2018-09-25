export default {
  // 获取家属信息列表
  getAppLogs(state, params) {
    state.appLogs.contents = params.appLoggers
    state.appLogs.total = params.appLoggersSize
  }
}
