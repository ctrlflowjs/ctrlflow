let lcdk = require("@lcdk/core")

module.exports = lcdk.eventType("tag-added", {
  title: "Tag added to case",
  inputSchema: {
    properties: {
    }
  }
})
