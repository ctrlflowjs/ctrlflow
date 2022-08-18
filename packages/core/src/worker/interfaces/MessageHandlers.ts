import EventTriggeredMessage from "./EventTriggeredMessage"
import StepCompletedMessage from "./StepCompletedMessage"
import StepScheduledMessage from "./StepScheduledMessage"

export default interface MessageHandlers {
  handleEventTriggered(message: EventTriggeredMessage): Promise<void>
  handleStepScheduled(message: StepScheduledMessage): Promise<void>
  handleStepCompleted(message: StepCompletedMessage): Promise<void>
}
