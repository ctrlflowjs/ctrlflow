let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("send-slack-message", {
  title: "Send slack message",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
