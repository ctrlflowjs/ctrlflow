import EventTriggeredMessage from "../worker/interfaces/EventTriggeredMessage";
import MessageHandlers from "../worker/interfaces/MessageHandlers";
import Provider from "./Provider"
import StepScheduledMessage from "../worker/interfaces/StepScheduledMessage";
import Workflow from "../api/interfaces/Workflow";
import ValueMap from "../api/interfaces/ValueMap";
import Event from "../api/interfaces/Event";
import WorkflowRun from "../api/interfaces/WorkflowRun";

export class MemoryProvider implements Provider {
  private handlers: MessageHandlers|null = null

  async startListening(handlers: MessageHandlers): Promise<void> {
    this.handlers = handlers
  }

  async stopListening(): Promise<void> {
    this.handlers = null
  }

  async scheduleEventHandler(message: EventTriggeredMessage): Promise<void> {
    if (!this.handlers) {
      throw new Error("handlers is not assigned in MemoryProvider")
    }
    await this.handlers.handleEventTriggered(message)
  }

  async scheduleStepHandler(message: StepScheduledMessage): Promise<void> {
    if (!this.handlers) {
      throw new Error("handlers is not assigned in MemoryProvider")
    }
    await this.handlers.handleStepScheduled(message)
  }

  async getAllWorkflows(): Promise<Workflow[]> {
    return Object.values(this.workflows)
  }

  async getWorkflow(id: string): Promise<Workflow|null> {
    return this.workflows[id] || null
  }

  async saveWorkflow(workflow: Workflow): Promise<void> {
    this.workflows[workflow.id] = workflow
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

  async saveWorkflowRun(workflowRun: WorkflowRun): Promise<void> {
    this.workflowRuns[workflowRun.id] = workflowRun
  }

  async getAllEvents(): Promise<Event[]> {
    return Object.values(this.events)
  }

  async saveEvent(event: Event): Promise<void> {
    this.events[event.id] = event
  }

  async getWorkflowRuns(): Promise<WorkflowRun[]> {
    return Object.values(this.workflowRuns)
  }

  async setWorkflowRunStepResult(workflowRunId: string, stepId: string, result: ValueMap): Promise<void> {
    this.workflowRunStepResults[`${workflowRunId}:${stepId}`] = result
  }

  async getWorkflowRunStepResult(workflowRunId: string, stepId: string): Promise<ValueMap> {
    return this.workflowRunStepResults[`${workflowRunId}:${stepId}`]
  }

  async addFinishedForkPath(workflowRunId: string, forkId: string, pathId: string): Promise<void> {
    const paths = this.workflowRunForkPaths[workflowRunId][forkId]
    if (!paths.includes(pathId)) {
      paths.push(pathId)
    }
    this.workflowRunForkPaths[workflowRunId][forkId] = paths
  }

  async getFinishedForkPaths(workflowRunId: string, forkId: string): Promise<string[]> {
    return this.workflowRunForkPaths[workflowRunId][forkId] || []
  }

  workflows: { [id: string]: Workflow } = {}
  eventSubscriptions: { [eventType: string]: string[] } = {}
  events: { [id: string]: Event } = {}
  workflowRuns: { [id: string]: WorkflowRun } = {}
  workflowRunStepResults: { [id: string]: ValueMap } = {}
  workflowRunForkPaths: { [workflowRunId: string]: { [forkId: string]: string[] } } = {}
}
