const express = require("express")
const ctrlflow = require("@ctrlflow/core")
const ctrlflowApp = require('./ctrlflow/app')

const app = express()
const port = 3000

app.use(ctrlflow.express({ app: ctrlflowApp }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// if you also want this app to run as a worker
ctrlflowApp.start()
