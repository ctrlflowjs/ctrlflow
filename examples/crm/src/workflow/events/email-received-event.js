let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.eventType("email-received", {
  title: "Email received",
  inputSchema: {
    properties: {
    }
  }
})
