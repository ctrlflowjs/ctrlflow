let lcdk = require("@ctrlflow/core")

module.exports = lcdk.actionType("set-lifecycle-stage", {
  title: "Apply tag",
  inputSchema: {
    properties: {
      caseId: { type: "string", title: "Case ID" },
      tagName: { type: "string", title: "Tag name" },
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
