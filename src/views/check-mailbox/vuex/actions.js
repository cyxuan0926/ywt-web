import http from '@/service'

export default {
  getMailboxes({ commit }, params) {
    http.getMailboxes(params).then(res => res && commit('getMailboxes', res))
  },
  getMailbox({ commit }, params) {
    http.getMailbox(params).then(res => res && commit('getMailbox', res))
  },
  mailboxReply({ commit }, params) {
    return http.mailboxReply(params).then(res => res)
  }
}
