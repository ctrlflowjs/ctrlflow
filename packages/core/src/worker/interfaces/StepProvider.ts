import StepCompletedMessage from "./StepCompletedMessage"
import StepScheduledMessage from "./StepScheduledMessage"

export default interface StepProvider {
  schedule(): Promise<void>
  execute(message: StepScheduledMessage): Promise<void>
  childCompleted(message: StepCompletedMessage): Promise<void>
}
