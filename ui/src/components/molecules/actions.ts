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
  return await fetch({
    method: "POST",
    url: `${host}/lcdk/workflows`,
    body: JSON.stringify(workflow)
  } as any).then(x => x.json())
}

export async function updateWorkflow(workflowId, workflow) {
  return await fetch({
    method: "PUT",
    url: `${host}/lcdk/workflows/${workflowId}`,
    body: JSON.stringify(workflow)
  } as any).then(x => x.json())
}

export async function deleteWorkflows(workflowId) {
  await fetch({
    method: "DELETE",
    url: `${host}/lcdk/workflows/${workflowId}`,
  } as any)
}
