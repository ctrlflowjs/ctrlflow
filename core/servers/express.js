let express = require("express")
const lcdkDash = require("@lcdk/dashboard")

module.exports = function({ app }) {
  const router = express.Router()

  // spa routing
  router.get('*', (req, res, next) => {
    if (!req.url.startsWith("/lcdk/") && !req.url.includes('.')) {
      req.url = "/"
    }
    next()
  })

  router.use(express.static(lcdkDash.distDir()))

  router.use(express.json())

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
