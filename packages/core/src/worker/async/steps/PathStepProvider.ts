import Path from "../../../api/interfaces/Path"
import StepProvider from "../../interfaces/StepProvider"
import StepScheduledMessage from "../../interfaces/StepScheduledMessage"
import Worker from "../AyncWorker"

export default class PathStepProvider implements StepProvider {
  constructor(private readonly worker: Worker) {}

  async startStep(message: StepScheduledMessage): Promise<void> {
    const path = await this.worker.getStep(message.step) as Path// should be done by parent
    const firstStep = path.steps[0]
    await this.worker.scheduleStepHandler({
      ...message,
      step: {
        kind: firstStep.kind,
        id: firstStep.id
      },
      status: "started"
    })
  }

  async childStepCompleted(message: StepScheduledMessage): Promise<void> {
    const path = await this.worker.getParentStep(message.step) as Path
    const stepIndex = path.steps.findIndex(s => s.id === message.step.id)
    const nextStep = path.steps[stepIndex + 1]

    if (nextStep) {
      await this.worker.scheduleStepHandler({
        ...message,
        step: {
          kind: nextStep.kind,
          id: nextStep.id
        },
        status: "started"
      })
    } else {
      await this.worker.scheduleStepHandler({
        ...message,
        step: {
          kind: "path",
          id: path.id
        },
        status: "completed"
      })
    }
  }
}
