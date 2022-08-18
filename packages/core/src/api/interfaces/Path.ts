import Condition from "./Condition"
import Step from "./Step"

export default interface Path {
  kind: "path"
  id: string
  steps: Step[]
  condition: Condition
}
