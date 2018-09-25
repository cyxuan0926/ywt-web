import http from '@/service'

export default {
  // 修改用户名密码的方法
  modifyPassword({ commit }, regs) {
    let params = {
      old_password: regs.password,
      new_password: regs.new_password
    }
    http.modifyPassword(params).then(res => res.code === 200 && commit('modifyPassword', res)).catch(err => console.log(err))
  }
}
