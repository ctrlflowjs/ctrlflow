const host = "http://localhost:3000"

let metadata = null
const actions = {
  async getMetadata() {
    return metadata ||= await fetch(`${host}/ctrlflow/meta`).then(x => x.json())
  },

  async getAllWorkflows() {
    return await fetch(`${host}/ctrlflow/workflows`).then(x => x.json())
  },

  async getWorkflow(workflowId: string) {
    return await fetch(`${host}/ctrlflow/workflows/${workflowId}`).then(x => x.json())
  },

  async createWorkflow(workflow: any) {
    return await fetch(`${host}/ctrlflow/workflows`, {
      method: "POST",
      body: JSON.stringify(workflow),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(x => x.json())
  },

  async updateWorkflow(workflowId: string, workflow: any) {
    return await fetch(`${host}/ctrlflow/workflows/${workflowId}`, {
      method: "PUT",
      body: JSON.stringify(workflow),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(x => x.json())
  },

  async deleteWorkflows(workflowId: string) {
    await fetch(`${host}/ctrlflow/workflows/${workflowId}`, {
      method: "DELETE",
    })
  },

  async getAllEvents() {
    return await fetch(`${host}/ctrlflow/events`).then(x => x.json())
  },
}

export default actions
