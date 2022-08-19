import EventTriggeredMessage from "../worker/interfaces/EventTriggeredMessage";
import MessageHandlers from "../worker/interfaces/MessageHandlers";
import Provider from "./Provider"
import StepCompletedMessage from "../worker/interfaces/StepCompletedMessage";
import StepScheduledMessage from "../worker/interfaces/StepScheduledMessage";
import Workflow from "../api/interfaces/Workflow";
import ValueMap from "../api/interfaces/ValueMap";

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

  async subscribeWorkflowToEvent(workflowId: string, eventType: string): Promise<void> {
    const subs = (this.eventSubscriptions[eventType] || []).concat(workflowId)
    this.eventSubscriptions[eventType] = subs.filter((x, i) => i === subs.indexOf(x))
  }

  async getWorkflowsSubscribedToEvent(eventType: string): Promise<string[]> {
    return this.eventSubscriptions[eventType] || []
  }

  async createWorkflowRun(workflowId: string, workflowRunId: string): Promise<void> {
    this.workflowRuns[`${workflowId}|${workflowRunId}`] = {
      workflowId,
      workflowRunId
    }
  }

  async getWorkflowRuns(): Promise<{ workflowId: string, workflowRunId: string }[]> {
    return Object.values(this.workflowRuns)
  }

  async setWorkflowRunStepResult(workflowRunId: string, stepId: string, result: ValueMap): Promise<void> {
    this.workflowRunStepResults[`${workflowRunId}:${stepId}`] = result
  }

  async getWorkflowRunStepResult(workflowRunId: string, stepId: string): Promise<ValueMap> {
    return this.workflowRunStepResults[`${workflowRunId}:${stepId}`]
  }

  workflows: { [id: string]: Workflow } = {}
  eventSubscriptions: { [eventType: string]: string[] } = {}
  workflowRuns: { [id: string]: { workflowId: string, workflowRunId: string } } = {}
  workflowRunStepResults: { [id: string]: ValueMap } = {}
}
