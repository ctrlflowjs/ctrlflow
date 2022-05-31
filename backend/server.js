let express = require("express")
var cors = require('cors')
let lcdk = require("./core")
require("./definitions")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

app.get('/lcdk/meta', (req, res) => {
  let result = {
    events: lcdk.getEvents(),
    actions: lcdk.getActions()
  }
  res.json(result)
})

app.get('/lcdk/workflows', (req, res) => {
  let result = lcdk.getAllWorkflows()
  res.json(result)
})

app.get('/lcdk/workflows/:workflowId', (req, res) => {
  let result = lcdk.getWorkflow(req.params.workflowId)
  res.json(result)
})

app.post('/lcdk/workflows', (req, res) => {
  let result = lcdk.createWorkflow(req.body)
  res.json(result)
})

app.put('/lcdk/workflows/:workflowId', (req, res) => {
  let result = lcdk.updateWorkflow(req.params.workflowId, req.body)
  res.json(result)
})

app.delete('/lcdk/workflows/:workflowId', (req, res) => {
  lcdk.deleteWorkflow(req.params.workflowId)
  res.end()
})

app.post('/lcdk/emit-event', async (req, res) => {
  let { eventName, eventInputs } = req.body
  await lcdk.emitEvent(eventName, eventInputs)
  res.end()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
