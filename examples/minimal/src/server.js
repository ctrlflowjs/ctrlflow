const express = require("express")
const ctrlflow = require("@ctrlflow/core")

// define ctrlflow app with components
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

// set up the UI server
const server = express()
const port = 3000

server.use(ctrlflow.express({ app: ctrlflowApp }))

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// start the execution runtime worker
ctrlflowApp.start()

// emit events to trigger subscribed no-code workflows
setInterval(() => ctrlflowApp.emitEvent("cocktail-party-started"), 10_000)
