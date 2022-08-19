import ApiClient from "./api/ApiClient"
import Workflow from "./api/interfaces/Workflow"
import { MemoryProvider } from "./providers/MemoryProvider"
import Provider from "./providers/Provider"
import ActionType from "./registry/interfaces/ActionType"
import EventType from "./registry/interfaces/EventType"
import Registry from "./registry/Registry"
import Worker from "./worker/Worker"

export interface ApplicationOptions {
  components: (EventType|ActionType)[]
}

export default class Application {
  private readonly worker: Worker
  private readonly client: ApiClient
  private readonly registry: Registry

  constructor(options: ApplicationOptions, provider?: Provider) {
    provider = provider || new MemoryProvider()
    this.registry = new Registry()
    this.worker = new Worker(provider, this.registry)
    this.client = new ApiClient(provider)
    for (let component of options.components) {
      if (component.kind === "action-type") {
        this.registry.addAction(component)
      } else if (component.kind === "event-type") {
        this.registry.addEvent(component)
      }
    }
  }

  async start() {
    await this.worker.start()
  }

  async stop() {
    await this.worker.stop()
  }

  getEvents(): EventType[] {
    return this.registry.getAllEvents()
  }

  getActions(): ActionType[] {
    return this.registry.getAllActions()
  }

  getAllWorkflows(): Promise<Workflow[]> {
    return this.client.getAllWorkflows()
  }

  getWorkflow(id: string): Promise<Workflow|null> {
    return this.client.getWorkflow(id)
  }

  createWorkflow(workflow: Workflow): Promise<Workflow> {
    return this.client.createWorkflow(workflow)
  }

  updateWorkflow(id: string, workflow: Workflow) {
    return this.client.updateWorkflow(id, workflow)
  }

  deleteWorkflow(id: string): Promise<void> {
    return this.client.deleteWorkflow(id)
  }

  emitEvent(eventName: string, eventInputs: { [key: string]: any }): Promise<void> {
    return this.client.emitEvent(eventName, eventInputs)
  }
}
