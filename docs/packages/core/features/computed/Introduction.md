---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/computed
---

:::warning

WIP docs!

:::


A Computed automatically computes its value depending on other Agile Sub Instances like [States](../state/Introduction.md), [Collections](../collection/Introduction.md), ..
We instantiate a Computed with help of an instantiated [Agile Instance](../agile-instance/Introduction.md) often called `App`.
By doing so, the Computed is automatically bound to the Agile Instance it was created from.
```ts
const MY_COMPUTED = App.createComputed(() => {
    return `My name is '${MY_NAME.value} and I am ${MY_AGE.value} years old.`;
});
```
The first parameter `createComputed()` takes,
is the computed method which recomputes the `value` of the Computed.
```ts
MY_COMPUTED.computeFunction(); // Returns (See below)
// 'My name is jeff and I am 10 years old.'
```
By default, the `Computed Class` does autodetect the used dependencies
and recomputes its value as soon as one dependency mutates.
But sometimes there are some issue with the autodetecting.
Therefore, the `createComputed()` method takes optional second property with the hard coded dependencies of the `Computed Class`.
```ts
const MY_COMPUTED = App.createComputed(() => {
    return `My name is '${MY_NAME.value} and I am ${MY_AGE.value} years old.`;
}, [MY_NAME, MY_AGE]);
```
A Computed is an extension of the `State Class` and offers the same powerful features.
```ts
MY_COMPUTED.undo(); // Undo latest change
MY_COMPUTED.persist(); // Persist Computed Value into Storage
```
If you want to find out more about specific methods of the Computed, checkout the [Methods](./Methods.md) Section.
Most methods we use to modify, mutate and access the Computed are chainable.
```ts
MY_COMPUTED.undo().recompute().watch(() => {}).reset().persist().type(String).undo();
```


## 🔨 Use case

```ts
const isAuthenticated = App.Computed(() => {
    return this.authToken.exists;
  });
```


## ⛳️ Sandbox
Test the Selector yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)


## 📭 Props

TODO


## 🟦 Typescript

The `Computed Class` is almost 100% typesafe.
