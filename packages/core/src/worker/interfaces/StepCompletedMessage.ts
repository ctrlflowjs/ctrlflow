import StepScheduledMessage from "./StepScheduledMessage";

export default interface StepCompletedMessage extends StepScheduledMessage {
  result: unknown
}
