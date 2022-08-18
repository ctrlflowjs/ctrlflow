import Expression from "./Expression"

export default interface Action {
  kind: "action"
  id: string
  type: string
  inputs: { [key: string]: Expression }
}
