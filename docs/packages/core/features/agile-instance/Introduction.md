---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/agile-instance
---

:::warning

WIP docs!

:::

The `Agile Class` is the foundation of AgileTs. Everything related to AgileTs depends on this class in different ways.
```ts
const App = new Agile();
```
It can be seen as your application store, which manages each `Agile Sub Instance` (ASI).
The `Agile Class` doesn't contain these ASI's internally, but each ASI includes a reference to the main `Agile Class`. 
For instance, to pass something into the `runtime`.
Here are some Agile Sub Instances (ASI):

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
- [Event](../event/Introduction.md)
   ```ts
   const MY_EVENT = App.createEvent();
   ```

These ASI's are created with the help of an `Agile Instance` and get automatically bound to it.
In summary, the main tasks of an instantiated `Agile Class` (Agile Instance) are to:
- manage Agile Sub Instances, like [States](../state/Introduction.md), ..
- ingest changes into the Runtime
- trigger rerender on Integrations like [React](../../../react/Introduction.md)
- store values in any [Storage](../storage/Introduction.md)

Be aware that each application using AgileTs needs at least one `Agile Instance`,
but also shouldn't have more, because multiple `Agile Instance` in one application might cause trouble.

## 📭 Props

### `config`

The `Agile Class` takes an optional configuration object as its only parameter.
```ts
const App = new Agile({
    logConfig: {
        active: true,
    },
    localStorage: false
});
```
Here is a Typescript Interface for quick reference, however
each property will be explained in more detail below.
```ts
export interface CreateAgileConfigInterface {
  logConfig?: CreateLoggerConfigInterface;
  waitForMount?: boolean;
  localStorage?: boolean;
}
```

#### `logConfig`

The `logConfig` configures the Logger of AgileTs.
The Agile Logger simply logs important events in the console, like warnings or errors,
but it also logs runtime events if this is desired.
```ts
const App = new Agile({
  logConfig: {
    level: Logger.level.ERROR, // print only errors
    active: true,
  },
});
```
To find out more about possible configuration options, checkout the [CreateLoggerConfigInterface](../../../../Interfaces.md#createloggerconfig).


#### `localStorage`

Defines whether AgileTs should create an interface to the `localStorage` for us or not.
If we have decided to use the [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp), each Agile Sub Instance we
persist (`.persist()`), gets stored into the `localStorage` by default.
```ts
const App = new Agile({
  localStorage: false // default true
});
```
Of course, we aren't limited to the `localStorage`.
We can also create Interfaces to nearly any [Storage](../storage/Introduction.md) we want.
For instance, that is necessary in a Mobile Environment,
since there the `localStorage` doesn't exists. With `App.registerStorage()` we can register our own new [Storage](../storage/Introduction.md) in AgileTs.

#### `waitForMount`

This flag declares wether AgileTs should wait until unmounted
components get mounted before rerendering them.
```ts
const App = new Agile({
  waitForMount: false // default true
});
```


## 🟦 Typescript

The `Agile Class` is almost 100% typesafe.


## 🗺 Where to instantiate?

We can instantiate the `Agile Class` where ever we want.
Directly in our Component, in a separate file, or on paper.
It doesn't matter as long as we can work with it.
There are a few [Style Guides](../../../../main/StyleGuide.md) 
which might help you with such hard decision.
