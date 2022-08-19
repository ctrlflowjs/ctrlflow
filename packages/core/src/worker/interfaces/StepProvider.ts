import StepCompletedMessage from "./StepCompletedMessage"
import StepScheduledMessage from "./StepScheduledMessage"

export default interface StepProvider {
  startStep(message: StepScheduledMessage): Promise<void>
  childStepCompleted(message: StepCompletedMessage): Promise<void>
}
