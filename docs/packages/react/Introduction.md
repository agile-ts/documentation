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

## ❓ What does this Integration?

Well, the main task of this Integration is to bind States, Collection, .. to React Components.
This binding ensures that AgileTs rerender the Component, if a bound Instance mutates.
It also offers some other useful functions that optimize the workflow of AgileTs in a React Environment.

A distinction is made between `Functional` and `Class` Components, 
as we prefer using `React Hooks` in Functional Components. 
But Hooks aren't supported in Class Components, so we came across other solutions,
to offer the same features there too.

### Functional Component

In Function Components we recommend using AgileTs Hooks like `useAgile`.
With `useAgile` you can bind any State to your React Component.
```ts
// -- myComponent.jsx ------------------------------------------

// Binds MY_FIRST_STATE to myComponent
const myFirstState = useAgile(MY_FIRST_STATE);
```
To find out more about AgileTs Hooks, checkout the AgileTs Hook [docs](./features/Hooks.md).

### Class Component

In Class Component we currently only support the `AgileHOC`,
which helps us binding States to our Component.
It is a Higher order Component that gets wrapped around our React Component.
```ts
// -- myComponent.jsx ------------------------------------------

// Binds MY_FIRST_STATE to myComponent
export default AgileHOC(myComponent, [MY_FIRST_STATE]);
```
To find out more checkout the **AgileHOC** [docs](./features/AgileHOC.md).

