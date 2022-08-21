import Fork from "../../../api/interfaces/Fork"
import Provider from "../../../providers/Provider"
import StepProvider from "../../interfaces/StepProvider"
import StepScheduledMessage from "../../interfaces/StepScheduledMessage"
import Worker from "../AyncWorker"

export default class ForkStepProvider implements StepProvider {
  constructor(private readonly worker: Worker) {}

  async startStep(message: StepScheduledMessage): Promise<void> {
    const fork = await this.worker.getStep(message.step) as Fork// should be done by parent
    // TODO evaluate conditions
    for (const path of fork.paths) {
      await this.worker.emitScheduleStep({
        workflowId: message.workflowId,
        workflowRunId: message.workflowRunId,
        step: {
          kind: "path",
          id: path.id
        },
        status: "started"
      })
    }
  }

  async childStepCompleted(message: StepScheduledMessage): Promise<void> {
    // responsibility: wait for all paths to finish, then complete
    // emit stepCompleted
    // any state to manage?
    const fork = await this.worker.getParentStep(message.step) as Fork

    await this.worker.addFinishedForkPath(message.workflowRunId, fork.id, message.step.id)
    const finishedPaths = await this.worker.getFinishedForkPaths(message.workflowRunId, fork.id)

    // TODO if all done, notify completed
    if (!fork.paths.every(p => finishedPaths.includes(p.id))) {
      return
    }

    await this.worker.emitScheduleStep({
      workflowId: message.workflowId,
      workflowRunId: message.workflowRunId,
      step: {
        kind: "fork",
        id: fork.id
      },
      status: "completed"
    })
  }
}
