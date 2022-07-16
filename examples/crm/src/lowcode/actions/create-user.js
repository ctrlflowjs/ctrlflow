let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("create-user", {
  title: "Create user",
  inputSchema: {
    properties: {
      username: { type: "string", title: "Username" },
      emailAddress: { type: "string", title: "Email address" },
    }
  },
  async perform(inputs, ctx) {
    return {}
  }
})
