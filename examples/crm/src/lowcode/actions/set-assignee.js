let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("set-assignee", {
  title: "Set assignee",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
