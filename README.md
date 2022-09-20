<p align="center" style="margin-bottom: -5px">
  <img width="245" height="70" src="./docs/assets/Logo.PNG">
</p>

ctrlflow is a **JS framework for adding no-code process automation features** to any Node.js web service. It provides a self-service UI that allows non-technical users to describe automated workflows from actions and events written in code by your engineering team. These no-code workflows are executed by a Redis-powered processing engine that runs as a worker in your app. Developers can easily make existing and new app functionality available for users to control as no-code modules, or further extend it with generic modules pulled from the open source community.

Most no-code platforms focus on third-party integrations, but they limit you to the ones they support, or provide unsatisfying options for extending with custom capabilities. ctrlflow is for organizations that have invested in building their own services, but who want the business advantage of empowering non-coding individuals to automate and modify processes on their own. It leans into that engineering investment and **empowers developers to easily deliver whatever your organization needs, however it's needed, without compromising their ability to write, test, and manage code like professionals.**

The project is v0 and still in early development. v0 releases are expected to run (please give it a try and share feedback!), just be warned that there will be bugs, and preserving backwards compatibility is not yet a priority.

## Demo

You can check out the no-code dashboard UI at [demo.ctrlflowjs.com](https://demo.ctrlflowjs.com/). The actions and events available in this demo are purely illustrative examples, your app would contain components designed and created by your own team. You can check out [the demo app's code here](https://github.com/ctrlflowjs/ctrlflow/tree/main/examples/crm) to see how it [adds no-code actions and events](https://github.com/ctrlflowjs/ctrlflow/blob/main/examples/crm/src/ctrlflow/app.js), and how it [connects the UI and starts the runtime](https://github.com/ctrlflowjs/ctrlflow/blob/main/examples/crm/src/server.js).


## Getting Started

Install it your Node.js app
```
npm install @ctrlflow/core
```
Import ctrlflow and define an app with no-code components, including actions and event types. These will become available to users in the UI.

```javascript
const ctrlflow = require("@ctrlflow/core")

const ctrlflowApp = ctrlflow.app({
  components: [
    ctrlflow.actionType("say-hello", {
      title: "Say hello",
      inputSchema: {
        properties: {
          recipient: { type: "string", title: "Recipient" },
        }
      },
      async perform(inputs) {
        const recipient = inputs.recipient || 'world'
        console.log(`Hello, ${recipient}!`)
      }
    }),
    ctrlflow.eventType("cocktail-party-started", {
      title: "Cocktail party started"
    })
  ]
})
```

Start your server, including the ctrlflow UI middleware.
```javascript
const express = require("express")

const server = express()
const port = 3000

server.use(ctrlflow.express({ app: ctrlflowApp }))

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

Users can now access the workflow editor and monitoring dashboard. Here, they can describe workflows using the actions you created, and specify which events trigger the workflow to run.

<p align="center" style="margin-bottom: -5px; border: 1px solid black;">
  <kbd>
    <img height="450" src="https://user-images.githubusercontent.com/7517915/190938890-02115568-e222-4c18-bfd5-385797805c31.png">
  </kbd>
</p>


Start your app, so it can listen for events that trigger workflows
```javascript
ctrlflowApp.start()
```

Finally, emit events from code to trigger workflows that subscribe to that event.

```javascript
ctrlflowApp.emitEvent("cocktail-party-started")
```

## License

ctrlflow is free and open source software with an MIT license. Depending on how the project matures, a subscription based pro version may also be added under a separate license, which would include a support plan and advanced controls aimed at larger businesses.
