export default interface Expression {
  kind: "expression"
  type: "string",
  inputs: { [name: string]: Expression }
}
