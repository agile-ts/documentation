---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/agile-instance
---

:::warning

WIP docs!

:::

The `Agile Class` is the foundation of AgileTs.
Nearly everything related to AgileTs depends in some kind on this class.
```ts
const App = new Agile();
```
It can be seen as the store of our application, because each `Agile Sub Instance` (ASI)
gets indirectly stored and managed by it.
The `Agile Class` doesn't really hold these ASI's, only 
the ASI's have a reference to the `Agile Class`.
Agile Sub Instances (ASI) can be:

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
In summary, the main tasks of an instantiated `Agile Class` (Agile Instance) are to
- manage and store Agile Sub Instances ([State](./features/state/Introduction.md), ..)
- ingest changes into the Runtime
- trigger rerender on Integrations like [React](../react/Introduction.md)
- permanently save values in any [Storage](./features/storage/Introduction.md) 

Be aware that each application using AgileTs should only have one `Agile Instance`.

## 📭 Props

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

### `logConfig`

The `logConfig` is thought to configure the Logger of AgileTs.
The Agile Logger simply logs important events in the console, like warnings or errors,
but it also logs runtime events if this is desired.
So for instance here we can configure if we want to log all messages or 
only warnings. 
```ts
const App = new Agile({
  logConfig: {
    level: Logger.level.ERROR, // print only errors
    active: true,
  },
});
```
To find out more about possible configuration options, checkout the [CreateLoggerConfigInterface](../../../../Interfaces.md#createloggerconfig).


### `localStorage`

Defines whether AgileTs creates an interface to the `localStorage` for us.
If we have decided to use the local storage, each Agile Sub Instance we
persist, gets stored into the `localStorage` by default.
```ts
const App = new Agile({
  localStorage: false // default true
});
```
Of course, we aren't limited to the `localStorage`. 
We are able to create an Interface to any [Storage](../storage/Introduction.md) we want.
For instance is this necessary in the Mobile Environment, because there
the `localStorage` doesn't exists. With `App.registerStorage()` we can register our own [Storage](../storage/Introduction.md).

### `waitForMount`

With this flag we can determine 
whether AgileTs should wait until unmounted 
components are mounted before rerendering them.
```ts
const App = new Agile({
  waitForMount: false // default true
});
```


## 🟦 Typescript

The `Agile Class` is almost 100% typesafe.

## 🗺 Where to instantiate?

We can instantiate the Agile Instance of our application where ever we want.
Directly in our Component, in a separate file or on paper.
It doesn't matter as long as we can work with it.
There are a few [Style Guides](../../../../main/StyleGuide.md) which might help us with such hard decision.