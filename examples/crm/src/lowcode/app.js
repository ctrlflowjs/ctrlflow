const lcdk = require("@lcdk/core")

module.exports = lcdk.app({
  components: [
    require("./components/append-spreadsheet-action"),
    require("./components/create-trello-card-action"),
    require("./components/email-starred-event")
  ]
})
