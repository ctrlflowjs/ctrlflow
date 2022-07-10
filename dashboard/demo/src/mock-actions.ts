import actions from "../../src/components/pages/editor/actions"
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
  workflows[0]
},

actions.createWorkflow = async function(workflow) {
  let workflows = getWorkflows()
  workflows.push(workflow)
  setWorkflows(workflows)
  return workflow
},

actions.updateWorkflow = async function(workflowId, workflow) {
  let workflows = getWorkflows()
  // workflows.push(workflow)
  setWorkflows(workflows)
  return workflow
},

actions.deleteWorkflows = async function(workflowId) {
  let workflows = getWorkflows()
  // workflows.push(workflow)
  setWorkflows(workflows)
}
