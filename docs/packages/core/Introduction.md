---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core
---

> Global State and Logic Framework

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

The `core` is the main package of AgileTs and includes the whole state management logic.
Therefore, it contains the main Instance of AgileTs, called [`Agile Class`](api/agile-instance/Introduction.md).
```ts
const App = new Agile();
```
In summary the main tasks of the `Agile Class` are to:
- queuing [`Agile Sub Instance`](../../main/Introduction.md#agile-sub-instance) changes in the `runtime` and preventing race conditions
- provide configuration object
- update/rerender subscribed Components through Integrations like the [React Integration](../react/Introduction.md)
- Integrating with persistent [Storage](api/storage/Introduction.md)

Each application using AgileTs needs the `core` package installed
and has to instantiate an `Agile Class` often called `App`.
To get some inspiration where to instantiate the `Agile Class`, check out  our [Style Guides](../../main/StyleGuide.md).
Besides, the `Agile Class` the `core` holds some other valuable classes,
which represent the actual features of AgileTs, since the `Agile Class`
is mainly used internally as an interface to Storages and Frameworks.

### ⚡️ [State](api/state/Introduction.md)
A `State` manages a _piece_ of Information that we need to remember globally at a later point in time.
While offering a toolkit to use and mutate this Information.
```ts
const MY_STATE = App.createState("Hello there");
MY_STATE.set("hi"); // Mutate State Value
MY_STATE.undo(); // Undo latest change
```

### 👨‍👧‍👦 [Collection](api/collection/Introduction.md)
A `Collection` manages a reactive _set_ of Information that we need to remember globally at a later point in time.
While offering a toolkit to use and mutate this _set_ of Information.
It is designed for arrays of data objects following the same pattern.
```ts
const MY_COLLECTION = App.createCollection();
MY_COLLECTION.collect({id: 1, name: "frank"}); // Add Data to Collection
MY_COLLECTION.remove(1).everywhere(); // Remove Data at primary Key '1' from Collection
```

### 🤖 [Computed](api/state/Introduction.md)
A Computed is an extension of the `State Class` and automatically computes its value depending on other [Agile Sub Instances](../../main/Introduction.md#agile-sub-instance) like States, Collections, ..
```ts
 const MY_COMPUTED = App.createComputed(() => (MY_STATE_1.value + MY_STATE_2.value));
```

## 🚀 Quick Links
- [Installation](./Installation.md)
- [Agile-Instance](api/agile-instance/Introduction.md)
  - [Properties](api/agile-instance/Properties.md)
  - [Methods](api/agile-instance/Methods.md)  
- [State](api/state/Introduction.md)
  - [Properties](api/state/Properties.md)
  - [Methods](api/state/Methods.md)
- [Collection](api/collection/Introduction.md)
  - [Properties](api/collection/Properties.md)
  - [Methods](api/collection/Methods.md)
  - [Group](api/collection/group/Introduction.md)
    - [Properties](api/collection/group/Properties.md)
    - [Methods](api/collection/group/Methods.md)
  - [Selector](api/collection/selector/Introduction.md)  
    - [Properties](api/collection/selector/Properties.md)
    - [Methods](api/collection/selector/Methods.md)
- [Computed](api/computed/Introduction.md)
  - [Properties](api/computed/Properties.md)
  - [Methods](api/computed/Methods.md)
- [Storage](api/storage/Introduction.md)
  - [Persisting Data](api/storage/PersistingData.md)
- [Integration](api/integration/Introduction.md)
