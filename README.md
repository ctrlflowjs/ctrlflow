<p align="center" style="margin-bottom: -5px">
  <img width="245" height="70" src="./docs/Logo.PNG">
</p>

ctrlflow is an **app development framework** for no-code process automation that reimagines the standard model of no-code platforms. It allows developers to easily create and support no-code experiences custom-tailored to your organization, without compromising on best practice processes and tooling. It aims to ease no-code adoption for orgs small and large, while making it easy to move complexity into full-code as solutions mature.

The project is v0 and still in early development. During v0 each release is expected to run (please give it a try and share feedback!) just be warned that there will be bugs, and preserving backwards compatibility is not yet a priority.

## Getting Started

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

## License

ctrlflow is free and open source software with an MIT license at its core. A subscription based pro version will also be made available under a separate license, featuring a support plan and features that may be worthwhile for some businesses. The approach is influenced by projects like Sidekiq. It may include value-adds like pre-fabricated third party integrations and advanced administrative controls, but nothing essential will be reserved for the paid version. As great as it would be if all features of ctrlflow could be free of charge, it would benefit the project and its users even more if the maintainer can work on it outside of nights and weekends.
