let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("set-case-followup-date", {
  title: "Set case followup date",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
