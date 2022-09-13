let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.actionType("send-text-message", {
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
