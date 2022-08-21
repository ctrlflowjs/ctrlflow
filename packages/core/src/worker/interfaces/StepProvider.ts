import StepScheduledMessage from "./StepScheduledMessage"

export default interface StepProvider {
  startStep(message: StepScheduledMessage): Promise<void>
  childStepCompleted(message: StepScheduledMessage): Promise<void>
}
