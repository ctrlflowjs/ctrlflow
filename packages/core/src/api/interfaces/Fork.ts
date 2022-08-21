import Path from "./Path"

export default interface Fork {
  kind: "fork"
  id: string
  paths: Path[]
}
