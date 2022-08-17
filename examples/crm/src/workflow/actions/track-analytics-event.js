let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.actionType("track-analytics-event", {
  title: "Track analytics event",
  inputSchema: {
    properties: {
      caseId: { type: "string", title: "Case ID" },
      name: { type: "string", title: "Name" },
      details: { type: "string", title: "Details" },
    }
  },
})
