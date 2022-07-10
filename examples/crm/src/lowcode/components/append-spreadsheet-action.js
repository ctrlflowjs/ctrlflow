let lcdk = require("@lcdk/core")

module.exports = lcdk.actionType("append-spreadsheet", {
  version: "1",
  displayName: "Append Line to Spreadsheet",
  title: 'Append Line to Spreadsheet',
  descriptions: '',
  docs: '',
  inputSchema: {
    required: ['numA', 'numB'],
    properties: {
      googleDrive: { type: 'number', title: 'Google Drive' },
      spreadsheet: { type: 'number', title: 'Spreadsheet' },
      worksheet: { type: 'number', title: 'Worksheet' },
      content:  { type: 'string', title: 'Content' },
    }
  },
  async perform(inputs, ctx) {
    return {
    }
  }
})
