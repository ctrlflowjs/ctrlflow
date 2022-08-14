let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.actionType("save-file", {
  title: "Save file",
  inputSchema: {
    properties: {
      fileName: { type: "string", title: "File name" },
      fileData: { type: "string", title: "File" }
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
