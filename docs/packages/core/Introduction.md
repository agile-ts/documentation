---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core
---

> **Brain of AgileTs**

 <br />

 <a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/npm/v/@agile-ts/core.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/core.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/npm/dt/@agile-ts/core.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>


## ❓ What does the `core` package?

You can think of the `core` package as the brain of AgileTs.
It includes the [Agile Class](./features/agile-instance/Introduction.md) which is the main Instance of AgileTs.
```ts
const App = new Agile();
```
This Instance, mostly called `App`, holds and manages all our States, Collection, ..
Each Agile Sub Instance like 

- [State](./features/state/Introduction.md)
  ```ts
   const MY_STATE = App.createState("Hello there");
   ```
- [Collection](./features/collection/Introduction.md)
   ```ts
   const MY_COLLECTION = App.createCollection();
   ```
- [Computed](./features/computed/Introduction.md)
   ```ts
   const MY_COMPUTED = App.createComputed(() => {});
   ```
- [Event](./features/event/Introduction.md)
   ```ts
   const MY_EVENT = App.createEvent();
   ```

has it originates from such main Agile Instance.

It doesn't matter where we instantiate our main Agile Instance, but for sure
each Application using AgileTs needs such an Instance.
But be aware that it isn't recommend having multiple Agile Instances in one single Application.
You might check out the [style guides](../../main/StyleGuide.md) to get some inspiration how to structure an Application having AgileTs as state manager.
