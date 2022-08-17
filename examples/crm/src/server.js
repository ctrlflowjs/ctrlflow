const express = require("express")
const ctrlflow = require("ctrlflowjs")
const workflowApp = require('./lowcode/app')

const app = express()
const port = 3000

app.use(ctrlflow.express({ app: lowcodeApp }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// if you also want this app to run as a worker
workflowApp.start()
