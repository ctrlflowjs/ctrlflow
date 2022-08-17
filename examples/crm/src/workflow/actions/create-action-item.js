let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.actionType("create-action-item", {
  title: "Create to-do item",
  inputSchema: {
    properties: {
      itemName: { type: "string", title: "Name" },
      description: { type: "string", title: "Description" }
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
