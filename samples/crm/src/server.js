const express = require("express")
const cors = require("cors")
const lcdk = require("../../../core/main")
const lowcodeApp = require('./lowcode/app')

const app = express()
const port = 3000

app.use(cors())
app.use(lcdk.express({ app: lowcodeApp }))

let router = express.Router()

router.get("/hey", (req, res) => {
  res.json({})
})
app.use('/what', router)

app.get("/hey", (req, res) => {
  res.json({})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// if you also want this app to run as a worker
lowcodeApp.start()
