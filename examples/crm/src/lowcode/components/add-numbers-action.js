let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("add-numbers", {
  version: "1",
  displayName: "Add Numbers",
  title: 'Add Numbers',
  descriptions: '',
  docs: '',
  inputSchema: {
    required: ['numA', 'numB'],
    properties: {
      numA: { type: 'number', title: 'Number 1' },
      numB: { type: 'number', title: 'Number 2' },
    }
  },
  async perform(inputs, ctx) {
    return {
      sum: inputs.numA + inputs.numB
    }
  }
})
