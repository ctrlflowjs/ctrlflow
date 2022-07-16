let lcdk = require("@lcdk/core")

module.exports = lcdk.eventType("case-created", {
  title: "Case created",
  inputSchema: {
    properties: {
    }
  }
})
