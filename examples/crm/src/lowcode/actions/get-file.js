let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("get-file", {
  title: "Retrieve file",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
