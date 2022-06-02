const trigger = SomeTrigger();
const someAction = SomeAction({ input1: trigger.output1 })
const anotherAction = AnotherAction().after(trigger);
