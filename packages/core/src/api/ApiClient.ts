import Provider from "../providers/Provider";
import { randomUUID } from 'crypto'
import Workflow from "./interfaces/Workflow";
import ValueMap from "./interfaces/ValueMap";
import Event from "./interfaces/Event";

export default class ApiClient {
  constructor(private readonly provider: Provider) {}

  async emitEvent(eventName: string, eventInputs: ValueMap): Promise<void> {
    const id = randomUUID()
    const event: Event = {
      kind: "event",
      id,
      type: eventName,
      values: eventInputs,
      createdAt: new Date().toISOString()
    }
    await this.provider.saveEvent(event)
    await this.provider.emitEventTriggered({
      event
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

  async getAllEvents(): Promise<Event[]> {
    let events = await this.provider.getAllEvents()
    events.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1
      }
      if (a.createdAt > b.createdAt) {
        return -1
      }
      return 0
    })

    return events
  }
}
