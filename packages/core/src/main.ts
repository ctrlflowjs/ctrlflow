import Application, { ApplicationOptions } from "./Application"
import ActionType from "./registry/interfaces/ActionType"
import EventType from "./registry/interfaces/EventType"
import expressRouter from "./servers/express"

module.exports = {
  eventType(name: string, def: Omit<EventType, "kind"|"type">): EventType {
    return {
      ...def,
      kind: 'event-type',
      type: name
    }
  },
  actionType(name: string, def: Omit<ActionType, "kind"|"type">): ActionType {
    return {
      ...def,
      kind: 'action-type',
      type: name
    }
  },
  app(def: ApplicationOptions) {
    return new Application(def)
  },
  express: expressRouter
}
