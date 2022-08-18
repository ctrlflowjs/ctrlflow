export default interface StepCompletedMessage {
  stepKind: string
  parentStep: {
    kind: "action"|"path"|"fork"|"workflow"
    id: string
  }
}
