<p align="center" style="margin-bottom: -5px">
  <img width="245" height="70" src="./docs/assets/Logo.PNG">
</p>

ctrl+flow is an open source framework for **empowering users to make application changes without writing code.**

### Project philosophy
- Developer time should be spent solving your hard technical problems, not on making low risk changes to business logic. Organizations can overcome bottlenecks and unlock velocity gains by delegating select responsibilities to non-developers.
- Developers need to have control over what users can automate, and visibility into what they're doing. Unsupervised users with unconstrained access will cause issues in complex systems.
- Users should have access to simple interfaces to business services that developers can maintain and test in code. Expecting them to do technical work like sending HTTP requests and forming database queries makes solutions hard to maintain and provides poor UX.

### Demo

You can check out the no-code dashboard UI at [demo.ctrlflowjs.com](https://demo.ctrlflowjs.com/). The actions and events available in this demo are purely illustrative examples, your app would contain components designed and created by your own team. You can check out [the demo app's code here](https://github.com/ctrlflowjs/ctrlflow/tree/main/examples/crm) to see how it [adds no-code actions and events](https://github.com/ctrlflowjs/ctrlflow/blob/main/examples/crm/src/ctrlflow/app.js), and how it [connects the UI and starts the runtime](https://github.com/ctrlflowjs/ctrlflow/blob/main/examples/crm/src/server.js).

## Getting Started

> The project is v0 and still in early development. v0 releases are expected to run (please give it a try and share feedback!), just be warned that there will be bugs, and preserving backwards compatibility is not yet a priority.

Adding ctrlflow to your app is straight forward:

1) Install it server-side `npm install @ctrlflow/core`
2) Define your app with modules and a storage provider ([example](https://github.com/ctrlflowjs/ctrlflow/blob/main/examples/crm/src/ctrlflow/app.js))
3) Start the app runtime and plug in the UI server ([example](https://github.com/ctrlflowjs/ctrlflow/blob/main/examples/crm/src/server.js))

## License

ctrl+flow is free and open source software with an MIT license. A pro license will also be available with a support plan and advanced controls for larger organizations.
