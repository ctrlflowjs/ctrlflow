import StepProvider from "../../interfaces/StepProvider"
import Worker from "../AyncWorker"
import { randomUUID } from "crypto"
import StepScheduledMessage from "../../interfaces/StepScheduledMessage"

export default class WorkflowStepProvider implements StepProvider {
  constructor(private readonly worker: Worker) {}

  async startStep(message: StepScheduledMessage): Promise<void> {
    const workflow = await this.worker.getWorkflow(message.workflowId)
    if (!workflow) {
      throw new Error("TODO")
    }

    // TODO: store info about the trigger for value reference
    // TODO: if trigger has conditions, evaluate them and skip if needed
    const workflowRunId = randomUUID().replace(/-/g, "")
    await this.worker.scheduleStepHandler({
      workflowId: message.workflowId,
      workflowRunId,
      step: {
        kind: "path",
        id: workflow.path.id
      },
      status: "started"
    })
  }

  async childStepCompleted(message: StepScheduledMessage): Promise<void> {
    // cleanup workflow
  }
}
