import Fork from "../../api/interfaces/Fork"
import Path from "../../api/interfaces/Path"
import Step from "../../api/interfaces/Step"
import Action from "../../api/interfaces/Action"
import Provider from "../../providers/Provider"
import StepCompletedMessage from "../interfaces/StepCompletedMessage"
import StepProvider from "../interfaces/StepProvider"
import StepScheduledMessage from "../interfaces/StepScheduledMessage"

export default class PathStepProvider implements StepProvider {
  constructor(private readonly provider: Provider) {}

  async startStep(message: PathScheduledMessage): Promise<void> {
    // just scheduling
    const firstStep = message.params.path.steps[0]

  }

  async childStepCompleted(message: PathCompletedMessage): Promise<void> {
    // identify next step, schedule it
    // if last, emit stepCompleted

  }

  private async scheduleStep(step: Step) {
    if (step.kind === "action") {
      return await this.provider.emitScheduleStep({
        stepKind: "action",
        parentStep: {
          kind: "path",
          id: ""
        },
        params: {
          action: {} as Action
        }
      })
    }

    if (step.kind === "fork") {
      return await this.provider.emitScheduleStep({
        stepKind: "fork",
        parentStep: {
          kind: "path",
          id: ""
        },
        params: {
          fork: {} as Fork
        }
      })
    }

    if (step.kind === "path") {
      return await this.provider.emitScheduleStep({
        stepKind: "path",
        parentStep: {
          kind: "path",
          id: ""
        },
        params: {
          workflowId: "",
          path: {} as Path
        }
      })
    }
  }
}

export interface PathScheduledMessage {
  stepKind: "path"
  parentStep: {
    kind: "path"|"fork"|"workflow"
    id: string
  }
  params: {
    workflowId: string
    path: Path
  }
}

export interface PathCompletedMessage extends PathScheduledMessage {
  result: {

  }
}
