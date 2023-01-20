export class NavManager {
  setUrl(url: string): void {
    window.history.pushState({}, 'unused', url)
    for (let listener of this._stateChangeListeners) {
      try {
        listener()
      } catch (error) {
        console.error(error)
      }
    }
  }

  onUrlChange(listener: Function, onDestroy: (cb: () => void) => void): void {
    if (!this._stateChangeListeners.includes(listener)) {
      this._stateChangeListeners.push(listener)
    }

    onDestroy(() => {
      let index = this._stateChangeListeners.indexOf(listener)
      this._stateChangeListeners.splice(index, 1)
    })

    try {
      listener()
    } catch (error) {
      console.error(error)
    }
  }

  _stateChangeListeners: Function[] = []
}

export default new NavManager()
