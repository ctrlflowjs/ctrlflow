let express = require("express")
var cors = require('cors')
let lowrider = require("./core")
require("./definitions")
const app = express()
const port = 3000

app.use(cors())

app.get('/lowrider', (req, res) => {
  res.json({
    events: lowrider.getEvents(),
    actions: lowrider.getActions()
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
