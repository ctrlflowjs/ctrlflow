let lowrider = require("./core")

/////////////////////////////////////////////////////////////

lowrider.defineEvent("application-created", {
  version: "1",
  displayName: "Application Created",
  tags: ['business'],
  inputSchema: {
    properties: {
      referenceId: { type: 'string', title: 'Reference Id' }
    }
  }
})

lowrider.defineEvent("application-product-changed", {
  displayName: 'Application Product Type Changed'
})

lowrider.defineEvent("policy-went-in-force", {
  displayName: 'Policy Went In-Force'
})

/////////////////////////////////////////////////////////////

lowrider.defineAction("add-numbers", {
  version: "1",
  displayName: "Add Numbers",
  inputSchema: {
    required: ['numA', 'numB'],
    properties: {
      numA: { type: 'number', title: 'First Operand' },
      numB: { type: 'number', title: 'Second Operand' },
    }
  },
  async perform(inputs, meta) {
    return {
      sum: inputs.numA + inputs.numB
    }
  }
})

lowrider.defineAction("add-remove-tag", {
  displayName: 'Add/Remove Tag',
  inputSchema: {
    required: ["tagName", "referenceId"],
    properties: {
      tagName: {
        type: "string",
        title: "Tag Name"
      },
      referenceId: {
        type: "string",
        title: "Reference Id"
      },
      action: {
        type: {
          oneOf: [
            { type: "string", enum: [ "Add", "Remove" ] }
          ]
        },
        title: "Action"
      }
    }
  }
})

lowrider.defineAction("set-lifecycle-stage",  {
  displayName: 'Set Lifecycle Stage',
  inputSchema: {
    required: ["lifecycleStage", "referenceId"],
    properties: {
      lifecycleStage: {
        type: "string",
        title: "Lifecycle Stage",
        enum: [
          "Not Started",
          "Quotes Sent",
          "Policy In-Force Service",
          "Merged"
        ]
      },
      referenceId: {
        type: "string",
        title: "Reference Id"
      }
    }
  }
})

lowrider.defineAction("apply-macro", {
  displayName: 'Apply Macro',
  inputSchema: {
    required: ["macro", "referenceId"],
    properties: {
      macro: {
        type: "string",
        title: "Macro"
      },
      referenceId: {
        type: "string",
        title: "Reference Id"
      }
    }
  }
})
/////////////////////////////////////////////////////////////

// lowrider.defineWorkflowTemplate("list-actions", {
//   validate() {

//   }
// })

/////////////////////////////////////////////////////////////

// await lowrider.emitEvent("application-created", {

// })