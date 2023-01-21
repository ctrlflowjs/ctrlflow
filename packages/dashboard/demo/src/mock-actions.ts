import actions from "../../src/components/editor/actions"
import metadata from "./metadata.json"

function getWorkflows() {
  return JSON.parse(localStorage.getItem("workflows") || "[]")
}

function setWorkflows(workflows) {
  localStorage.setItem("workflows", JSON.stringify(workflows))
}

actions.getAllWorkflows = async function() {
  return JSON.parse(localStorage.getItem("workflows") || "[]")
}

actions.getMetadata = async function() {
  return metadata
}

actions.getWorkflow = async function(workflowId) {
  let workflows = getWorkflows()
  return workflows.find(w => w.id === workflowId)
},

actions.createWorkflow = async function(workflow) {
  workflow.id = crypto.randomUUID()
  let workflows = getWorkflows()
  workflows.push(workflow)
  setWorkflows(workflows)
  return workflow
},

actions.updateWorkflow = async function(workflowId, workflow) {
  let workflows = getWorkflows()
  let oldIndex = workflows.findIndex(w => w.id === workflowId)
  workflows.splice(oldIndex, 1, workflow)
  setWorkflows(workflows)
  return workflow
},

actions.deleteWorkflows = async function(workflowId) {
  let workflows = getWorkflows()
  let oldIndex = workflows.findIndex(w => w.id === workflowId)
  workflows.splice(oldIndex, 1)
  setWorkflows(workflows)
}
