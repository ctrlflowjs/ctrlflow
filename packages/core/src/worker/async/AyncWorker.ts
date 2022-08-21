import Provider from "../../providers/Provider";
import Registry from "../../registry/Registry";
import ActionStepProvider from "./steps/ActionStepProvider";
import ForkStepProvider from "./steps/ForkStepProvider";
import EventTriggeredMessage from "../interfaces/EventTriggeredMessage";
import StepProvider from "../interfaces/StepProvider";
import StepScheduledMessage from "../interfaces/StepScheduledMessage";
import PathStepProvider from "./steps/PathStepProvider";
import WorkflowStepProvider from "./steps/WorkflowStepProvider";
import Step from "../../api/interfaces/Step";
import ExpressionEvaluator from "../../expressions/AsyncExpressionEvaluator";
import Workflow from "../../api/interfaces/Workflow";

export default class AsyncWorker {
  private readonly stepProviders: StepProviders

  constructor(
    private readonly provider: Provider,
    registry: Registry
  ) {

    this.stepProviders = {
      path: new PathStepProvider(this),
      fork: new ForkStepProvider(this),
      action: new ActionStepProvider(this, registry, new ExpressionEvaluator(provider)),
      workflow: new WorkflowStepProvider(this)
    }
  }

  async start(): Promise<void> {
    await this.provider.startListening({
      handleEventTriggered: this.handleEventTriggered.bind(this),
      handleStepScheduled: this.handleStepScheduled.bind(this)
    })
  }

  async stop(): Promise<void> {
    await this.provider.stopListening()
  }

  async handleEventTriggered(message: EventTriggeredMessage): Promise<void> {
    let workflowIds = await this.provider.getWorkflowsSubscribedToEvent(message.event.type)
    for (const workflowId of workflowIds) {
      this.provider.emitScheduleStep({
        workflowId,
        workflowRunId: "",
        step: {
          kind: "workflow",
          id: workflowId
        },
        status: "started"
      })
    }
  }

  async handleStepScheduled(message: StepScheduledMessage): Promise<void> {
    const stepProvider: StepProvider = this.stepProviders[message.step.kind]
    if (message.status === "started") {
      await stepProvider.startStep(message)
    } else {
      await stepProvider.childStepCompleted(message)
    }
  }

  async getWorkflow(workflowId: string): Promise<Workflow> {
    const workflow = await this.provider.getWorkflow(workflowId)
    return workflow!
  }

  async getStep<T extends Step>(step: Step): Promise<T> {
    return {} as T
  }

  async getParentStep<T extends Step>(step: Step): Promise<T> {
    return {} as T
  }

  async emitScheduleStep(message: StepScheduledMessage): Promise<void> {
    return this.provider.emitScheduleStep(message)
  }

  async addFinishedForkPath(workflowRunId: string, forkId: string, pathId: string): Promise<void> {
    await this.provider.addFinishedForkPath(workflowRunId, forkId, pathId)
  }

  async getFinishedForkPaths(workflowRunId: string, forkId: string): Promise<string[]> {
    return await this.provider.getFinishedForkPaths(workflowRunId, forkId)
  }
}


interface StepProviders {
  action: ActionStepProvider
  path: PathStepProvider
  fork: ForkStepProvider
  workflow: WorkflowStepProvider
}
