let lcdk = require("@ctrlflow/core")

module.exports = lcdk.eventType("tag-added", {
  title: "Tag added to case",
  inputSchema: {
    properties: {
    }
  }
})
