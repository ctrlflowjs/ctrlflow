let lcdk = require("@ctrlflow/core")

module.exports = lcdk.eventType("review-submitted", {
  title: "Product review submitted",
  inputSchema: {
    properties: {
    }
  }
})
