import EventTriggeredMessage from "../worker/interfaces/EventTriggeredMessage";
import MessageHandlers from "../worker/interfaces/MessageHandlers";
import Provider from "./Provider"
import StepCompletedMessage from "../worker/interfaces/StepCompletedMessage";
import StepScheduledMessage from "../worker/interfaces/StepScheduledMessage";
import Workflow from "../api/interfaces/Workflow";

export class MemoryProvider implements Provider {
  private handlers: MessageHandlers|null = null

  async startListening(handlers: MessageHandlers): Promise<void> {
    this.handlers = handlers
  }

  async stopListening(): Promise<void> {
    this.handlers = null
  }

  async emitEventTriggered(message: EventTriggeredMessage): Promise<void> {
    if (!this.handlers) {
      throw new Error("handlers is not assigned in MemoryProvider")
    }
    await this.handlers.handleEventTriggered(message)
  }

  async emitScheduleStep(message: StepScheduledMessage): Promise<void> {
    if (!this.handlers) {
      throw new Error("handlers is not assigned in MemoryProvider")
    }
    await this.handlers.handleStepScheduled(message)
  }

  async emitStepCompleted(message: StepCompletedMessage): Promise<void> {
    if (!this.handlers) {
      throw new Error("handlers is not assigned in MemoryProvider")
    }
    await this.handlers.handleStepCompleted(message)
  }

  async getAllWorkflows(): Promise<Workflow[]> {
    return Object.values(this.workflows)
  }

  async getWorkflow(id: string): Promise<Workflow|null> {
    return this.workflows[id] || null
  }

  async saveWorkflow(workflow: Workflow): Promise<void> {
    this.workflows[workflow.id]
  }

  async deleteWorkflow(id: string): Promise<void> {
    delete this.workflows[id]
  }

  async subscribeWorkflowToEvent(workflowId: string, eventId: string): Promise<void> {
    let subscriptions = (this.eventSubscriptions[eventId] || []).concat(workflowId)
    subscriptions = subscriptions.filter((x, i) => i === subscriptions.indexOf(x))
    this.eventSubscriptions[eventId] = subscriptions
  }

  async getWorkflowsSubscribedToEvent(eventId: string): Promise<string[]> {
    return this.eventSubscriptions[eventId] || []
  }

  workflows: { [id: string]: Workflow } = {}
  eventSubscriptions: { [eventId: string]: string[] } = {}
}
