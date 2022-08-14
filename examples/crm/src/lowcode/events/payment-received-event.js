let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.eventType("payment-received", {
  title: "Payment received",
  inputSchema: {
    properties: {
    }
  }
})
