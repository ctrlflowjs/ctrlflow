import { Queue, Worker } from "bullmq";
import Redis from "ioredis";
import EventTriggeredMessage from "../worker/interfaces/EventTriggeredMessage";
import MessageHandlers from "../worker/interfaces/MessageHandlers";
import Provider from "./Provider"
import StepScheduledMessage from "../worker/interfaces/StepScheduledMessage";
import Workflow from "../api/interfaces/Workflow";
import ValueMap from "../api/interfaces/ValueMap";
import Event from "../api/interfaces/Event";

const EVENT_TRIGGERED_MESSAGE = "EventTriggered"
const STEP_SCHEDULED_MESSAGE = "StepScheduled"

const DATA_VERSION = "v0"
const DATA_PREFIX = `${DATA_VERSION}:ctrflow`
const WORKFLOW_STORE = `${DATA_PREFIX}:workflows`
const WORKFLOW_RUN_STORE = `${DATA_PREFIX}:workflow-runs`
const EVENT_SUB_STORE_PREFIX = `${DATA_PREFIX}:event-subscriptions`
const EVENT_STORE = `${DATA_PREFIX}:events`

export class RedisProvider implements Provider {
  readonly redis: Redis
  readonly queue: Queue
  readonly worker: Worker
  private handlers: MessageHandlers|null = null

  constructor() {
    this.redis = new Redis() // TODO accept options
    const connectionOptions = {
      connection: {
        redisOptions: this.redis.options
      }
    }
    this.queue = new Queue(
      'ctrlflow',
      connectionOptions
    )
    this.worker =  new Worker(
      'ctrlflow',
      this.workerProcessor.bind(this),
      {
        autorun: false,
        ...connectionOptions
      }
    )
  }

  async startListening(handlers: MessageHandlers): Promise<void> {
    this.handlers = handlers
    await this.worker.run()
  }

  async stopListening(): Promise<void> {
    await this.worker.close()
    this.handlers = null
  }

  async scheduleEventHandler(message: EventTriggeredMessage): Promise<void> {
    await this.queue.add(EVENT_TRIGGERED_MESSAGE, message)
  }

  async scheduleStepHandler(message: StepScheduledMessage): Promise<void> {
    await this.queue.add(STEP_SCHEDULED_MESSAGE, message)
  }

  private async workerProcessor({ name, data }: { name: string, data: any }) {
    if (name === EVENT_TRIGGERED_MESSAGE) {
      await this.handlers!.handleEventTriggered(data as EventTriggeredMessage)
    }

    if (name === STEP_SCHEDULED_MESSAGE) {
      await this.handlers!.handleStepScheduled(data as StepScheduledMessage)
    }
  }

  async getAllWorkflows(): Promise<Workflow[]> {
    let hash = await this.redis.hgetall(WORKFLOW_STORE)
    return Object.values(hash).map(x => JSON.parse(x))
  }

  async getWorkflow(id: string): Promise<Workflow | null> {
    return JSON.parse(await this.redis.hget(WORKFLOW_STORE, id) || "null")
  }

  async saveWorkflow(workflow: Workflow): Promise<void> {
    await this.redis.hset(WORKFLOW_STORE, workflow.id, JSON.stringify(workflow))
  }

  async deleteWorkflow(id: string): Promise<void> {
    await this.redis.hdel(WORKFLOW_STORE, id)
  }

  async subscribeWorkflowToEvent(workflowId: string, eventName: string): Promise<void> {
    await this.redis.sadd(`${EVENT_SUB_STORE_PREFIX}:${eventName}`, workflowId)
  }

  // TODO: add unsubscribeWorkflowFromEvent

  async getWorkflowsSubscribedToEvent(eventName: string): Promise<string[]> {
    return await this.redis.smembers(`${EVENT_SUB_STORE_PREFIX}:${eventName}`)
  }

  async getAllEvents(): Promise<Event[]> {
    let hash = await this.redis.hgetall(EVENT_STORE)
    return Object.values(hash).map(x => JSON.parse(x))
  }

  async saveEvent(event: Event): Promise<void> {
    await this.redis.hset(EVENT_STORE, event.id, JSON.stringify(event))
  }

  async createWorkflowRun(workflowId: string, workflowRunId: string): Promise<void> {
    await this.redis.hset(WORKFLOW_RUN_STORE, workflowRunId, JSON.stringify({
      workflowId,
      workflowRunId
    }))
  }

  async getWorkflowRuns(): Promise<{ workflowId: string, workflowRunId: string }[]> {
    const entries = await this.redis.hgetall(WORKFLOW_RUN_STORE)
    return Object.values(entries).map(v => JSON.parse(v))
  }


  // TODO: likely to be removed in short term or refactored
  setWorkflowRunStepResult(workflowRunId: string, stepId: string, result: ValueMap): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getWorkflowRunStepResult(workflowRunId: string, stepId: string): Promise<ValueMap> {
    throw new Error("Method not implemented.");
  }
  addFinishedForkPath(workflowRunId: string, forkId: string, pathId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getFinishedForkPaths(workflowRunId: string, forkId: string): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
}
