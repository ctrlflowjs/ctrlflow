export default interface EventTriggeredMessage {
  id: string
  name: string
  inputs: { [key: string]: any }
}
