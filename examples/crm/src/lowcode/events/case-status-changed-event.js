let lcdk = require("@lcdk/core")

module.exports = lcdk.eventType("case-status-changed", {
  title: "Case status changed",
  inputSchema: {
    properties: {
    }
  }
})
