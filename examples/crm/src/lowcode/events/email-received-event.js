let lcdk = require("@ctrlflow/core")

module.exports = lcdk.eventType("email-received", {
  title: "Email received",
  inputSchema: {
    properties: {
    }
  }
})
