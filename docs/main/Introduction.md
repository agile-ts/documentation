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

## 👋 Introduction

AgileTs is a global, simple, well-tested State Management Framework implemented in Typescript.
It offers a reimagined API that focuses on **developer experience** and allows you to **quickly** and **easily** manage your States.
Besides States, AgileTs offers some other powerful APIs that make your life easier.
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
  MY_STATE.persist("storage-key");
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

AgileTs is designed to take all business logic out of UI-Components and put them in a central place, often called `core`.
The benefit of keeping logic separate to UI-Components is to make your code more decoupled, portable, and above all, easily testable.

### 🎯 Easy to Use

Learn the powerful tools of AgileTs in a short amount of time. An excellent place to start are
our [Quick Start](./Installation.md) Guides, or if you don't like to follow any tutorials,
you can jump straight into our [Example](../examples/Indroduction.md) Section.


## ⏳ Quick Example

Instead of talking too much about the benefits of AgileTs, we should start programming.

### 😎 Create State

```tsx
// -- core.js ------------------------------------------

// 1️⃣ Create Instance of AgileTs
const App = new Agile();

// 2️⃣ Create State with help of before defined Agile Instance
const MY_FIRST_STATE = App.createState("Hello Friend!");


// -- myComponent.whatever ------------------------------------------

// 3️⃣ Bind initialized State to desired UI-Component
// And wolla, it's reactive. Everytime the State mutates the Component rerenders
const myFirstState = useAgile(MY_FIRST_STATE); // Returns value of State ("Hello Friend!")
```
To learn out more, check out our [Quick Start Guides](./Installation.md).

### ⛳️ Sandbox

Test AgileTs yourself in a [codesandbox](https://codesandbox.io/s/agilets-first-state-f12cz).
It's only one click away. Just select your preferred Framework below.

- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- [React-Native](https://snack.expo.io/@bennodev/agilets-first-state)
- Vue (coming soon)
- Angular (coming soon)

More examples can be found in the [Example](../examples/Indroduction.md) Section.

## 👨‍💻 When use AgileTs

AgileTs is thought to handle the States of the business logic and logic in general that isn't explicitly bound to a Component.
This includes, for example, `server caching States` like the logged-in user. AgileTs wasn't built to handle UI States like `isModalOpen`.
Therefore, AgileTs should be used as a friend and helper to outsource all business logic from your UI-Components.

## 🟦 Typescript

AgileTs is 99% written in Typescript and offers an excellent type-safety.

## 👨‍🏫 Learn AgileTs

We have a variety of resources available to help you learn AgileTs. An excellent place to start are
our [Quick Start](./Installation.md) Guides, where you learn the basics about how to use AgileTs in a specific
Framework. After knowing the ground concept of AgileTs, we recommend checking out the [Style Guides](./StyleGuide.md).
The Style Guides will help you to get some inspiration on structuring a scalable application using AgileTs. Now you
are ready to use AgileTs wherever you want. In case you need some more information about some functionalities of AgileTs,
use the search bar in the top right corner. In case you have any further questions, don't hesitate to join our [Community Discord](https://discord.gg/T9GzreAwPH).

## 🏢 Structure of Documentation

### 📁 AgileTs

You are currently in the `AgileTs` section, which serves as source for general topics like
the [Style Guide](./StyleGuide.md) or a general [Installation Guide](./Installation.md).

### 📁 Quick Start

The `Quick Start` Section is all about how to get AgileTs up and running in different environments
like [React](https://reactjs.org/) or [Vue](https://vuejs.org/). In each Quick Start Guide the basics of some AgileTs
classes (like the [State](../packages/core/features/state/Introduction.md)) are covered too.

### 📁 Packages

In the `packages` section all the AgileTs packages are listed. For instance the [core](../packages/core/Introduction.md) and
the [react](../packages/react/Introduction.md) package. If you click on one of them, it will reveal you an Introduction
about the package, an Installation Guide and all its features. In case of the [core](../packages/core/Introduction.md)
package you find the [State](../packages/core/features/state/Introduction.md)
and [Collection](../packages/core/features/collection/Introduction.md) documentation in the Features Section.
Be aware that `⚠️ WIP` isn't an actual package. It is meant to separate packages that are currently `work in progress`
and not ready for the outer world from the stable packages.

### 📁 Examples

Some interactive examples can be found in the `example` section.

### 📁 Interfaces

Without any context this Section might be useless to you. As the name suggests, it's all about typescript interfaces of
AgileTs, which are outsourced for a better overview. You might get redirected to parts of the Interface Section from
other documentation sections. Often to learn some more about specific properties of an interface.

## 💬 What others say

Actually, nothing, yet. If you want to be the first one, don't mind tweeting whatever you think about AgileTs.
But don't forget to tag [@AgileFramework](https://twitter.com/AgileFramework). Otherwise, we can't find your tweet.

## 🌏 History of AgileTs

After exploring the many options of Javascript State libraries, including the popular Redux and MobX.
I felt like I need a simpler, more straightforward solution.
One day I accidentally stumbled across a stream from [@jamiepine](https://twitter.com/jamiepine).
Jamie was using an interesting approach of State Management which I haven't seen yet.
The Framework he used was PulseJs, the ancestor of AgileTs, so to speak.

I liked this concept of State Management a lot and started using it in my own projects.
At this point in time (spring 2020), it wasn't officially released.
Therefore, it was quite buggy and had no documentation. But I figured out how to use it anyway
and saved my finding in a small [pre-documentation](https://www.notion.so/bennoworkspace/Pulse-v3-No-official-Docs-4e92e8d02dd3423582fa95072806cab6) for PulseJs fellows.

The months went by, and no stable version came out. Not even an npm package.
In July, I came to the conclusion to contribute to PulseJs, in order to speed up the development process a bit.
But before I could do anything, I had to figure out how PulseJs works internally.
After hours, I still haven't figured out how it works. This was due to the fact that I was a Typescript noob,
and the codebase was not contributor friendly (No comments, variables called x, a, b, ..).
In order to learn how PulseJs works and to get a deeper understanding of Typescript,
I decided to rewrite PulseJs from scratch in a separate project, later AgileTs.
After a while, I got the hang and understood how PulseJs works under the hood.

Now that I knew how PulseJs works, I could finally start contributing.
My [first contribution](https://github.com/pulse-framework/pulse/commits?author=bennodev19) was on the 16th August 2020,
where I refactored the `PulseHOC`. Unfortunately, PulseJs was moving further and further away from my idea of an ideal State Management Framework.
For instance, they introduced the `Pulse.Core`, which more or less forced me to define all States, Actions in a single object called `core`.
I wouldn't say I liked that change since I switched, among other reasons, to PulseJs in order not to define all my States in a single object.
Because of this relatively large design change, I would have to rebuild my entire State Management Logic of my applications.
Which I didn't want to do, because I liked the old concept more.

Luckily I had the refactored PulseJs version lying around, which I created to learn how PulseJs works internally and released it as an own framework called
[agile-architecture](https://www.npmjs.com/package/agile-architecture).
Agile-Architecture was at that point just an old refactored version of PulseJs without the `Pulse.Core`.
Another reason I turned away from PulseJs, besides the different visions, was the leak of organization.
Some of my changes never got merged into the `master` branch. Why? Idk. But I am sure that it was not intentional.
For instance, I fixed an annoying `usePulse` type issue, and eight months later, it is still not merged into the `master`.
Why should I contribute if my changes, which fixed a problem I had, will never be in a release version?

Now that I had my own State Management Framework, I had more control and adapted it to my needs.
Over time AgileTs evolved away from PulseJs with other visions and goals.
During this time, I rewrote and optimized all internal classes, created tests, and wrote a documentation.
Today AgileTs has only a similar syntax to PulseJs. Internal, it works quite differently.

**Conclusion:** The idea of AgileTs is based on PulseJs, and I would have loved to continue working on PulseJs.
But certain circumstances, such as a poor organization and different visions,
have driven me to write my own State Manager based on the good ground concept of PulseJs and MVVM frameworks.

## 🎉 Credits

AgileTs is inspired by MVVM frameworks like [MobX](https://mobx.js.org/README.html)
or [PulseJs](https://github.com/pulse-framework/pulse).

## ❓ Something missing

If you find issues with the documentation or have suggestions on how to improve the documentation or the project in
general, please [file an issue](https://github.com/agile/agile-ts/issues) for us or join
our [Community Discord](https://discord.gg/T9GzreAwPH) and notice it in the `#issue` channel.