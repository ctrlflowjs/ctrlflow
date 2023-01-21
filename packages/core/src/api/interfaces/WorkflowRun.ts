export default interface WorkflowRun {
  id: string
  workflow: {
    id: string
    title: string
  }
  trigger: {
    id: string
    kind: string
    title: string
  }
  status: string
  startedAt: string|null
  finishedAt: string|null
  createdAt: string
}
