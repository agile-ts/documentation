---
id: introduction
title: AgileTs
sidebar_label: Introduction
slug: /introduction/
---

> **Spacy, Simple, Scalable State Management Framework**

<a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/core">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/core.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/core">
  <img src="https://img.shields.io/npm/dt/@agile-ts/core.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>
<a href="https://github.com/agile-ts/agile/actions?query=workflow%3ARelease">
   <img src="https://github.com/agile-ts/agile/workflows/Release/badge.svg" alt="Build Status"/></a>
<a href="https://github.com/agile-ts/agile/actions?query=workflow%3A%22Test+All+Packages%22">
   <img src="https://github.com/agile-ts/agile/workflows/Test%20All%20Packages/badge.svg" alt="Build Status"/></a>

<br />
<br />

:::warning

These docs are work in progress 
and not complete yet!

:::

## 👋 Introduction

AgileTs is a simple, fast and well tested State Management Framework which is implemented in TypeScript. It's more
flexible and boilerplate free than Redux and has an interesting approach to reducing the size of a codebase through a
centralized memory design pattern. The philosophy behind AgileTs is simple:

### 🚅 Straightforward
Write minimalistic, boilerplate free code that captures your intent.

**Some straightforward syntax examples:**

- Store State in any Storage, like [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp)
  ```ts
  MY_STATE.persist("storage-key")
  ```
- Create a reactive Array of States
  ```ts
  const MY_COLLECTION = App.createCollection();
  MY_COLLECTION.collect({id: 1, name: "Frank"});
  MY_COLLECTION.collect({id: 2, name: "Dieter"});
  ```
- Mutate or Check States with simple Functions
  ```ts
  MY_STATE.undo(); // Undo latest change
  MY_STATE.is({hello: "jeff"}); // Check if State has the Value '{hello: "jeff"}'
  ```

### 🤸‍ Flexible

- Works in nearly every UI-Framework. Check [here](https://agile-ts.org/docs/frameworks) if your preferred framework is
  supported too.
- Surly behaves with the workflow that suits you best. No need for _reducers_, _actions_, ..
- Has **no** external dependencies

### 🎯 Easy to Use

Learn the powerful tools of AgileTs in a short amount of time. A good place to start are
our [Quick Starts](./Installation.md)
or if you are no fan of following any tutorial, checkout your [examples](../examples).


<br />

---

<br />


## ⏳ Quick Example

Instead of talking too much about the advantages of AgileTs, we should rather start coding.

### 😎 Our first State

```tsx
// -- core.js ------------------------------------------

// Let's start by creating an Instance of AgileTs
const App = new Agile();

// Now we are able to create our first State 😃
const MY_FIRST_STATE = App.createState("Hello Stranger!");


// -- myComponent.whatever ------------------------------------------

// Finally, we bind our just initialized State to our desired UI-Component
// And wolla its reactive. Everytime the State mutates the Component gets rerendered
const myFirstState = useAgile(MY_FIRST_STATE); // returns value of State ("Hello Stranger!")
```

To find out more check out our [Quick Start Guides](./Installation.md).

### ⛳️ Sandbox

Test AgileTs yourself, it's only one click away. Just select your preferred Framework below.

- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)

More examples can be found in the [Example Section](../examples/Indroduction.md).


<br />

---

<br />

## 🎉 Credits

AgileTs is inspired by MVVM frameworks like [MobX](https://mobx.js.org/README.html)
and [PulseJs](https://github.com/pulse-framework/pulse).


<br />

---

<br />

## 💬 What others say

Actually nothing, hehe


