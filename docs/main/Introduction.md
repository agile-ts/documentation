---
id: introduction
title: AgileTs
sidebar_label: Introduction
slug: /introduction/
---

> **Global State and Logic Framework**

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
and not completed yet!

:::

## 👋 Introduction

AgileTs is a global, simple, well-tested State Management Framework implemented in Typescript.
It offers a reimagined API that focus on **developer experience** and allows you to **quickly** and **easily** manage your States.
Besides States, AgileTs offers other powerful classes which make your life easier.
The philosophy behind AgileTs is simple:

### 🚅 Straightforward
Write minimalistic, boilerplate-free code that captures your intent.

**Some straightforward syntax examples:**

- Mutate and Check States with simple Functions
  ```ts
  MY_STATE.undo(); // Undo latest change
  MY_STATE.is({hello: "jeff"}); // Check if State has the Value '{hello: "jeff"}'
  MY_STATE.watch((value) => {console.log(value);}); // Watch on State changes
  ```
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
- Compute State depending on other States
  ```ts
  const MY_INTRODUCTION = App.createComputed(() => {
     return `Hello I am '${MY_NAME.vale}' and I use ${MY_STATE_MANAGER.value} for State Management.`;
  });
  ```

### 🤸‍ Flexible

- Works in nearly any UI-Layer. Check [here](Frameworks.md) if your preferred Framework is supported too.
- Surly behaves with the workflow which suits you best. No need for _reducers_, _actions_, ..
- Has **0** external dependencies

### ⛳️ Centralize

AgileTs is designed to take all business logic out of UI-Components and put them in a central place often called `core`.
The benefit of keeping logic separate to UI-Components is to make your code more decoupled, portable and above all easily testable.

### 🎯 Easy to Use

Learn the powerful tools of AgileTs in a short amount of time. An excellent place to start are
our [Quick Start](./Installation.md) Guides, or if you don't like following any tutorial, 
jump straight into our [Example](../examples) section.


## ⏳ Quick Example

Instead of talking too much about the benefits of AgileTs, let's start programming.

### 😎 Our first State

```tsx
// -- core.js ------------------------------------------

// Let's start by creating an Instance of AgileTs
const App = new Agile();

// Now we are able to create our first State 😃
const MY_FIRST_STATE = App.createState("Hello Stranger!");


// -- myComponent.whatever ------------------------------------------

// Finally, we bind the just initialized State to our desired UI-Component
// And wolla, it's reactive. Everytime the State mutates the Component rerenders
const myFirstState = useAgile(MY_FIRST_STATE); // returns value of State ("Hello Stranger!")
```

To find out more, check out our [Quick Start Guides](./Installation.md).

### ⛳️ Sandbox

Test AgileTs yourself. It's only one click away. Just select your preferred Framework below.

- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- [React-Native](https://snack.expo.io/@bennodev/agilets-first-state)  
- Vue (coming soon)
- Angular (coming soon)

More examples can be found in the [Example](../examples/Indroduction.md) Section.

## 👨‍💻 When use AgileTs

AgileTs is thought to handle the business logic and logic in general that isn't explicitly bound to a Component of your application.
We recommend using AgileTs to manage global States and their logic at a central place.

## 👨‍🏫 Learn AgileTs

We have a variety of resources available to help you learn AgileTs. An excellent place to start are
our [Quick Start](./Installation.md) Guides, where you learn the basics about how to use AgileTs in a specific
Framework. After knowing the ground concept of AgileTs, we recommend checking out the [Style Guides](./StyleGuide.md).
The Style Guides will help you get some inspiration on structuring a scalable application using AgileTs. Now you
are ready to use AgileTs wherever you want. In case you need some more information about some functionalities of AgileTs,
use the search bar in the top right corner. In case you have any further questions don't hesitate to join our [Community Discord](https://discord.gg/T9GzreAwPH).

## 🏢 Structure of Documentation

### 📁 AgileTs

You are currently in the `AgileTs` section, which serves as source for general topics like
the [Style Guide](./StyleGuide.md) or an [Installation Guide](./Installation.md).

### 📁 Quick Start

The `quick start` section is all about how to get AgileTs up and running in different environments
like [React](https://reactjs.org/) or [Vue](https://vuejs.org/). In each Quick Start Guide the basics of some AgileTs
classes ([State](../packages/core/features/state/Introduction.md), ..) are covered too.

### 📁 Packages

In the `packages` section all the AgileTs packages are listed. For instance the [core](../packages/core/Introduction.md) and
the [api](../packages/api/Introduction.md) package. If you click on one of them, it will reveal you an Introduction
about the package, an Installation Guide and all its features. In case of the [core](../packages/core/Introduction.md)
package you find the [State](../packages/core/features/state/Introduction.md)
and [Collection](../packages/core/features/collection/Introduction.md) docs in the Features Section.
Be aware that `⚠️ WIP` isn't an actual package. It is meant to separate packages that are currently `work in progress` 
and not ready for the outer world.

### 📁 Examples

Some interactive examples can be found in the `example` section.

### 📁 Interfaces

Without any context this section might be useless to you. As the name suggests, it's all about typescript interfaces of
AgileTs, which are outsourced for a better overview. You might get redirected to parts of the Interface Section from
other docs. Often to learn some more about specific properties of an interface.

## ❓ Something missing

If you find issues with the documentation or have suggestions on how to improve the documentation or the project in
general, please [file an issue](https://github.com/agile/agile-ts/issues) for us or join
our [Discord Community](https://discord.gg/T9GzreAwPH).

## 🎉 Credits

AgileTs is inspired by MVVM frameworks like [MobX](https://mobx.js.org/README.html)
and [PulseJs](https://github.com/pulse-framework/pulse).

## 💬 What others say

Actually nothing, yet. If you want to be the first one, don't mind tweeting what ever you think about AgileTs.
But don't forget to tag [@AgileFramework](https://twitter.com/AgileFramework), otherwise we can't find your tweet.


