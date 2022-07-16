let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("send-text-message", {
  title: "Send text message",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
