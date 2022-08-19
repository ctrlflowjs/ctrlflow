import Fork from "../../api/interfaces/Fork"
import Provider from "../../providers/Provider"
import StepCompletedMessage from "../interfaces/StepCompletedMessage"
import StepProvider from "../interfaces/StepProvider"

export default class ForkStepProvider implements StepProvider {
  constructor(private readonly provider: Provider) {}

  async startStep(message: ForkScheduledMessage): Promise<void> {
    const paths = message.params.fork.paths
    // TODO evaluate conditions
    for (const path of paths) {
      // this.provider.emitScheduleStep({

      // })
    }
  }

  async childStepCompleted(message: StepCompletedMessage): Promise<void> {
    // responsibility: wait for all paths to finish, then complete
    // emit stepCompleted
    // any state to manage?

  }
}

export interface ForkScheduledMessage {
  stepKind: "fork"
  parentStep: {
    kind: "path"
    id: string
  }
  params: {
    fork: Fork
  }
}

export interface ForkCompletedMessage extends ForkScheduledMessage {
  result: {

  }
}
