let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("save-file", {
  title: "Save file",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
