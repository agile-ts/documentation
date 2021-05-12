---
id: introduction
title: Agile Instance
sidebar_label: Introduction
slug: /core/agile-instance
---

The `Agile Class` is the main Instance of AgileTs and should be unique to our application.
```ts
const App = new Agile();
```
It can be seen as an Interface to any Storage or the Frameworks AgileTs is implemented in.
In addition, it manages the changes of [`Agile Sub Instances`](../../../../main/Introduction.md#agile-sub-instance) to prevent race conditions.
Each `Agile Sub Instance` (ASI) holds a reference to the `Agile Class` and depends on its functionalities.
Furthermore, ASI's can be created with the help of an instantiated `Agile Class`.
For reference, here are some `Agile Sub Instances` (ASI) created with an instantiated `Agile Instance` called `App`:

- [State](../state/Introduction.md)
  ```ts
   const MY_STATE = App.createState("Hello there");
   ```
- [Collection](../collection/Introduction.md)
   ```ts
   const MY_COLLECTION = App.createCollection();
   ```
- [Computed](../computed/Introduction.md)
   ```ts
   const MY_COMPUTED = App.createComputed(() => {});
   ```

In summary the main tasks of the `Agile Class` are to:
- queuing [`Agile Sub Instance`](../../../../main/Introduction.md#agile-sub-instance) changes in the `runtime` and preventing race conditions
- provide configuration object
- update/rerender subscribed Components through Integrations like the [React Integration](../../../react/Introduction.md)
- Integrating with persistent [Storage](../storage/Introduction.md)

## 📭 Props

### `config`

The `Agile Class` takes an optional configuration object as its only parameter.
```ts
new Agile({
    logConfig: {
        active: true,
    },
    localStorage: false
});
```
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface CreateAgileConfigInterface {
  logConfig?: CreateLoggerConfigInterface;
  localStorage?: boolean;
  waitForMount?: boolean;
  bindGlobal?: boolean;
}
```

#### `logConfig`
The `logConfig` defines the configuration object for the Logger of AgileTs.
The Agile Logger simply logs important events in the console, like warnings or errors,
but it also logs runtime events if this is desired.
```ts
new Agile({
  logConfig: {
    level: Logger.level.ERROR, // print only errors
    active: true,
  },
});
```
To find out more about possible configuration options, checkout the [CreateLoggerConfigInterface](../../../../Interfaces.md#createloggerconfig).

| Type                                                                           | Default                                                          | Required |
|--------------------------------------------------------------------------------|------------------------------------------------------------------|----------|
| [`CreateLoggerConfigInterface`](../../../../Interfaces.md#createloggerconfig)  | {prefix: 'Agile', active: true, level: Logger.level.WARN}        | No       |

<br/>

#### `localStorage`
Whether AgileTs should create an interface to the [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp) and set it as default Storage.
Each [Agile Sub Instance](../../../../main/Introduction.md#agile-sub-instance) we persist (`.persist()`), will then be stored in the `localStorage` by default.
```ts
new Agile({
  localStorage: false // default true
});
```
We aren't limited to the `localStorage` and can create Interfaces to nearly any [Storage](../storage/Introduction.md) we prefer saving data in.
For instance, that is necessary for a Mobile Environment since the `localStorage` doesn't exist, and we have to resort to the Async Storage.
With `App.registerStorage()` we register a new [Storage](../storage/Introduction.md) to AgileTs.

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | true        | No       |

<br/>

#### `waitForMount`
This flag declares whether AgileTs should wait until unmounted Components get mounted before trigger rerenders on them.
```ts
new Agile({
  waitForMount: false // default true
});
```

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | true        | No       |

<br/>

#### `bindGlobal`
Whether the Agile Instance should be bound [globally](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) at the key `__agile__`.
```ts
new Agile({
  bindGlobal: false // default false
});
```
A globally bound Agile Instance has some advantages:
- If methods such as `useAgile()` can't find any Agile Instance in the given Instances, 
  they fall back on the global Agile Instance.
- You can simply access it in the console for debugging purpose.

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | false       | No       |


## 🗺 Where to instantiate?

We can instantiate the `Agile Class` where ever we want.
Directly in our Component, in a separate file, or on paper.
It doesn't matter as long as we can work with it.
There are a few [Style Guides](../../../../main/StyleGuide.md)
which might help you with such a hard decision.


## 🟦 Typescript

The `Agile Class` is almost 100% typesafe.
