
# Getting Started

ctrlflow can be added to any node application as an npm package.

```
npm install @ctrlflow/core
```

Describe actions and events in code, using a mix of configuration metadata and an implementation in code for what the action does when invoked.

```
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
    return await userService.CreateUser({
      username: inputs.username,
      emailAddress: inputs.emailAddress,
      firstname: inputs.firstName,
      lastname: inputs.lastName
    })
  }
})

```

Create your application instance, registering your components and configuring it with a runtime provider. More info on options for configuring your application here.

```
const ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.app({...})
```

Finally, setup the dashboard server by applying a built-in express middleware, then start the runtime worker.

```
const express = require("express")
const ctrlflow = require("@ctrlflow/core")
const ctrlflowApp = require('./ctrlflow/app')

const app = express()
const port = 3000

// register UI server
app.use(ctrlflow.express({ app: ctrlflowApp }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// start the workflow runtime worker
ctrlflowApp.start()
```
