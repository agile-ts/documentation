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

The `core` is the main package of AgileTs and can be seen as the brain. Nearly everything related to AgileTs depends on this package. 
It includes the main Instance of AgileTs, the [`Agile Class`](./features/agile-instance/Introduction.md) often
called `App`.
```ts
const App = new Agile();
```
In summary, the main tasks of the `Agile Class` are to
- manage Agile Sub Instances, like [States](./features/state/Introduction.md), ..
- ingest changes into the Runtime
- trigger rerender in Integrations like [React](../react/Introduction.md)
- store values in any [Storage](./features/storage/Introduction.md)

Each application using AgileTs has to install
the `core` package and instantiate such an `Agile Class`.
To get some inspiration where to instantiate the `Agile Class`, check out the [Style Guide](../../main/StyleGuide.md) Section.
Besides the `Agile Class` the `core` holds some other useful classes
listed below. But each of these classes depends in some kind on the `Agile Class`.

### ⚡️ [State](./features/state/Introduction.md)
A State holds an Information that we need to remember at a later point in time.
```ts
const MY_STATE = App.createState("Hello there");
MY_STATE.set("hi"); // Mutate State Value
MY_STATE.undo(); // Undo latest change
```

### 👨‍👧‍👦 [Collection](./features/collection/Introduction.md)
A Collection holds a set of Information that we need to remember at a later point in time.
It is designed for arrays of data objects following the same pattern.
```ts
const MY_COLLECTION = App.createCollection();
MY_COLLECTION.collect({id: 1, name: "frank"}); // Add Data to Collection
MY_COLLECTION.remove(1).everywhere(); // Remove Data at primary Key '1' from Collection
```

### 🤖 [Computed](./features/state/Introduction.md)
A Computed is an extension of the `State Class`, 
it automatically computes its value depending on other Agile Sub Instances like States, Collections, ..
```ts
 const MY_COMPUTED = App.createComputed(() => (MY_STATE_1.value + MY_STATE_2.value));
```

### 🚌 [Event](./features/event/Introduction.md)
Events are handy for emitting UI updates and passing data with them.
```ts
const MY_EVENT = App.createEvent();
MY_EVENT.on((data) => {console.log("hello there " + data.name)}); // Print 'hello there jeff' if Event gets triggered
MY_EVENT.trigger({name: "jeff"}); // Trigger Event
```

## 🚀 Quick Links
- [Installation](./Installation.md)
- [Agile-Instance](./features/agile-instance/Introduction.md)
- [State](./features/state/Introduction.md)
- [Collection](./features/collection/Introduction.md)
- [Computed](./features/computed/Introduction.md)
- [Event](./features/event/Introduction.md)
- [Group](./features/collection/group/Introduction.md)
- [Selector](./features/collection/selector/Introduction.md)
- [Storage](./features/storage/Introduction.md)