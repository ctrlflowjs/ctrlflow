import ActionType from "./interfaces/ActionType"
import EventType from "./interfaces/EventType"

export default class Registry {
  private readonly _events: { [k: string]: EventType } = {}
  private readonly _actions: { [k: string]: ActionType } = {}

  getAllEvents(): EventType[] {
    return Object.values(this._events)
  }

  getEvent(name: string): EventType {
    return this._events[name]
  }

  addEvent(event: EventType) {
    this._events[event.type] = event
  }

  getAllActions(): ActionType[] {
    return Object.values(this._actions)
  }

  getAction(name: string): ActionType {
    return this._actions[name]
  }

  addAction(action: ActionType) {
    this._actions[action.type] = action
  }
}
