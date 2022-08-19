import ValueMap from "../../api/interfaces/ValueMap"

export default interface EventTriggeredMessage {
  event: {
    id: string
    type: string
    inputs: ValueMap
  }
}
