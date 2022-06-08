
module.exports = lcdk.actionType("add-remove-tag", {
  displayName: 'Add/Remove Tag',
  inputSchema: {
    required: ["tagName", "referenceId"],
    properties: {
      tagName: {
        type: "string",
        title: "Tag Name"
      },
      referenceId: {
        type: "string",
        title: "Reference Id"
      },
      action: {
        type: {
          oneOf: [
            { type: "string", enum: [ "Add", "Remove" ] }
          ]
        },
        title: "Action"
      }
    }
  },
  perform() {

  }
})
