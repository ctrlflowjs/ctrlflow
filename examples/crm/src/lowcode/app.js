const lcdk = require("@lcdk/core")

module.exports = lcdk.app({
  components: [
    require("./components/application-created-event"),
    require("./components/add-numbers-action")
  ]
})
