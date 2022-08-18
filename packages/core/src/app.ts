// import { Queue, Worker } from 'bullmq'
// import { randomUUID } from 'crypto'
// import Redis from "ioredis"
// import Workflow from './api/interfaces/Workflow';

// export default function({ components }: { components: any }) {
//   const redis = new Redis();
//   const connectionOptions = {
//     connection: {
//       redisOptions: redis.options
//     }
//   };
//   const _queue = new Queue('ctrlflow', connectionOptions)
//   const _events = {}
//   const _actions = {}

//   for (let component of components) {
//     if (component.kind === 'event-type') {
//       _events[component.type] = component
//     }
//     if (component.kind === 'action-type') {
//       _actions[component.type] = component
//     }
//     if (component.kind === 'workflow-type') {
//       console.log("NOT IMPLEMENTED: WORKFLOW TYPE")
//     }
//   }

//   const _workflowDefStore = {
//     async set(workflowId: string, workflowDef: Workflow) {
//       await redis.hset("ctrlflow:workflows", workflowId, JSON.stringify(workflowDef))
//     },
//     async getAll() {
//       let hash = await redis.hgetall("ctrlflow:workflows")
//       return Object.values(hash).map(x => JSON.parse(x))
//     },
//     async get(workflowId: string) {
//       return JSON.parse(await redis.hget("ctrlflow:workflows", workflowId) || "null")
//     },
//     async delete(workflowId: string) {
//       await redis.hdel("ctrlflow:workflows", workflowId)
//     }
//   }
//   const _workflowRunStateStore = {
//     async set(runId, runState) {
//       await redis.hset("ctrlflow:workflow-runs", runId, JSON.stringify(runState))
//     },
//     async get(runId) {
//       return JSON.parse(await redis.hget("ctrlflow:workflow-runs", runId))
//     }
//   }
//   const _eventSubscriptions = {
//     async add(eventName, workflowId) {
//       await redis.sadd(`ctrlflow:event-subs:${eventName}`, workflowId)
//     },
//     async getAll(eventName) {
//       return await redis.smembers(`ctrlflow:event-subs:${eventName}`)
//     }
//   }

//   const worker = new Worker('ctrlflow', async ({ name, data }) => {
//     const jobs = {
//       async 'HandleEvent'({ eventName, eventInputs, eventId }) {
//         // console.log('HandleEvent', { eventName, eventId, eventId })

//         let subscribedWorkflowIds = await _eventSubscriptions.getAll(eventName)

//         await _queue.addBulk(subscribedWorkflowIds.map(workflowId => ({
//           name: 'StartWorkflow',
//           data: {
//             workflowId,
//             workflowRunId: randomUUID(),
//             eventId,
//             eventName,
//             eventInputs
//           }
//         })))
//       },

//       async 'StartWorkflow'({ workflowId, workflowRunId, eventId, eventName, eventInputs }) {
//         // console.log('StartWorkflow', { workflowId, workflowRunId, eventId, eventName, eventInputs })

//         let workflowDef = await _workflowDefStore.get(workflowId)

//         await _workflowRunStateStore.set(workflowRunId, {
//           workflowId,
//           nodeResults: {
//             trigger: {
//               eventId,
//               eventName,
//               eventInputs,
//               nodeId: workflowDef.nodes[0].id
//             }
//           }
//         })

//         await _queue.add('ScheduleNextAction', {
//           workflowRunId,
//           actionRunId: null
//         })
//       },

//       async 'ScheduleNextAction'({ workflowRunId, actionRunId }) {
//         // console.log('ScheduleNextAction', { workflowRunId, actionRunId })

//         let jobState = await _workflowRunStateStore.get(workflowRunId)
//         let lastNodeResult = jobState.nodeResults[actionRunId || 'trigger'] // revisit

//         let workflowDef = await _workflowDefStore.get(jobState.workflowId)
//         let lastNodeIndex = workflowDef.nodes.findIndex(n => n.id === lastNodeResult.nodeId)
//         let nextNode = workflowDef.nodes[lastNodeIndex + 1]

//         if (!nextNode) {
//           console.log(new Date(), "- Workflow finished!")
//           return;
//         }

//         await _queue.add('RunAction', {
//           workflowRunId,
//           actionRunId: randomUUID(),
//           actionName: nextNode.type,
//           actionInputs: nextNode.inputs,
//           nodeId: nextNode.id
//         })
//       },

//       async 'RunAction'({ actionName, actionInputs, actionRunId, workflowRunId, nodeId }) {
//         // console.log('RunAction', { actionName, actionInputs, actionRunId, workflowRunId, nodeId })

//         let actionDef = _actions[actionName]

//         if (!actionDef) {
//           throw `No action found named: '${actionName}'`
//         }

//         let outputs = await actionDef.perform(actionInputs)
//         console.log("Action Result", actionName, actionInputs, outputs)

//         let workflowDef = await _workflowRunStateStore.get(workflowRunId)

//         workflowDef.nodeResults[actionRunId] = {
//           nodeId,
//           actionName,
//           outputs
//         }

//         await _workflowRunStateStore.set(workflowRunId, workflowDef)

//         await _queue.add('ScheduleNextAction', {
//           workflowRunId,
//           actionRunId
//         })
//       },
//     }

//     jobs[name](data)
//   }, {
//     autorun: false,
//     ...connectionOptions
//   })

//   return {
//     async start() {
//       await worker.run()
//     },
//     async stop() {
//       await worker.close()
//     },
//     getEvents() {
//       return Object.values(_events)
//     },
//     getActions() {
//       return Object.values(_actions)
//     },
//     async getAllWorkflows() {
//       return await _workflowDefStore.getAll()
//     },
//     async getWorkflow(id) {
//       return await _workflowDefStore.get(id)
//     },
//     async createWorkflow(workflowDef) {
//       let id = workflowDef.id = randomUUID()
//       await _workflowDefStore.set(id, workflowDef)
//       // let firstNode = workflowDef.nodes[0]
//       // await _eventSubscriptions.add(firstNode.type, id)
//       return workflowDef
//     },
//     async updateWorkflow(id, workflowDef) {
//       workflowDef.id = id
//       await _workflowDefStore.set(id, workflowDef)
//       return workflowDef
//     },
//     async deleteWorkflow(id) {
//       await _workflowDefStore.delete(id)
//     },
//     async emitEvent(eventName, eventInputs) {
//       console.log(new Date(), "- Emit event", eventName)
//       let eventId = randomUUID()
//       await _queue.add('HandleEvent', {
//         eventName,
//         eventInputs,
//         eventId
//       })
//     },
//     async performAction(actionName, actionInputs) {
//       // validate inputs schema, etc
//       return await _actions[actionName](actionInputs)
//     },
//   }
// }
