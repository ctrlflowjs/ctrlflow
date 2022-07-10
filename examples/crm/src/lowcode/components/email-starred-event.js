let lcdk = require("@lcdk/core")

module.exports = lcdk.eventType("email-starred", {
  version: "1",
  displayName: "New Starred Email in Gmail",
  title: 'New Starred Email in Gmail',
  descriptions: '',
  docs: '',
  inputSchema: {
    properties: {
      id: { type: 'string', title: 'ID' },
      messageId: { type: 'string', title: 'Message ID' },
      messageUrl: { type: 'string', title: 'Message URL' },
      threadId: { type: 'number', title: 'Thread ID' },
      to: {
        type: 'object',
        title: 'To',
        properties: {
          names: {
            type: 'array'
          },
          emails: {
            type: 'array'
          }
        }
      },
      cc: { type: 'string', title: 'CC' },
      from: { type: 'string', title: 'From' },
      replyTo: { type: 'string', title: 'Reply To' },
    }
  },
  async perform(inputs, ctx) {
    return {
      sum: inputs.numA + inputs.numB
    }
  }
})
