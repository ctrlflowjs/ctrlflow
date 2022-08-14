let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.actionType("send-invoice", {
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
