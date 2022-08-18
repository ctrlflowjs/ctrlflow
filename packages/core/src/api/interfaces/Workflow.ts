import Expression from "./Expression"
import Path from "./Path"
import Trigger from "./Trigger"

export default interface Workflow {
  kind: "workflow"
  id: string
  triggers: Trigger[]
  path: Path
  modifiedAt: string
}
