---
id: introduction
title: AgileTs
sidebar_label: Introduction
slug: /
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

AgileTs is a Library that brings State-Management to a new Level. 
The philosophy behind AgileTs is simple:

### 🚅 Straightforward
Write minimalistic, boilerplate free code that captures your intent.

**Some straightforward syntax examples:**
- Store State in any Storage, like [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp)
  ```ts
  MY_STATE.persist("storage-key")
  ```
- Create reactive Array of States
  ```ts
  const MY_COLLECTION = App.Collection();
  MY_COLLECTION.collect({id: 1, name: "Frank"});
  MY_COLLECTION.collect({id: 2, name: "Dieter"});
  ```
- Mutate or Check States with simple Functions
  ```ts
  MY_STATE.undo(); // Undo last change
  MY_STATE.is({hello: "jeff"}); // Check if State has the Value {hello: "jeff"}
  ```

### 🤸‍ Flexible
- Works in nearly every UI-Framework. Check [here](https://agile-ts.org/docs/frameworks) if the Framework you are using, is supported, too.
- Surly behaves with the workflow that suits you best.
  No need for _reducers_, _actions_, ..
- Has **no** external dependencies

### 🌌 Centralize
Manage your Application Logic in a central place outside of any UI-Framework.
This makes your code more decoupled, portable, and above all easy testable.

### 🎯 Easy to Use
Learn the powerful tools of AgileTs in a short amount of time.
A good place to start is [here](./Installation.md).

### 🍃 Lightweight
AgileTs has an unpacked size of [52.7kB](https://bundlephobia.com/result?p=@agile-ts/core@0.0.6)
and [0 dependencies](https://www.npmjs.com/package/@agile-ts/core).

<br />

---

<br />


## ⏳ Quick Example

### 😎 Let's create our first State

```tsx
// -- core.js ------------------------------------------

// Let's start by creating an Instance of AgileTs
const App = new Agile();

// Now we are able to build our first State 😃
const MY_FIRST_STATE = App.createState("Hello Stranger!");


// -- myComponent.whatever ------------------------------------------

// Finally, we bind our just created State to our desired UI-Component
// And wolla its reactive. Everytime the State mutates the Component gets rerendered
const myFirstState = useAgile(MY_FIRST_STATE); // returns value of State ("Hello Stranger!")
```
To find out more check out our [Get Started](./Installation.md) Guide.

### ⛳️ Sandbox
Test AgileTs yourself, it's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)

<br />

---

<br />

## 💬 What others say

Actually nothing, hehe


