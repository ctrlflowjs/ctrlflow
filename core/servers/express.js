let express = require("express")

module.exports = function({ app }) {
  const router = express.Router()

  router.use('/', express.json())

  router.get('/lcdk/meta', (req, res) => {
    let result = {
      eventDefs: app.getEvents(),
      actionDefs: app.getActions()
    }
    res.json(result)
  })

  router.get('/lcdk/workflows', async (req, res) => {
    let result = await app.getAllWorkflows()
    res.json(result)
  })

  router.get('/lcdk/workflows/:workflowId', async (req, res) => {
    let result = await app.getWorkflow(req.params.workflowId)
    res.json(result)
  })

  router.post('/lcdk/workflows', async (req, res) => {
    let result = await app.createWorkflow(req.body)
    res.json(result)
  })

  router.put('/lcdk/workflows/:workflowId', async (req, res) => {
    let result = await app.updateWorkflow(req.params.workflowId, req.body)
    res.json(result)
  })

  router.delete('/lcdk/workflows/:workflowId', async (req, res) => {
    await app.deleteWorkflow(req.params.workflowId)
    res.end()
  })

  router.post('/lcdk/emit-event', async (req, res) => {
    let { type, inputs } = req.body
    await app.emitEvent(type, inputs)
    res.end()
  })

  return router
}
