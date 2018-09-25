export default {
  getMailboxes(state, params) {
    state.mailboxes.contents = params.mailBoxes
    state.mailboxes.total = params.total
  },
  getMailbox(state, params) {
    state.mailbox = params.replys
  }
}
