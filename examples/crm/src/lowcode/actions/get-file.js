let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("get-file", {
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
