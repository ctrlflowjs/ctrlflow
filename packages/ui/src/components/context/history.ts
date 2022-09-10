import { getContext, setContext } from "svelte"

export interface HistoryContext {
  pushState(url: string): void
  back(): void
}

const CONTEXT_KEY = "history"

export function getHistoryContext(): HistoryContext {
  return getContext<HistoryContext>(CONTEXT_KEY)
}

export function setHistoryContext(history: HistoryContext) {
  return setContext(CONTEXT_KEY, history)
}

export default {
  get: getHistoryContext,
  set: setHistoryContext
}
