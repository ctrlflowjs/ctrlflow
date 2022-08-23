import Event from "../../../src/api/interfaces/Event"
import Workflow from "../../../src/api/interfaces/Workflow"
import { MemoryProvider } from "../../../src/providers/MemoryProvider"
import Registry from "../../../src/registry/Registry"
import SyncWorker from "../../../src/worker/sync/SyncWorker"
import basicWorkflow from "../../samples/workflows/basic-workflow.json"

const registry = new Registry()
registry.addAction({
  kind: "action-type",
  type: "test",
  title: "Test",
  inputSchema: {
    testInput: {
      type: "string"
    }
  },
  async perform(inputs) {
    return {
      bla: "hello world!!!!w"
    }
  }
})

describe("something", () => {
  it("does something", async () => {
    const worker = new SyncWorker(new MemoryProvider(), registry)
    await worker.executeWorkflow(basicWorkflow as unknown as Workflow, {} as Event)
  })
})


// TESTS TO WRITE
// - action does not exist in registry
//


// workflow format validation
// - fork paths have kind path
// - overall schema validation
