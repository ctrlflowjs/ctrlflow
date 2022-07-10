let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("create-trello-card", {
  version: "1",
  displayName: "Create Trello Card",
  title: 'Create Trello Card',
  descriptions: '',
  docs: '',
  inputSchema: {
    required: ['numA', 'numB'],
    properties: {
      board: { type: 'string', title: 'Board' },
      list: { type: 'string', title: 'List' },
      name: { type: 'string', title: 'Name' },
      desciption:  { type: 'string', title: 'Description' },
    }
  },
  async perform(inputs, ctx) {
    return {
    }
  }
})
