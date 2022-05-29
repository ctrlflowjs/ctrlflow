module.exports = {
  _events: {},
  _actions: {},
  defineEvent(typeId, def) {
    def.typeId = typeId
    this._events[typeId] = def
  },
  defineAction(typeId, def) {
    def.typeId = typeId
    this._actions[typeId] = def
  },
  getEvents() {
    return Object.values(this._events)
  },
  getActions() {
    return Object.values(this._actions)
  },
  emitEvent(name, inputs, meta) {
    // add to queue
  },
  performAction() {

  }
}
