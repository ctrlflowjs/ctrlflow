import StepCompletedMessage from "../providers/interfaces/StepCompletedMessage";
import StepScheduledMessage from "../providers/interfaces/StepScheduledMessage";
import Provider from "../providers/interfaces/Provider";

export default class Worker {
  constructor(readonly provider: Provider) {
  }

  async start(): Promise<void> {
    await this.provider.startListening({
      handleEventTriggered: this.handleEventTriggered.bind(this),
      handleStepScheduled: this.handleStepScheduled.bind(this),
      handleStepCompleted: this.handleStepCompleted.bind(this)
    })
  }

  handleEventTriggered() {
    const workflows = []
    for (const workflow of workflows) {
      this.provider.emitScheduleStep({})
    }

    // should find subscribed workflows
    // should create ids for the instantiated workflows
    // should store the trigger event details, including the workflows created
  }

  handleStepScheduled(message: StepScheduledMessage) {
    ({
      path() {
        // TODO: how do variables fit in? anything to initialize here?
        // update document state?
        // most importantly, find first step and schedule it
        const firstStep = {}
        this.provider.emitScheduleStep()
      },
      fork() {
        // get list of paths
        // identify path selection type, single-path or multi-path
        // if conditions provided, evaluate them
        // select path(s) and schedule them
        const paths = []
        // TODO evaluate conditions
        for (const path of paths) {
          this.provider.emitScheduleStep()
        }
      },
      action() {
        // identify action to be run
        // evaluate inputs
        // invoke the action with them
        // receive the output and pass it to notify step completed
        const typeDef = {}
        // const result = typeDef.run()
        this.provider.emitStepCompleted()
      },
      workflow() {
        // TODO: if trigger has conditions, evaluate them and skip if needed
        // create the workflow in progress record
        // populate initial state with trigger details
        // TODO: if any variables to extract from the trigger, do so
        // find the root path, and schedule it
        const rootPath = {}
        this.provider.emitScheduleStep()
      }
    })[""]()
  }

  handleStepCompleted(message: StepCompletedMessage) {
    // if (message.kind === "action") {
    //   // store action result (is it misguided doing this here?)

    // }

    ({
      path() {
        // identify next step, schedule it
        // if last, emit stepCompleted
      },
      fork() {
        // emit stepCompleted
        // any state to manage?
      },
      workflow() {
        //
      }
    })[""]()
  }
}

// sourcing metadata like the workflow definition
// managing state
//
