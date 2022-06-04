const express = require("express")
const cors = require("cors")
const lcdk = require("@lcdk/core")
const lowcodeApp = require('./lowcode/app')

const app = express()
const port = 3000

app.use(cors())

app.use(lcdk.express({ app: lowcodeApp }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// if you also want this app to run as a worker
lowcodeApp.start().then(() => {
  console.log("lcdk worker started")
})
