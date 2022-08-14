let lcdk = require("@ctrlflow/core")

module.exports = lcdk.actionType("send-text-message", {
  title: "Send text message",
  inputSchema: {
    properties: {
      phoneNumber: { type: "string", title: "Phone number" },
      message: { type: "string", title: "Message" },
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
