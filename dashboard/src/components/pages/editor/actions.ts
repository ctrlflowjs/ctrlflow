const host = "http://localhost:3000"

let metadata = null
const actions = {
  async getMetadata() {
    return metadata ||= await fetch(`${host}/ctrlflow/meta`).then(x => x.json())
  },

  async getAllWorkflows() {
    return await fetch(`${host}/ctrlflow/workflows`).then(x => x.json())
  },

  async getWorkflow(workflowId) {
    return await fetch(`${host}/ctrlflow/workflows/${workflowId}`).then(x => x.json())
  },

  async createWorkflow(workflow) {
    return await fetch(`${host}/ctrlflow/workflows`, {
      method: "POST",
      body: JSON.stringify(workflow),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(x => x.json())
  },

  async updateWorkflow(workflowId, workflow) {
    return await fetch(`${host}/ctrlflow/workflows/${workflowId}`, {
      method: "PUT",
      body: JSON.stringify(workflow),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(x => x.json())
  },

  async deleteWorkflows(workflowId) {
    await fetch(`${host}/ctrlflow/workflows/${workflowId}`, {
      method: "DELETE",
    })
  }
}

export default actions
