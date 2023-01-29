<p align="left" style="margin-bottom: -50px">
  <img width="245" height="70" src="./docs/assets/Logo.PNG">
</p>

![Build](https://github.com/ctrlflowjs/ctrlflow/actions/workflows/ci.yml/badge.svg)

ctrl+flow is a lightweight alternative to business process automation platforms. It has no standalone deployment, it's a framework you can install into any Node.js web app and requires only a Redis instance to support background processing.

#### What is user automation? 

User automation means enabling users to automate parts of an application by letting them choose a triggering event and a series of actions to perform. It provides users advanced control of app logic without writing code or needing developer support. It's often found as a premium feature in many popular enterprise tools like Airtable, Slack, and Trello, and with ctrl+flow it can be added to any Node.js web app.

#### How can you use it?
- Enrich internal apps and reduce reliance on the dev team by enabling users to self-automate select scenarios
- Create a complete no-code automation platform for the enterprise
- Give your product users heightened control by providing automation capabilities

## Demo (Prototype)

[demo.ctrlflowjs.com](https://demo.ctrlflowjs.com/)

The actions and events available in this demo are purely illustrative examples, your app would contain components you create or install from third party packages.

## Getting Started

> The project is v0 and still at the prototyping stage. Updates will be published to npm, but expect a bumpy ride at this phase - things will be changing and breaking compatibility as needed.

Adding ctrlflow to your app:

1) Install with `npm install --save @ctrlflow/core`
2) Define your app with modules and a storage provider ([example](https://github.com/ctrlflowjs/ctrlflow/tree/main/examples/crm/src/ctrlflow))
3) Start the app runtime and plug in the UI server ([example](https://github.com/ctrlflowjs/ctrlflow/blob/main/examples/crm/src/server.js))

## License

ctrl+flow is free and open source software with an MIT license. A pro license will also be available with a support plan and advanced features for larger organizations.
