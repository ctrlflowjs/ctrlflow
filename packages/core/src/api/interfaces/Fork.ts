import Path from "./Path"

export default interface Fork {
  kind: "fork"
  paths: Path[]
}
