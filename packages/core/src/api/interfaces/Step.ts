interface Step {
  kind: "action"|"path"|"fork"|"workflow"
  id: string
}

export default Step
