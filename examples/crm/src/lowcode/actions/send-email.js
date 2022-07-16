let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("send-email", {
  title: "Send email",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
