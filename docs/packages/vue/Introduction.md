---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /vue
---

:::warning

WIP Package!

:::

> Integration for Vue

 <br />

 <a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/vue">
  <img src="https://img.shields.io/npm/v/@agile-ts/vue.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/vue">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/vue.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/vue">
  <img src="https://img.shields.io/npm/dt/@agile-ts/vue.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>

## ❓ `vue`

The `vue` package helps us to integrate AgileTs into a [Vue](https://vuejs.org/) environment
and serves as an Interface to Vue.
Its main task is to bind States to Vue Components.
This binding ensures that AgileTs rerender the Component whenever a bound State mutates.
It also offers some other valuable functionalities that optimize the workflow using AgileTs in a Vue project.

### `bindAgileInstances()`

The `bindAgileInstances()` method binds/subscribes States to Vue Components.
This binding ensures that the Component rerenders whenever a bound State mutates.
We can flexibly bind any State to any Vue Component.
```ts
export default {
    name: 'MyComponent',
    data: function () {
        return {
            ...this.bindAgileInstances({
                myState: MY_STATE,
            }),
        };
    },
};
```
`bindAgileInstances()` returns a keymap object based on the passed State `value`.
This keymap we merge into the `data` object, to access the State `values` in our `html` code like local Vue State.
However, the AgileTs State `values` are under the `sharedState` property located
to separate them a little from the local Vue States.
```ts
const MY_STATE = App.createState('jeff');
const MY_STATE_2 = App.createState('frank');

this.bindAgileInstances({
  myState: MY_STATE,
  myState2: MY_STATE_2,
}); // Returns '{myState: 'jeff', mayState2: 'frank'}'
```
We don't have to define separate keymap keys, if our State has already a valid key.
```ts
const MY_STATE = App.createState('jeff', {key: 'myState'});
const MY_STATE_2 = App.createState('frank');

this.bindAgileInstances([
  MY_STATE,
  MY_STATE_2,
]); // Returns '{myState: 'jeff'}'
```
But if we use this variant, and the State has no key, it will be ignored.

### 🟦 Typescript

The `bindAgileInstances` isn't typesafe. But we are working on it.

## 🚀 Quick Links
- [Installation](./Installation.md)

