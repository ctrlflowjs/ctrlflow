let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.eventType("case-status-changed", {
  title: "Case status changed",
  inputSchema: {
    properties: {
    }
  }
})
