let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("send-invoice", {
  title: "Send invoice",
  inputSchema: {
    properties: {
      username: { type: "string", title: "Username" },
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
