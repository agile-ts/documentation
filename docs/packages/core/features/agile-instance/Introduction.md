---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/agile-instance
---

The `Agile Class` is the main Instance of AgileTs and should be unique to our application.
```ts
const App = new Agile();
```
It can be seen as the interface to any Storage, or the Frameworks AgileTs is implemented in like React.
In addition, it manages the changes of `Agile Sub Instances` to prevent race conditions.
Each `Agile Sub Instance` (ASI) holds a reference to the `Agile Class` and depends on its functionalities.
Furthermore, ASI's are created with the help of an instantiated `Agile Class`.
For reference here are some `Agile Sub Instances` (ASI) created with an `Agile Instance` called `App`:

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
  
In summary the main tasks of the `AgileClass` are to:
- queuing `Agile Sub Instance` changes in the `runtime` and preventing race conditions
- provide configuration object
- update/rerender subscribed Components through Integrations like the [React Integration](../../../react/Introduction.md)
- Integrating with persistent [Storage](../storage/Introduction.md)

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

This flag declares whether AgileTs should wait until unmounted
components get mounted before rerendering them.
```ts
const App = new Agile({
  waitForMount: false // default true
});
```


## 🗺 Where to instantiate?

We can instantiate the `Agile Class` where ever we want.
Directly in our Component, in a separate file, or on paper.
It doesn't matter as long as we can work with it.
There are a few [Style Guides](../../../../main/StyleGuide.md)
which might help you with such hard decision.


## 🟦 Typescript

The `Agile Class` is almost 100% typesafe.
