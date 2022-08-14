let lcdk = require("@ctrlflow/core")

module.exports = lcdk.eventType("payment-received", {
  title: "Payment received",
  inputSchema: {
    properties: {
    }
  }
})
