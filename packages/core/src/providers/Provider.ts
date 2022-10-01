import Workflow from "../api/interfaces/Workflow"
import EventTriggeredMessage from "../worker/interfaces/EventTriggeredMessage"
import MessageHandlers from "../worker/interfaces/MessageHandlers"
import StepScheduledMessage from "../worker/interfaces/StepScheduledMessage"
import ValueMap from "../api/interfaces/ValueMap"
import Event from "../api/interfaces/Event"
import WorkflowRun from "../api/interfaces/WorkflowRun"

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

  saveWorkflowRun(workflowRun: WorkflowRun): Promise<void>
  getWorkflowRuns(): Promise<WorkflowRun[]>

  setWorkflowRunStepResult(workflowRunId: string, stepId: string, result: ValueMap): Promise<void>
  getWorkflowRunStepResult(workflowRunId: string, stepId: string): Promise<ValueMap>

  addFinishedForkPath(workflowRunId: string, forkId: string, pathId: string): Promise<void>
  getFinishedForkPaths(workflowRunId: string, forkId: string): Promise<string[]>
}
