---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /react
---

> **Use AgileTs with React and React-Native**

 <br />

 <a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/npm/v/@agile-ts/react.svg" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/react.svg" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/npm/dt/@agile-ts/react.svg" alt="npm total downloads"/></a>

## What does this Integration?

Well, this Integration binds AgileTs Instances to React Components.
Through that AgileTs is able to rerender the Component if a bound Instance mutates.

Here is a quick example how such a binding might look like:
```ts
// -- myComponent.jsx ------------------------------------------

// Binds MY_FIRST_STATE to myComponent.jsx
 const myFirstState = useAgile(MY_FIRST_STATE);
```
