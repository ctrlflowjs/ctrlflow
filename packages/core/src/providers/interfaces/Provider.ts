import EventTriggeredMessage from "./EventTriggeredMessage"
import MessageHandlers from "./MessageHandlers"
import StepCompletedMessage from "./StepCompletedMessage"
import StepScheduledMessage from "./StepScheduledMessage"

export default interface Provider {
  emitEventTriggered(message: EventTriggeredMessage): Promise<void>
  emitScheduleStep(message: StepScheduledMessage): Promise<void>
  emitStepCompleted(message: StepCompletedMessage): Promise<void>
  startListening(handlers: MessageHandlers): Promise<void>
  stopListening(handlers: MessageHandlers): Promise<void>
}
