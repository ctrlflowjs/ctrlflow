let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("set-lifecycle-stage", {
  title: "Set lifecycle stage",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
