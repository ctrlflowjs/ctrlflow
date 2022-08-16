// function executeWorkflow(workflowDef, trigger) {
//   // define state
//   const state = {}
//   // get root path
//   const path = {}
//   await executePath(path, state)
// }

// async function executePath(path, state) {
//   for (let step of path.steps) {
//     if (step.kind === "action") {
//       await executeAction(step, state)
//     } else if (step.kind === "fork") {
//       await executeFork(step, state)
//     } else if (step.kind === "path") {
//       await executePath(step, state)
//     }
//   }
// }

// async function executeAction(action, state) {
//   const typeDef = {}
//   await typeDef.run()
// }

// async function executeFork(fork, state) {
//   const paths = []
//   for (let path of fork.paths) {
//     paths.push(executePath(path, state))
//   }
//   await Promise.all(paths)
// }


// // store info about progress and results
// // operational state and informational state - two separate things

// // assume retryable errors can only happen in actions, and only they can mutate data
// // need to save state before running an action

// // if the workflow is halted by the service stopping, it needs to not re-run any completed actions
