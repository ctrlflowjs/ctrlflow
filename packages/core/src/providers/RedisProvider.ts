import { Processor, Queue, Worker } from "bullmq";
import Redis from "ioredis";
import EventTriggeredMessage from "./interfaces/EventTriggeredMessage";
import MessageHandlers from "./interfaces/MessageHandlers";
import Provider from "./interfaces/Provider"
import StepCompletedMessage from "./interfaces/StepCompletedMessage";
import StepScheduledMessage from "./interfaces/StepScheduledMessage";

const EVENT_TRIGGERED_MESSAGE = "EventTriggered"
const STEP_COMPLETED_MESSAGE = "StepCompleted"
const STEP_SCHEDULED_MESSAGE = "StepScheduled"

export class RedisProvider implements Provider {
  readonly redis: Redis
  readonly queue: Queue
  readonly worker: Worker
  private handlers: MessageHandlers

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

  async emitEventTriggered(message: EventTriggeredMessage): Promise<void> {
    await this.queue.add(EVENT_TRIGGERED_MESSAGE, message)
  }

  async emitScheduleStep(message: StepScheduledMessage): Promise<void> {
    await this.queue.add(STEP_SCHEDULED_MESSAGE, message)
  }

  async emitStepCompleted(message: StepCompletedMessage): Promise<void> {
    await this.queue.add(STEP_COMPLETED_MESSAGE, message)
  }

  private async workerProcessor({ name, data }) {
    if (name === EVENT_TRIGGERED_MESSAGE) {
      await this.handlers.handleEventTriggered(data as EventTriggeredMessage)
    }

    if (name === STEP_SCHEDULED_MESSAGE) {
      await this.handlers.handleStepScheduled()
    }

    if (name === STEP_COMPLETED_MESSAGE) {
      await this.handlers.handleStepCompleted()
    }
  }
}
