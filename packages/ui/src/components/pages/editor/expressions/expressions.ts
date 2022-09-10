import ActionResultExpression from "./types/ActionResultExpression.svelte"
import TextExpression from "./types/TextExpression.svelte"
import NumberExpression from "./types/NumberExpression.svelte"
import DecisionExpression from "./types/DecisionExpression.svelte"
import ConditionExpression from "./types/ConditionExpression.svelte"
import AndOrExpression from "./types/AndOrExpression.svelte"

export default {
  categories: [
    {
      title: "Core",
      expressions: [
        {
          component: TextExpression,
          title: "Text",
          type: "text"
        },
        {
          component: NumberExpression,
          title: "Number",
          type: "number"
        },
        {
          component: ActionResultExpression,
          title: "Action Result",
          type: "action-result"
        },
        {
          component: DecisionExpression,
          title: "If / Else",
          type: "decision"
        },
        {
          component: ConditionExpression,
          title: "Assertion",
          type: "condition"
        },
        {
          component: AndOrExpression,
          title: "And / Or",
          type: "and-or"
        },
      ]
    }
  ]
}
