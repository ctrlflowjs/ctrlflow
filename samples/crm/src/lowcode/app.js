const lcdk = require("../../../../core/main")

module.exports = lcdk.app({
  components: [
    require("./components/application-created-event"),
    require("./components/add-numbers-action")
  ]
})
