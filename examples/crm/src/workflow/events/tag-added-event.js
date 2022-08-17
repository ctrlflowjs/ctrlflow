let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.eventType("tag-added", {
  title: "Tag added to case",
  inputSchema: {
    properties: {
    }
  }
})
