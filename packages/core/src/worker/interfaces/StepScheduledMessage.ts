import Step from "../../api/interfaces/Step"

export default interface StepScheduledMessage {
  status: "started"|"completed"
  workflowId: string
  workflowRunId: string
  step: Step
}
