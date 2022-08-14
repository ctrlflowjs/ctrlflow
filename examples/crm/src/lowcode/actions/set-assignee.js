let lcdk = require("@ctrlflow/core")

module.exports = lcdk.actionType("set-assignee", {
  title: "Set assignee",
  inputSchema: {
    properties: {
      caseId: { type: "string", title: "Case ID" },
      assignee: { type: "string", title: "Assignee" },
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
