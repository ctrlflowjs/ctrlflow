let lcdk = require("@ctrlflow/core")

module.exports = lcdk.actionType("set-case-followup-date", {
  title: "Set case followup date",
  inputSchema: {
    properties: {
      caseId: { type: "string", title: "Case ID" },
      followupDate: { type: "string", title: "Followup date" },
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
