import Workflow from "../api/interfaces/Workflow"
import EventTriggeredMessage from "../worker/interfaces/EventTriggeredMessage"
import MessageHandlers from "../worker/interfaces/MessageHandlers"
import StepScheduledMessage from "../worker/interfaces/StepScheduledMessage"
import ValueMap from "../api/interfaces/ValueMap"
import Event from "../api/interfaces/Event"

export default interface Provider {
  scheduleEventHandler(message: EventTriggeredMessage): Promise<void>
  scheduleStepHandler(message: StepScheduledMessage): Promise<void>
  startListening(handlers: MessageHandlers): Promise<void>
  stopListening(): Promise<void>

  getAllWorkflows(): Promise<Workflow[]>
  getWorkflow(id: string): Promise<Workflow|null>
  saveWorkflow(workflow: Workflow): Promise<void>
  deleteWorkflow(id: string): Promise<void>

  getAllEvents(): Promise<Event[]>
  saveEvent(event: Event): Promise<void>

  subscribeWorkflowToEvent(workflowId: string, eventType: string): Promise<void>
  getWorkflowsSubscribedToEvent(eventType: string): Promise<string[]>

  createWorkflowRun(workflowId: string, workflowRunId: string): Promise<void>
  getWorkflowRuns(): Promise<{ workflowId: string, workflowRunId: string }[]>

  setWorkflowRunStepResult(workflowRunId: string, stepId: string, result: ValueMap): Promise<void>
  getWorkflowRunStepResult(workflowRunId: string, stepId: string): Promise<ValueMap>

  addFinishedForkPath(workflowRunId: string, forkId: string, pathId: string): Promise<void>
  getFinishedForkPaths(workflowRunId: string, forkId: string): Promise<string[]>
}
