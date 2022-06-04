
module.exports = lcdk.defineAction("apply-macro", {
  displayName: 'Apply Macro',
  inputSchema: {
    required: ["macro", "referenceId"],
    properties: {
      macro: {
        type: "string",
        title: "Macro"
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
