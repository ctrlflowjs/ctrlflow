let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.eventType("review-submitted", {
  title: "Product review submitted",
  inputSchema: {
    properties: {
    }
  }
})
