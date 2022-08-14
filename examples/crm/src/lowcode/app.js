const ctrlflow = require("@ctrlflow/core")

module.exports = ctrlflow.app({
  components: [
    // actions
    require("./actions/add-to-mailing-list"),
    require("./actions/apply-tag"),
    require("./actions/create-action-item"),
    require("./actions/create-user"),
    require("./actions/get-file"),
    require("./actions/save-file"),
    require("./actions/send-email"),
    require("./actions/send-invoice"),
    require("./actions/send-slack-message"),
    require("./actions/send-text-message"),
    require("./actions/set-assignee"),
    require("./actions/set-case-followup-date"),
    require("./actions/set-lifecycle-stage"),
    require("./actions/track-analytics-event"),
    // events
    require("./events/case-created-event"),
    require("./events/case-status-changed-event"),
    require("./events/email-received-event"),
    require("./events/payment-received-event"),
    require("./events/review-submitted-event"),
    require("./events/tag-added-event")
  ]
})
