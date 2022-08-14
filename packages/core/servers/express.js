let express = require("express")
const ctrlflowDash = require("@ctrlflow/dashboard")

module.exports = function({ app }) {
  const router = express.Router()

  // spa routing
  router.get('*', (req, res, next) => {
    if (!req.url.startsWith("/ctrlflow/") && !req.url.includes('.')) {
      req.url = "/"
    }
    next()
  })

  router.use(express.static(ctrlflowDash.distDir()))

  router.use(express.json())

  router.get('/ctrlflow/meta', (req, res) => {
    let result = {
      eventDefs: app.getEvents(),
      actionDefs: app.getActions()
    }
    res.json(result)
  })

  router.get('/ctrlflow/workflows', async (req, res) => {
    let result = await app.getAllWorkflows()
    res.json(result)
  })

  router.get('/ctrlflow/workflows/:workflowId', async (req, res) => {
    let result = await app.getWorkflow(req.params.workflowId)
    res.json(result)
  })

  router.post('/ctrlflow/workflows', async (req, res) => {
    let result = await app.createWorkflow(req.body)
    res.json(result)
  })

  router.put('/ctrlflow/workflows/:workflowId', async (req, res) => {
    let result = await app.updateWorkflow(req.params.workflowId, req.body)
    res.json(result)
  })

  router.delete('/ctrlflow/workflows/:workflowId', async (req, res) => {
    await app.deleteWorkflow(req.params.workflowId)
    res.end()
  })

  router.post('/ctrlflow/emit-event', async (req, res) => {
    let { type, inputs } = req.body
    await app.emitEvent(type, inputs)
    res.end()
  })

  return router
}
