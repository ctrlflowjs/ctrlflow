import Provider from "../providers/Provider";
import Registry from "../registry/Registry";
import ActionStepProvider from "./steps/ActionStepProvider";
import ForkStepProvider from "./steps/ForkStepProvider";
import EventTriggeredMessage from "./interfaces/EventTriggeredMessage";
import StepCompletedMessage from "./interfaces/StepCompletedMessage";
import StepProvider from "./interfaces/StepProvider";
import StepScheduledMessage from "./interfaces/StepScheduledMessage";
import PathStepProvider from "./steps/PathStepProvider";
import WorkflowStepProvider from "./steps/WorkflowStepProvider";

export default class Worker {
  readonly stepProviders: StepProviders

  constructor(
    private readonly provider: Provider,
    private readonly registry: Registry
  ) {
    this.stepProviders = {
      path: new PathStepProvider(provider),
      fork: new ForkStepProvider(provider),
      action: new ActionStepProvider(provider, registry),
      workflow: new WorkflowStepProvider(provider)
    }
  }

  async start(): Promise<void> {
    await this.provider.startListening({
      handleEventTriggered: this.handleEventTriggered.bind(this),
      handleStepScheduled: this.handleStepScheduled.bind(this),
      handleStepCompleted: this.handleStepCompleted.bind(this)
    })
  }

  async stop(): Promise<void> {
    await this.provider.stopListening()
  }

  async handleEventTriggered(message: EventTriggeredMessage): Promise<void> {
    let workflowIds = await this.provider.getWorkflowsSubscribedToEvent(message.event.type)
    // should find subscribed workflows
    // should create ids for the instantiated workflows
    // should store the trigger event details, including the workflows created
    for (const workflowId of workflowIds) {
      this.provider.emitScheduleStep({
        stepKind: "workflow",
        parentStep: {
          kind: "event",
          id: ""
        },
        params: {
          workflowId
        }
      })
    }
  }

  async handleStepScheduled(message: StepScheduledMessage): Promise<void> {
    const stepProvider: StepProvider = this.stepProviders[message.stepKind]
    await stepProvider.startStep(message)
  }

  async handleStepCompleted(message: StepCompletedMessage): Promise<void> {
    const stepProvider: StepProvider = this.stepProviders[message.stepKind]
    await stepProvider.childStepCompleted(message)
  }
}


interface StepProviders {
  action: ActionStepProvider
  path: PathStepProvider
  fork: ForkStepProvider
  workflow: WorkflowStepProvider
}
