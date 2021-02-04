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
<a href="https://npm.im/@agile-ts/core">
  <img src="https://img.shields.io/npm/v/@agile-ts/core.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/core">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/core.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/core">
  <img src="https://img.shields.io/npm/dt/@agile-ts/core.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>


## ❓ `core` 

The `core` package is the brain of AgileTs and handles nearly everything related to AgileTs.
- Manages your Agile Sub Instances ([State](./features/state/Introduction.md), ..)
- Ingest changes into the Runtime
- Triggers rerender on Integrations like [React](../react/Introduction.md)

Each mentioned feature is related to the [`Agile Class`](./features/agile-instance/Introduction.md) which 
is located in the `core`
```ts
const App = new Agile();
```
Agile Sub Instance like 

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
  
has it originates from the `Agile Class`.
Each Application using AgileTs must instantiate such an Agile Instance.
It doesn't matter where we instantiate our main Agile Instance,
but be aware that it isn't recommend having multiple Agile Instances in one single Application.
You might check out the [style guides](../../main/StyleGuide.md) to get some inspiration how to structure an Application having AgileTs as state manager.
