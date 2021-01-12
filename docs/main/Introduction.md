---
id: introduction
title: AgileTs
sidebar_label: Introduction
slug: /
---

> **Spacy, Simple, Scalable State Management Framework**

<a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/core">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/core.svg" alt="npm minified size"/></a>
<a href="https://github.com/agile-ts/agile/actions?query=workflow%3ARelease">
   <img src="https://github.com/agile-ts/agile/workflows/Release/badge.svg?style=flat-square" alt="Build Status"/></a>
<a href="https://github.com/agile-ts/agile/actions?query=workflow%3A%22Test+All+Packages%22">
   <img src="https://github.com/agile-ts/agile/workflows/Test%20All%20Packages/badge.svg" alt="Build Status"/></a>
<a href="https://codeclimate.com/github/agile-ts/agile/coverage">
   <img src="https://codeclimate.com/github/agile-ts/agile/badges/gpa.svg" alt="Maintainability"/></a>

<br />
<br />

:::warning

AgileTs isn't well documented yet.
This docs are work in progress!

:::

## Introduction

AgileTs is a Library that brings State-Management to a new Level. 
The philosophy behind AgileTs is simple:

### 🚅 Straightforward
Write minimalistic, boilerplate free code that captures your intent.

**Some straightforward syntax examples:**
- Store State in the Local Storage
  ```ts
  MY_STATE.persist("storage-key")
  ```
- Create reactive Collection of States
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
Manage your Application Logic in a central place outside any UI-Framework.
This makes your code more decoupled, portable, and above all, easily testable.

### 🎯 Easy to Use
Learn the powerful tools of AgileTs in a short amount of time.
A good place to start is [here](./Installation.md).

### 🍃 Lightweight
AgileTs has an unpacked size of [52.7kB](https://bundlephobia.com/result?p=@agile-ts/core@0.0.6)
and [0 dependencies](https://www.npmjs.com/package/@agile-ts/core).

<br />

---

<br />


## Quick Example

### 😎 Let's create our first State

```tsx
// -- core.js ------------------------------------------

// Let's start by creating an Instance of AgileTs
const App = new Agile();

// Than we can build our first State
const MY_FIRST_STATE = App.State("Hello Stranger!");

// -- myComponent.whatever ------------------------------------------

// Now we are able to bind our State to nearly any UI-Component
// And wolla its reactive. Everytime the State mutates the Component gets rerendered
const myFirstState = useAgile(MY_FIRST_STATE); // returns value of State ("Hello Stranger!")
```
To find out more checkout our [Get Started](https://agile-ts.org/docs) Guide.

### ⛳️ Sandbox
Test AgileTs yourself, it's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)

<br />

---

<br />

## 💬 What other say

Actually nothing, hehe


