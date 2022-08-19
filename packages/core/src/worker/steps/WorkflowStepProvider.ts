import StepCompletedMessage from "../interfaces/StepCompletedMessage"
import StepProvider from "../interfaces/StepProvider"
import Worker from "../Worker"
import { randomUUID } from "crypto"
import Provider from "../../providers/Provider"

export default class WorkflowStepProvider implements StepProvider {
  constructor(private readonly provider: Provider) {}

  async startStep({ params }: WorkflowScheduledMessage): Promise<void> {
    const workflow = await this.provider.getWorkflow(params.workflowId)
    if (!workflow) {
      throw new Error("TODO")
    }

    // TODO: store info about the trigger for value reference
    // TODO: if trigger has conditions, evaluate them and skip if needed
    const workflowRunId = randomUUID().replace(/-/g, "")
    await this.provider.emitScheduleStep({
      stepKind: "path",
      parentStep: {
        kind: "workflow",
        id: ""
      },
      params: {
        workflowId: params.workflowId,
        path: workflow.path
      }
    })
  }

  async childStepCompleted(message: WorkflowCompletedMessage): Promise<void> {
    // cleanup workflow
  }
}

export interface WorkflowScheduledMessage {
  stepKind: "workflow"
  parentStep: {
    kind: "path"|"event"
    id: string
  }
  params: {
    workflowId: string
  }
}

export interface WorkflowCompletedMessage extends WorkflowScheduledMessage {
  result: {

  }
}
