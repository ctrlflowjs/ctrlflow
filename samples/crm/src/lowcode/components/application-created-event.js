let lcdk = require("../../../../../core/main")

module.exports = lcdk.eventType("application-created", {
  version: "1",
  displayName: "Application Created",
  tags: ['business'],
  inputSchema: {
    properties: {
      referenceId: { type: 'string', title: 'Reference Id' }
    }
  }
})
