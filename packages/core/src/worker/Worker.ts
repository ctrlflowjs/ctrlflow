import Workflow from "../api/interfaces/Workflow";
import Provider from "../providers/Provider";
import StepCompletedMessage from "./interfaces/StepCompletedMessage";
import StepProvider from "./interfaces/StepProvider";
import StepScheduledMessage from "./interfaces/StepScheduledMessage";

export default class Worker {
  stepProviders: StepProviders

  constructor(readonly provider: Provider) {
    this.stepProviders = {
      path: new PathProvider(this),
      fork: new ForkProvider(this),
      action: new ActionProvider(this),
      workflow: new WorkflowProvider(this)
    }
  }

  async start(): Promise<void> {
    await this.provider.startListening({
      handleEventTriggered: this.handleEventTriggered.bind(this),
      handleStepScheduled: this.handleStepScheduled.bind(this),
      handleStepCompleted: this.handleStepCompleted.bind(this)
    })
  }

  async handleEventTriggered(): Promise<void> {
    // should find subscribed workflows
    // should create ids for the instantiated workflows
    // should store the trigger event details, including the workflows created
    const workflows: Workflow[] = []
    for (const workflow of workflows) {
      this.stepProviders.workflow.schedule()
    }
  }

  async handleStepScheduled(message: StepScheduledMessage): Promise<void> {
    this.stepProviders[message.stepKind].execute(message)
  }

  async handleStepCompleted(message: StepCompletedMessage): Promise<void> {
    this.stepProviders[message.parentStep.kind].childCompleted(message)
  }
}

class WorkflowProvider implements StepProvider {
  constructor(private readonly worker: Worker) {}

  async schedule(): Promise<void> {

  }

  async execute(message: StepScheduledMessage): Promise<void> {
    // TODO: if trigger has conditions, evaluate them and skip if needed
    // create the workflow in progress record
    // populate initial state with trigger details
    // TODO: if any variables to extract from the trigger, do so
    // find the root path, and schedule it
    const rootPath = {}
    // this.provider.emitScheduleStep()
  }

  async childCompleted(message: StepCompletedMessage): Promise<void> {

  }
}

class ActionProvider implements StepProvider {
  constructor(private readonly worker: Worker) {}

  async schedule(): Promise<void> {

  }

  async execute(message: StepScheduledMessage): Promise<void> {
    // identify action to be run
    // evaluate inputs
    // invoke the action with them
    // receive the output and pass it to notify step completed
    const typeDef = {}
    // const result = typeDef.run()
    // this.worker.stepProviders.action.emitStepCompleted()
  }

  async childCompleted(message: StepCompletedMessage): Promise<void> {

  }
}

class PathProvider implements StepProvider {
  constructor(private readonly worker: Worker) {}

  async schedule(): Promise<void> {

  }

  async execute(message: StepScheduledMessage): Promise<void> {
    // TODO: how do variables fit in? anything to initialize here?
    // update document state?
    // most importantly, find first step and schedule it
    const firstStep = {}
    // this.worker.provider.emitScheduleStep()
  }

  async childCompleted(message: StepCompletedMessage): Promise<void> {
    // identify next step, schedule it
    // if last, emit stepCompleted

  }
}

class ForkProvider implements StepProvider {
  constructor(private readonly worker: Worker) {}

  async schedule(): Promise<void> {

  }

  async execute(message: StepScheduledMessage): Promise<void> {
    // get list of paths
    // identify path selection type, single-path or multi-path
    // if conditions provided, evaluate them
    // select path(s) and schedule them
    const paths: any[] = []
    // TODO evaluate conditions
    for (const path of paths) {
      // this.worker.provider.emitScheduleStep()
    }
  }

  async childCompleted(message: StepCompletedMessage): Promise<void> {
    // emit stepCompleted
    // any state to manage?

  }
}

interface StepProviders {
  action: ActionProvider
  path: PathProvider
  fork: ForkProvider
  workflow: WorkflowProvider
}
