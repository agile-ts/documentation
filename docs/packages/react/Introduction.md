---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /react
---

> Integration for React or React-Native

 <br />

 <a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/npm/v/@agile-ts/react.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/react.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/npm/dt/@agile-ts/react.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>

## ❓ `react`

The `react` package helps us to integrate AgileTs into a [React](https://reactjs.org/) environment
and serves as an Interface to React.
Its main task is to bind States to React Components.
This binding ensures that AgileTs rerender the Component whenever a bound State mutates.
It also offers some other valuable functionalities that optimize the workflow using AgileTs in a React project.

A distinction is made between `Functional` and `Class` Components.
As we prefer to use [`React Hooks`](https://reactjs.org/docs/hooks-intro.html) in Functional Components
but Hooks aren't supported in Class Components.
Therefore, we have created alternatives for Class Components in order to offer the same functionalities there as well.

### 🐆 Functional Component

In Functional Components we recommend using AgileTs Hooks like [`useAgile()`](./features/Hooks.md#useagile).
The `useAgile()` Hook binds [Agile Sub Instances](../../main/Introduction.md#agile-sub-instance) (like States or Collections) to React Components.
```ts
// -- MyComponent.jsx ------------------------------------------

// Binds MY_FIRST_STATE to myComponent
const myFirstState = useAgile(MY_FIRST_STATE);
```
To find out more about `useAgile()`, and other Hooks provided by AgileTs,
checkout the [AgileTs Hook documentation](./features/Hooks.md).

### 🦖 Class Component

For Class Components, we provide the `AgileHOC`.
The `AgileHOC` is a Higher Order Component that is wrapped around a React Component.
It takes care of binding [Agile Sub Instances](../../main/Introduction.md#agile-sub-instance) (like States or Collections) to the wrapped React Component.
```ts
// -- MyComponent.jsx ------------------------------------------

// Binds MY_FIRST_STATE to myComponent
export default AgileHOC(myComponent, [MY_FIRST_STATE]);
```
To find out more about the `AgileHOC` and AgileTs in Class Components,
checkout the [AgileHOC documentation](./features/AgileHoc.md).

## 🚀 Quick Links
- [Installation](./Installation.md)
- [React Hook](./features/Hooks.md)
  - [useAgile](./features/Hooks.md#useagile)
  - [useWatcher](./features/Hooks.md#usewatcher)
- [AgileHOC](./features/AgileHoc.md)
