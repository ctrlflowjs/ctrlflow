let lcdk = require("@lcdk/core")

module.exports = lcdk.eventType("email-received", {
  title: "Email received",
  inputSchema: {
    properties: {
    }
  }
})
