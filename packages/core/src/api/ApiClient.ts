import Provider from "../providers/Provider";
import { randomUUID } from 'crypto'
import Workflow from "./interfaces/Workflow";

export default class ApiClient {
  constructor(private readonly provider: Provider) {}

  async emitEvent(eventName: string, eventInputs: { [key: string]: any }): Promise<void> {
    const id = randomUUID()
    await this.provider.emitEventTriggered({
      id,
      name: eventName,
      inputs: eventInputs
    })
  }

  async getAllWorkflows(): Promise<Workflow[]> {
    return await this.provider.getAllWorkflows()
  }

  async getWorkflow(id: string): Promise<Workflow|null> {
    return await this.provider.getWorkflow(id)
  }

  async createWorkflow(workflow: Workflow): Promise<Workflow> {
    workflow.id = randomUUID()
    await this.provider.saveWorkflow(workflow)
    // let firstNode = workflowDef.nodes[0]
    // await _eventSubscriptions.add(firstNode.type, id)
    return workflow
  }

  async updateWorkflow(id: string, workflow: Workflow): Promise<Workflow> {
    workflow.id = id
    await this.provider.saveWorkflow(workflow)
    return workflow
  }

  async deleteWorkflow(id: string): Promise<void> {
    return await this.provider.deleteWorkflow(id)
  }
}
