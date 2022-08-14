let lcdk = require("@ctrlflow/core")

module.exports = lcdk.actionType("save-file", {
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
