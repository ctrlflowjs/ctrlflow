import Workflow from "../api/interfaces/Workflow"
import EventTriggeredMessage from "../worker/interfaces/EventTriggeredMessage"
import MessageHandlers from "../worker/interfaces/MessageHandlers"
import StepCompletedMessage from "../worker/interfaces/StepCompletedMessage"
import StepScheduledMessage from "../worker/interfaces/StepScheduledMessage"

export default interface Provider {
  emitEventTriggered(message: EventTriggeredMessage): Promise<void>
  emitScheduleStep(message: StepScheduledMessage): Promise<void>
  emitStepCompleted(message: StepCompletedMessage): Promise<void>
  startListening(handlers: MessageHandlers): Promise<void>
  stopListening(): Promise<void>

  getAllWorkflows(): Promise<Workflow[]>
  getWorkflow(id: string): Promise<Workflow|null>
  saveWorkflow(workflow: Workflow): Promise<void>
  deleteWorkflow(id: string): Promise<void>

  subscribeWorkflowToEvent(workflowId: string, eventId: string): Promise<void>
  getWorkflowsSubscribedToEvent(eventId: string): Promise<string[]>
}
