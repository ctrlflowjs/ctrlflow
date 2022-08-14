let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.actionType("get-file", {
  title: "Retrieve file",
  inputSchema: {
    properties: {
      fileName: { type: "string", title: "File name" },
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
