import app from "./app"
import expressRouter from "./servers/express"

module.exports = {
  eventType(name, def) {
    return {
      ...def,
      kind: 'event-type',
      type: name
    }
  },
  actionType(name, def) {
    return {
      ...def,
      kind: 'action-type',
      type: name
    }
  },
  workflowType(name, def) {
    return {
      ...def,
      kind: 'workflow-type',
      type: name
    }
  },
  app(def) {
    return app(def)
  },
  express: expressRouter
}
