export default {
  // 显示loading遮罩层
  showLoading: state => { state.loading = true },
  // 隐藏loading遮罩层
  hideLoading: state => { state.loading = false },
  resetState: (state, params) => {
    if (params === 'logout') {
      Object.keys(state).forEach(key => {
        if (state[key] && state[key].contents && state[key].contents.length) state[key] = { contents: [], total: 0 }
      })
    }
    else {
      Object.keys(params).forEach(key => {
        state[key] = params[key]
      })
    }
  }
}
