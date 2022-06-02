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
    eventDefs: lcdk.getEvents(),
    actionDefs: lcdk.getActions()
  }
  res.json(result)
})

app.get('/lcdk/workflows', async (req, res) => {
  let result = await lcdk.getAllWorkflows()
  res.json(result)
})

app.get('/lcdk/workflows/:workflowId', async (req, res) => {
  let result = await lcdk.getWorkflow(req.params.workflowId)
  res.json(result)
})

app.post('/lcdk/workflows', async (req, res) => {
  let result = await lcdk.createWorkflow(req.body)
  res.json(result)
})

app.put('/lcdk/workflows/:workflowId', async (req, res) => {
  let result = await lcdk.updateWorkflow(req.params.workflowId, req.body)
  res.json(result)
})

app.delete('/lcdk/workflows/:workflowId', async (req, res) => {
  await lcdk.deleteWorkflow(req.params.workflowId)
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
