---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/agile-instance
---

:::warning

WIP docs!

:::

The _Agile Instance_ is created with `new Agile()`and should be unique to our application.
```ts
const App = new Agile();
```
With an instantiated _Agile Instance_, we are able to create any Agile Sub Instances like
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

These Sub Instances created with the help of the `Agile Class` are automatically bound to it.
Because of the storing behaviour, the `Agile Class` can also be seen as a Store, 
that offers many features to mutate and work with the stored Instances.

## 📭 Props

`Agile` takes an optional configuration object as its only parameter.
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

The logConfig is thought to configure the Logger of AgileTs.
For instance, we can configure if we want to log all messages or 
only warnings. [Here](../../../../Interfaces.md#createloggerconfig) you can find all configuration options.
```ts
const App = new Agile({
  logConfig: {
    level: Logger.level.ERROR, // print only errors
    active: true,
  },
});
```


### `localStorage`

Defines whether we want to use the Local Storage as default Storage or not.
If we use the Local Storage each Agile Sub Instance we persist, gets stored in the Local Storage by default.
We aren't limited to the Local Storage, we can configure our own [Storage](../storage/Introduction.md). 
This is in a Mobile Environment necessary, because there the Local Storage doesn't exist.
With `App.registerStorage()` we can register our wished [Storage](../storage/Introduction.md).
```ts
const App = new Agile({
  localStorage: false // default true
});
```

### `waitForMount`

With `waitForMount` we define if AgileTs should wait
with causing rerender on an unmounted Component until it got mounted.
```ts
const App = new Agile({
  waitForMount: false // default true
});
```


## 🟦 Typescript

`Agile Class` is almost 100% typesafe.

## 🗺 Where to instantiate?

You can instantiate the Agile Instance where ever you want. 
Directly in your Component, in an extra File or on Paper. 
It doesn't matter as long as you can work with it.
There are a few [Style Guides](../../../../main/StyleGuide.md) where you can get some inspiration
how to structure an Application using AgileTs.