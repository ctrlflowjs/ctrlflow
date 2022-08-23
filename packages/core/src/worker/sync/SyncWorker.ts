import Workflow from "../../api/interfaces/Workflow"
import Provider from "../../providers/Provider"
import EventTriggeredMessage from "../interfaces/EventTriggeredMessage"
import Event from "../../api/interfaces/Event"
import Path from "../../api/interfaces/Path"
import Action from "../../api/interfaces/Action"
import Fork from "../../api/interfaces/Fork"
import Registry from "../../registry/Registry"
import ValueMap from "../../api/interfaces/ValueMap"
import Expression from "../../api/interfaces/Expression"

export default class SyncWorker {
  private readonly exprEval: ExpressionEvaluator

  constructor(private readonly provider: Provider, private readonly registry: Registry) {
    this.exprEval = new ExpressionEvaluator()
  }

  async start(): Promise<void> {
    await this.provider.startListening({
      handleEventTriggered: this.errorSafeHandler.bind(this, this.handleEventTriggered.bind(this)),
      handleStepScheduled: () => {
        throw new Error("NOT IMPLEMENTED: SyncWorker.handleStepScheduled")
      }
    })
  }

  async stop(): Promise<void> {
    await this.provider.stopListening()
  }

  async handleEventTriggered(message: EventTriggeredMessage) {
    let workflowIds = await this.provider.getWorkflowsSubscribedToEvent(message.event.type)
    console.log("workflowIds", workflowIds)
    let workflowResults = workflowIds.map(async (workflowId: string) => {
      let workflow = await this.provider.getWorkflow(workflowId)
      await this.executeWorkflow(workflow!, message.event)
    })

    await Promise.all(workflowResults)
  }

  async errorSafeHandler(handler: (...args: any[]) => Promise<any>, ...args: any[]) {
    try {
      return await handler(...args)
    } catch (err) {
      console.error("Error occurred in event handler: ", err)
    }
  }

  async executeWorkflow(workflow: Workflow, event: Event) {
    const state: WorkflowRunState = {
      trigger: event,
      actionResults: {}
    }

    await this.executePath(workflow.path, state)
  }

  async executePath(path: Path, state: WorkflowRunState) {
    for (const step of path.steps) {
      if (step.kind === "action") {
        await this.executeAction(step as Action, state)
      } else if (step.kind === "fork") {
        await this.executeFork(step as Fork, state)
      } else if (step.kind === "path") {
        await this.executePath(step as Path, state)
      }
    }
  }

  async executeAction(action: Action, state: WorkflowRunState) {
    const actionType = this.registry.getAction(action.type)

    if (!actionType) {
      throw new Error("NOT IMPLEMENTED: action type not found: " + action.type)
    }

    const inputExpressions = action.inputs
    const inputValues: ValueMap = {}
    for (const inputName in inputExpressions) {
      const expr = inputExpressions[inputName]
      // TODO: error handling? errors possible here?
      const value = await this.exprEval.evaluate(expr, state)
      inputValues[inputName] = value
    }

    let outputs: ValueMap = {}
    try {
      outputs = await actionType.perform(inputValues)
    } catch (error) {
      console.log("ACTION ERROR: ", error)
    }

    state.actionResults[action.id] = outputs
  }

  async executeFork(fork: Fork, state: WorkflowRunState) {
    const pathResults: Promise<void>[] = []
    for (const path of fork.paths) {
      pathResults.push(this.executePath(path, state))
    }
    await Promise.all(pathResults)
  }
}

interface WorkflowRunState {
  trigger: Event
  actionResults: { [actionId: string]: ValueMap } // TODO: support errors
  // TODO: path variables
}

class ExpressionEvaluator {
  evaluate(expression: Expression, state: WorkflowRunState): any {
    const expressionDef = this.expressions[expression.type]
    if (!expressionDef) {
      throw new Error("NOT IMPLEMENTED: Unrecognized expression type: " + expression.type)
    }

    return expressionDef(expression, state)
  }

  expressions: StringMap<(exp: Expression, state: WorkflowRunState) => any> = {
    "text": (exp: any, state) => {
      return exp.inputs.value
    },
    "number": (exp: any, state) => {
      return exp.inputs.value
    },
    "action-result": (exp: any, state) => {
      // TODO: support loops
      return state.actionResults[exp.inputs.actionId][exp.inputs.outputName]
    },
    // TODO rename
    "decision": (exp: any, state) => {
      const conditionValue = this.evaluate(exp.inputs.condition, state)
      const resultExpr = conditionValue ? exp.inputs.trueValue : exp.inputs.falseValue
      const resultValue = this.evaluate(resultExpr, state)

      return resultValue
    },
    // TODO rename
    "condition": (exp: any, state) => {
      const conditionEval = {
        // TODO change behavior based on value type
        "==": (firstValue: any, secondValue: any) => {
          return firstValue === secondValue
        },
        ">": (firstValue: any, secondValue: any) => {
          return firstValue > secondValue
        },
        "<": (firstValue: any, secondValue: any) => {
          return firstValue < secondValue
        },
      }[exp.settings?.conditionType as string]

      if (!conditionEval) {
        throw new Error("NOT IMPLEMENTED: condition expression unrecognized type: " + exp?.settings?.conditionType)
      }

      const firstValue = this.evaluate(exp.inputs.firstValue, state)
      const secondValue = this.evaluate(exp.inputs.secondValue, state)

      return conditionEval(firstValue, secondValue)
    },
    "and-or": (exp: any, state) => {
      const conditionEval = {
        // TODO change behavior based on value type
        "and": (firstValue: any, secondValue: any) => {
          return firstValue && secondValue
        },
        "or": (firstValue: any, secondValue: any) => {
          return firstValue || secondValue
        },
      }[exp.settings.conditionGroupType as string]

      if (!conditionEval) {
        throw new Error("NOT IMPLEMENTED: and-or expression unrecognized type: " + exp?.settings?.conditionGroupType)
      }

      const firstValue = this.evaluate(exp.inputs.firstCondition, state)
      const secondValue = this.evaluate(exp.inputs.secondCondition, state)

      return conditionEval(firstValue, secondValue)
    },
  }
}

interface StringMap<T> {
  [key: string]: T
}
