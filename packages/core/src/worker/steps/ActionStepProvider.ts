import Action from "../../api/interfaces/Action"
import ValueMap from "../../api/interfaces/ValueMap"
import Provider from "../../providers/Provider"
import Registry from "../../registry/Registry"
import StepCompletedMessage from "../interfaces/StepCompletedMessage"
import StepProvider from "../interfaces/StepProvider"
import StepScheduledMessage from "../interfaces/StepScheduledMessage"

export default class ActionStepProvider implements StepProvider {
  constructor(
    private readonly provider: Provider,
    private readonly registry: Registry
  ) {}

  async startStep(message: ActionScheduledMessage): Promise<void> {
    // identify action to be run
    // evaluate inputs
    // invoke the action with them
    // receive the output and pass it to notify step completed
    const actionType = this.registry.getAction(message.params.action.type)
    const inputs: ValueMap = {} // TODO evaluate
    let outputs: ValueMap = {}
    try {
      outputs = await actionType.perform(inputs)
    } catch (error) {
      console.log("ACTION ERROR: ", error)
    }

    this.provider.emitStepCompleted({
      ...message,
      result: {

      }
    })
  }

  async childStepCompleted(message: StepCompletedMessage): Promise<void> {
    // this will never fire, actions don't schedule child steps
  }
}

export interface ActionScheduledMessage {
  stepKind: "action"
  parentStep: {
    kind: "path"|"fork"
    id: string
  }
  params: {
    action: Action
  }
}

export interface ActionCompletedMessage extends ActionScheduledMessage {
  result: {

  }
}
