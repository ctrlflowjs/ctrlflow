let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("set-lifecycle-stage",  {
  version: "1",
  displayName: 'Set Lifecycle Stage',
  title: 'Set Lifecycle Stage',
  inputSchema: {
    required: ["lifecycleStage", "referenceId"],
    properties: {
      lifecycleStage: {
        type: "string",
        title: "Lifecycle Stage",
        enum: [
          "Not Started",
          "Quotes Sent",
          "Policy In-Force Service",
          "Merged"
        ]
      },
      referenceId: {
        type: "string",
        title: "Reference Id"
      }
    }
  },
  async perform() {
    return {}
  }
})
