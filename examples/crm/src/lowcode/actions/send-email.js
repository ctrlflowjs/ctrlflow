let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("send-email", {
  title: "Send email",
  inputSchema: {
    properties: {
      to: { type: "string", title: "To" },
      subject: { type: "string", title: "Subject" },
      body: { type: "string", title: "Body" },
      cc: { type: "string", title: "CC" },
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
