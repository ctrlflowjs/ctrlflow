export default interface WorkerProvider {
  emitEventTriggered(): Promise<void>
  emitScheduleStep(): Promise<void>
  emitStepCompleted(): Promise<void>
}
