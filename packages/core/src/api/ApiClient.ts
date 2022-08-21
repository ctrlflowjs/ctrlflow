import Provider from "../providers/Provider";
import { randomUUID } from 'crypto'
import Workflow from "./interfaces/Workflow";
import ValueMap from "./interfaces/ValueMap";

export default class ApiClient {
  constructor(private readonly provider: Provider) {}

  async emitEvent(eventName: string, eventInputs: ValueMap): Promise<void> {
    const id = randomUUID()
    await this.provider.emitEventTriggered({
      event: {
        kind: "event",
        id,
        type: eventName,
        values: eventInputs
      }
    })
  }

  async getAllWorkflows(): Promise<Workflow[]> {
    return await this.provider.getAllWorkflows()
  }

  async getWorkflow(id: string): Promise<Workflow|null> {
    return await this.provider.getWorkflow(id)
  }

  async createWorkflow(workflow: Workflow): Promise<Workflow> {
    // missing validation
    workflow.id = randomUUID()
    await this.provider.saveWorkflow(workflow)
    for (let event of workflow.triggers) {
      await this.provider.subscribeWorkflowToEvent(workflow.id, event.type)
    }
    return workflow
  }

  async updateWorkflow(id: string, workflow: Workflow): Promise<Workflow> {
    // missing validation
    workflow.id = id
    await this.provider.saveWorkflow(workflow)
    return workflow
  }

  async deleteWorkflow(id: string): Promise<void> {
    return await this.provider.deleteWorkflow(id)
  }
}
