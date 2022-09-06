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

Describe actions in code, using a mix of configuration metadata and an implementation in code for what the action does when invoked.

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
    return userService.CreateUser({
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

Out of the box, it provides a workflow editor UI and a workflow execution runtime. Developers simply describe components like actions and events in code that they want to make available to users, and ctrlflow automatically populates them in the UI. Components can also be added from third party packages.

The workflow editor comes in two forms:

1) An admin-style dashboard, where users can author and search for automation definitions, or review executions of these instances. This is an experience similar to what most SaaS no-code platforms provide.
2) The automation workflow editor also ~~is~~ will be available as a standalone UI component that can be embedded into any web application. This will let you deliver the ability for users to describe automated processes within a specific context, with the option to limit the actions and events that are available to use in that context. This component also integrates automatically with the backend execution runtime.

The framework requires a message scheduling provider and persistent storage. At the moment the only supported provider is Redis, though others may be supported later.

1) npm install
2) create app instance
  - adding actions (later)
  - configuring a provider (later)
3) plug app into express server
4) start worker

## License

ctrlflow is free and open source software with an MIT license at its core. A subscription based pro version will also be made available under a different license, featuring a support plan and features that may be worthwhile for some businesses. The approach is influenced by projects like Sidekiq. It may include value-adds like pre-fabricated third party integrations and advanced administrative controls, but nothing essential will be reserved for the paid version. As great as it would be if all features of ctrlflow could be free of charge, it would benefit the project and its users even more if the maintainer can work on it outside of nights and weekends.
