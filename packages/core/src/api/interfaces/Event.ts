import ValueMap from "./ValueMap"

// TODO rename to avoid conflict
export default interface Event {
  kind: "event",
  id: string
  type: string
  values: ValueMap
}
