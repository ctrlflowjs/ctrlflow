import EventTriggeredMessage from "./EventTriggeredMessage"

export default interface MessageHandlers {
  handleEventTriggered(message: EventTriggeredMessage): Promise<void>
  handleStepScheduled(): Promise<void>
  handleStepCompleted(): Promise<void>
}
