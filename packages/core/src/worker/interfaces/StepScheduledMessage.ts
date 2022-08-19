export default interface StepScheduledMessage {
  stepKind: "action"|"path"|"fork"|"workflow",
  parentStep: {
    kind: "action"|"path"|"fork"|"workflow"|"event"
    id: string
  },
  params: unknown
}
