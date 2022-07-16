let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("set-lifecycle-stage", {
  title: "Set lifecycle stage",
  inputSchema: {
    properties: {
      caseId: { type: "string", title: "Case ID" },
      lifecycleStage: { type: "string", title: "Lifecycle stage" },
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
