import Action from "../../../api/interfaces/Action"
import ValueMap from "../../../api/interfaces/ValueMap"
import Provider from "../../../providers/Provider"
import Registry from "../../../registry/Registry"
import StepProvider from "../../interfaces/StepProvider"
import ExpressionEvaluator from "../../../expressions/AsyncExpressionEvaluator"
import StepScheduledMessage from "../../interfaces/StepScheduledMessage"
import Worker from "../AyncWorker"

export default class ActionStepProvider implements StepProvider {
  constructor(
    private readonly worker: Worker,
    private readonly registry: Registry,
    private readonly exprEval: ExpressionEvaluator
  ) {}

  async startStep(message: StepScheduledMessage): Promise<void> {
    const action = await this.worker.getStep(message.step) as Action// should be done by parent
    const actionType = this.registry.getAction(action.type)

    const inputExpressions = action.inputs
    const inputValues: ValueMap = {}
    for (const inputName in inputExpressions) {
      const expr = inputExpressions[inputName]
      // TODO: error handling? possible here?
      const value = await this.exprEval.evaluate(expr)
      inputValues[inputName] = value
    }

    let outputs: ValueMap = {}
    try {
      outputs = await actionType.perform(inputValues)
    } catch (error) {
      console.log("ACTION ERROR: ", error)
    }

    this.worker.emitScheduleStep({
      ...message,
      status: "completed"
    })
  }

  async childStepCompleted(message: StepScheduledMessage): Promise<void> {
    // this will never fire, actions don't schedule child steps
  }
}
