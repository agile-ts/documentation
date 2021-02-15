---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /react
---

> **Use AgileTs with React and React-Native**

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

The `react` package is an Integration of AgileTs into React.
Its main task is to bind States to React Components.
This binding ensures that AgileTs rerender the Component, whenever a bound State mutates.
It also offers some other useful functions that optimize the workflow with AgileTs in a React Environment.

A distinction is made between `Functional` and `Class` Components, 
as we prefer using `React Hooks` in Functional Components. 
But Hooks aren't supported in Class Components, so we came across other solutions,
to offer the same features there too.

### 🐆 Functional Component

In Function Components we recommend using AgileTs Hooks like `useAgile`,
which allows us to bind any State to our React Component
```ts
// -- myComponent.jsx ------------------------------------------

// Binds MY_FIRST_STATE to myComponent
const myFirstState = useAgile(MY_FIRST_STATE);
```
To find out more about `useAgile`, and other Hooks provided by AgileTs, 
checkout the AgileTs Hook [docs](./features/Hooks.md).

### 🦖 Class Component

In Class Component we currently only support the `AgileHOC`,
which helps us binding States to our Component.
It is a Higher order Component that gets wrapped around our React Component.
```ts
// -- myComponent.jsx ------------------------------------------

// Binds MY_FIRST_STATE to myComponent
export default AgileHOC(myComponent, [MY_FIRST_STATE]);
```
To find out more AgileTs in Class Components,
checkout the AgileHOC [docs](./features/AgileHOC.md).

## 🚀 Quick Links
- [useAgile](./features/Hooks.md#useagile)
- [useEvent](./features/Hooks.md#useevent)
- [AgileHOC](./features/AgileHOC.md)

