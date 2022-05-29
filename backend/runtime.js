import { Queue, Worker } from 'bullmq';
import { randomUUID } from 'crypto';

const queue = new Queue('lowrider');

const actionStore = {};
const jobStateStore = {};
const dependencyMap = {};
const eventSubscriptions = {};

const worker = new Worker('lowrider', async job => {
  //////////////////////////////////////////////////////////////////////////////

  if (job.name === 'HandleEvent') {
    let subscribedWorkflowIds = eventSubscriptions[job.data.eventName]
    let eventId = randomUUID()
    queue.addBulk(subscribedWorkflowIds.map(workflowId => ({
      name: 'StartWorkflow',
      data: {
        workflowId,
        eventId,
        eventInputs: job.data.eventInputs
      }
    })))
  }

  //////////////////////////////////////////////////////////////////////////////

  if (job.name === 'StartWorkflow') {
    // determine initial actions to run
  }

  //////////////////////////////////////////////////////////////////////////////

  if (job.name === 'RunAction') {
    let actionRunId = randomUUID()
    let action = actionStore[job.data.actionName]
    let outputs = action.execute(job.data.inputs)
    jobStateStore[job.data.workflowRunId].actionResults[actionRunId] = {
      actionName: job.data.actionName,
      outputs
    }
    queue.add('ScheduleNextAction', {
      actionRunId,
      workflowRunId: job.data.workflowRunId
    })
    return
  }

  //////////////////////////////////////////////////////////////////////////////

  if (job.name === 'ScheduleNextAction') {
    const { workflowRunId, actionRunId } = job.data
    const actionResult = jobStateStore[workflowRunId].actionResults[actionRunId]
    let dependentActions = dependencyMap // hand waving
    // if dependent actions ready to run
    // collect inputs
    // schedule dependent actions
  }
});

lowrider = {
  emitEvent(name, inputs, meta) {
    queue.add('HandleEvent', {
      eventName: name,
      eventInputs: inputs
    })
  }
}
