---
id: introduction
title: Agile Instance
sidebar_label: Introduction
slug: /core/agile-instance
---

The `Agile Class` is the internal manager of AgileTs and should be unique to our application.
```ts
const App = new Agile();
```
It can be seen as an interface to any external Storage, 
or the UI-Frameworks AgileTs is implemented in.
Also, contains it a job queue system for managing State mutations.
Each `Agile Sub Instance` (ASI) holds a reference to the `Agile Class` 
and depends on its functionalities.
For reference, here are some `Agile Sub Instances` (ASI) 
created with an instantiated `Agile Instance` called `App`:

- [State](../state/Introduction.md)
  ```ts
   const MY_STATE = new State(App, "Hello there");
   ```
- [Collection](../collection/Introduction.md)
   ```ts
   const MY_COLLECTION = new Collection(App);
   ```
- [Computed](../computed/Introduction.md)
   ```ts
   const MY_COMPUTED = new Computed(App, () => {});
   ```

Most user won't come in direct contact with the hidden helper although everything depends on it.
That is due the fact that there exists an Agile Instance called `shared` in the background.
This Instance allows the easy and straightforward creation of ASI's.
```ts
const MY_STATE = createState('Created with hidden Agile Instance');
MY_STATE.agileInstance(); // Returns `shared` Agile Instance
```
However, to configure the Agile Instance in more detail, 
we have to define one on our own.
```ts
import {shared} from "@agile-ts/core";
const App = new Agile({/* many config optionas */});
shared = App;
```

In summary the main tasks of the `Agile Class` are to:
- queue [`Agile Sub Instance`](../../../../main/Introduction.md#agile-sub-instance)
  changes in the `runtime` to prevent race conditions
- update/rerender subscribed UI-Components through the provided Integrations
  such as the [React Integration](../../../react/Introduction.md)
- integrate with the persistent [Storage](../storage/Introduction.md)
- provide configuration object

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
