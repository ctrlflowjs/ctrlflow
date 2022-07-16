let lcdk = require("@lcdk/core")

module.exports = lcdk.eventType("payment-received", {
  title: "Payment received",
  inputSchema: {
    properties: {
    }
  }
})
