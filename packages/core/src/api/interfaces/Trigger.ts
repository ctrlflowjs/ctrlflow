import Expression from "./Expression"

export default interface Trigger {
  kind: "trigger"
  id: string
  type: string
  inputs: { [key: string]: Expression }
}
