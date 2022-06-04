const host = "http://localhost:3000"

export async function getMetadata() {
  return await fetch(`${host}/lcdk/meta`).then(x => x.json())
}

export async function getAllWorkflows() {
  return await fetch(`${host}/lcdk/workflows`).then(x => x.json())
}

export async function getWorkflow(workflowId) {
  return await fetch(`${host}/lcdk/workflows/${workflowId}`).then(x => x.json())
}

export async function createWorkflow(workflow) {
  return await fetch(`${host}/lcdk/workflows`, {
    method: "POST",
    body: JSON.stringify(workflow),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(x => x.json())
}

export async function updateWorkflow(workflowId, workflow) {
  return await fetch(`${host}/lcdk/workflows/${workflowId}`, {
    method: "PUT",
    body: JSON.stringify(workflow),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(x => x.json())
}

export async function deleteWorkflows(workflowId) {
  await fetch(`${host}/lcdk/workflows/${workflowId}`, {
    method: "DELETE",
  })
}
