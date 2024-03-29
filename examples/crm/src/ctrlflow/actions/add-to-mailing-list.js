let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.actionType("add-to-mailing-list", {
  title: "Add user to mailing list",
  inputSchema: {
    properties: {
      userId: { type: "string", title: "User" },
      mailingList: { type: "string", title: "Mailing List" }
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
