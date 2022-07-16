let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("create-action-item", {
  title: "Create to-do item",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
