const { Queue, Worker } = require('bullmq')
const { randomUUID } = require('crypto')

const _queue = new Queue('lcdk')
const _events = {}
const _actions = {}

const _workflowDefStore = {}
const _jobStateStore = {}
const _eventSubscriptions = {}

module.exports = {
  defineEvent(typeId, def) {
    def.typeId = typeId
    _events[typeId] = def
  },
  defineAction(typeId, def) {
    def.typeId = typeId
    _actions[typeId] = def
  },
  getEvents() {
    return Object.values(_events)
  },
  getActions() {
    return Object.values(_actions)
  },
  getAllWorkflows() {
    return Object.values(_workflowDefStore)
  },
  getWorkflow(id) {
    return _workflowDefStore[id]
  },
  createWorkflow(workflowDef) {
    let id = workflowDef.id = randomUUID()
    _workflowDefStore[id] = workflowDef
    let firstNode = workflowDef.nodes[0]
    let subscriptions = _eventSubscriptions[firstNode.type] || new Set([])
    _eventSubscriptions[firstNode.type] = subscriptions
    subscriptions.add(id)
    return workflowDef
  },
  updateWorkflow(id, workflowDef) {
    workflowDef.id = id
    _workflowDefStore[id] = workflowDef
    return workflowDef
  },
  deleteWorkflow(id) {
    delete _workflowDefStore[id]
  },
  async emitEvent(eventName, eventInputs) {
    let eventId = randomUUID()
    await _queue.add('HandleEvent', {
      eventName,
      eventInputs,
      eventId
    })
  },
  async performAction(actionName, actionInputs) {
    // validate inputs schema, etc
    return await _actions[actionName](actionInputs)
  },
}

const worker = new Worker('lcdk', async ({ name, data }) => {
  jobs = {
    async 'HandleEvent'({ eventName, eventInputs, eventId }) {
      console.log('HandleEvent', { eventName, eventId, eventId })

      let subscribedWorkflowIds = [..._eventSubscriptions[eventName] || []]

      console.log(_eventSubscriptions, eventName, subscribedWorkflowIds)

      await _queue.addBulk(subscribedWorkflowIds.map(workflowId => ({
        name: 'StartWorkflow',
        data: {
          workflowId,
          workflowRunId: randomUUID(),
          eventId,
          eventName,
          eventInputs
        }
      })))
    },

    async 'StartWorkflow'({ workflowId, workflowRunId, eventId, eventName, eventInputs }) {
      console.log('StartWorkflow', { workflowId, workflowRunId, eventId, eventName, eventInputs })

      let workflowDef = _workflowDefStore[workflowId]

      _jobStateStore[workflowRunId] = {
        workflowId,
        nodeResults: {
          trigger: {
            eventId,
            eventName,
            eventInputs,
            nodeId: workflowDef.nodes[0].id
          }
        }
      }

      await _queue.add('ScheduleNextAction', {
        workflowRunId,
        actionRunId: null
      })
    },

    async 'ScheduleNextAction'({ workflowRunId, actionRunId }) {
      console.log('ScheduleNextAction', { workflowRunId, actionRunId })

      console.log(_workflowDefStore)

      let jobState = _jobStateStore[workflowRunId]
      let lastNodeResult = jobState.nodeResults[actionRunId || 'trigger'] // revisit

      let workflowDef = _workflowDefStore[jobState.workflowId]
      let lastNodeIndex = workflowDef.nodes.findIndex(n => n.id === lastNodeResult.nodeId)
      let nextNode = workflowDef.nodes[lastNodeIndex + 1]

      await _queue.add('RunAction', {
        workflowRunId,
        actionRunId: randomUUID(),
        actionName: nextNode.type,
        actionInputs: nextNode.inputs,
        nodeId: nextNode.id
      })
    },

    async 'RunAction'({ actionName, actionInputs, actionRunId, workflowRunId, nodeId }) {
      console.log('RunAction', { actionName, actionInputs, actionRunId, workflowRunId, nodeId })

      let actionDef = _actions[actionName]

      let outputs = await actionDef.perform(actionInputs)
      console.log("Action Result", actionName, actionInputs, outputs)

      _jobStateStore[workflowRunId].nodeResults[actionRunId] = {
        nodeId,
        actionName,
        outputs
      }

      await _queue.add('ScheduleNextAction', {
        workflowRunId,
        actionRunId
      })
    },
  }

  jobs[name](data)
})
