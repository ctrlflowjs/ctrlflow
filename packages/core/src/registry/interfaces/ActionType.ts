import ValueMap from "../../api/interfaces/ValueMap"

export default interface ActionType {
  kind: 'action-type',
  type: string
  title: string
  inputSchema: any
  perform(inputs: ValueMap): Promise<ValueMap>
}
