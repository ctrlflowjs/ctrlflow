let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("add-tag", {
  title: "Add or remove tag",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
