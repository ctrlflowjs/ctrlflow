import Expression from "../api/interfaces/Expression";
import Provider from "../providers/Provider";

export default class ExpressionEvaluator {
  constructor(private readonly provider: Provider) {}

  async evaluate(expression: Expression): Promise<any> {

  }
}
