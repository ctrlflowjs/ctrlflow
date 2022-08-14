let lcdk = require("@ctrlflow/core")

module.exports = lcdk.actionType("send-slack-message", {
  title: "Send slack message",
  inputSchema: {
    properties: {
      channel: { type: "string", title: "Channel" },
      message: { type: "string", title: "Message" },
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
