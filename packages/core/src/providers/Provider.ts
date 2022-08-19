import Workflow from "../api/interfaces/Workflow"
import { ActionCompletedMessage, ActionScheduledMessage } from "../worker/steps/ActionStepProvider"
import EventTriggeredMessage from "../worker/interfaces/EventTriggeredMessage"
import MessageHandlers from "../worker/interfaces/MessageHandlers"
import StepCompletedMessage from "../worker/interfaces/StepCompletedMessage"
import StepScheduledMessage from "../worker/interfaces/StepScheduledMessage"
import ValueMap from "../api/interfaces/ValueMap"
import { WorkflowCompletedMessage, WorkflowScheduledMessage } from "../worker/steps/WorkflowStepProvider"
import { ForkCompletedMessage, ForkScheduledMessage } from "../worker/steps/ForkStepProvider"
import { PathCompletedMessage, PathScheduledMessage } from "../worker/steps/PathStepProvider"

type AnyStepScheduledMessage = StepScheduledMessage&(
  WorkflowScheduledMessage|
  ActionScheduledMessage|
  PathScheduledMessage|
  ForkScheduledMessage
)

type AnyStepCompletedMessage = StepCompletedMessage&(
  WorkflowCompletedMessage|
  ActionCompletedMessage|
  PathCompletedMessage|
  ForkCompletedMessage
)

export default interface Provider {
  emitEventTriggered(message: EventTriggeredMessage): Promise<void>
  emitScheduleStep(message: AnyStepScheduledMessage): Promise<void>
  emitStepCompleted(message: AnyStepCompletedMessage): Promise<void>
  startListening(handlers: MessageHandlers): Promise<void>
  stopListening(): Promise<void>

  getAllWorkflows(): Promise<Workflow[]>
  getWorkflow(id: string): Promise<Workflow|null>
  saveWorkflow(workflow: Workflow): Promise<void>
  deleteWorkflow(id: string): Promise<void>

  subscribeWorkflowToEvent(workflowId: string, eventType: string): Promise<void>
  getWorkflowsSubscribedToEvent(eventType: string): Promise<string[]>

  createWorkflowRun(workflowId: string, workflowRunId: string): Promise<void>
  getWorkflowRuns(): Promise<{ workflowId: string, workflowRunId: string }[]>

  setWorkflowRunStepResult(workflowRunId: string, stepId: string, result: ValueMap): Promise<void>
  getWorkflowRunStepResult(workflowRunId: string, stepId: string): Promise<ValueMap>
}
