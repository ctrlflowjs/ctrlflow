export default interface ActionType {
  kind: 'action-type',
  type: string
  title: string
  inputSchema: any
  perform(inputs: { [key: string]: any }): Promise<{ [key: string]: any }>
}
