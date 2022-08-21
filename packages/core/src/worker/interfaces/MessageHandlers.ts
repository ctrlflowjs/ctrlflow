import EventTriggeredMessage from "./EventTriggeredMessage"
import StepScheduledMessage from "./StepScheduledMessage"

export default interface MessageHandlers {
  handleEventTriggered(message: EventTriggeredMessage): Promise<void>
  handleStepScheduled(message: StepScheduledMessage): Promise<void>
}
