let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("send-invoice", {
  title: "Send invoice",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
