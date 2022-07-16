let lcdk = require("@lcdk/core")

module.exports = lcdk.eventType("review-submitted", {
  title: "Product review submitted",
  inputSchema: {
    properties: {
    }
  }
})
