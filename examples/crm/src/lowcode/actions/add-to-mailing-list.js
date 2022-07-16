let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("add-to-mailing-list", {
  title: "Add user to mailing list",
  inputSchema: {
    properties: {}
  },
  async perform(inputs, ctx) {
    return {}
  }
})
