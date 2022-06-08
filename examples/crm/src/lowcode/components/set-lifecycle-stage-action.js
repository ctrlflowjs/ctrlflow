
module.exports = lcdk.defineAction("set-lifecycle-stage",  {
  displayName: 'Set Lifecycle Stage',
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
  perform() {

  }
})
