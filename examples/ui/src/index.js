import { Workflow } from "@ctrlflow/ui";
import "@ctrlflow/ui/dist/main.css"

window.Workflow = Workflow

customElements.define("ctrlflow-editor", class CtrlflowEditor extends HTMLElement {
  constructor() {
    super();

    new Workflow({
      target: this,
      props: {
        // workflowId: "315bb766-7050-45ed-b01d-19e99bc9a912"
      }
    })
  }
});
