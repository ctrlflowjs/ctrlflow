let lcdk = require("@lcdk/core")

module.exports = lcdk.eventType("application-created", {
  version: "1",
  title: "Application Created",
  tags: ['business'],
  inputSchema: {
    properties: {
      referenceId: { type: 'string', title: 'Reference Id' }
    }
  }
})
