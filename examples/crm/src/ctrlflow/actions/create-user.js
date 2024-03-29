let ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.actionType("create-user", {
  title: "Create user",
  inputSchema: {
    properties: {
      username: { type: "string", title: "Username" },
      emailAddress: { type: "string", title: "Email address" },
      firstName: { type: "string", title: "First name" },
      lastName: { type: "string", title: "Last name" },
    }
  },
  async perform(inputs, ctx) {
    console.log("CREATE USER", inputs)
    return {}
  }
})
