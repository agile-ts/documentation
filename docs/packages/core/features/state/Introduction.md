---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/state
---

:::warning

WIP docs!

:::

A State holds an Information that you need to remember at a later point in time.
It is the foundation of AgileTs, nearly everything is based or depends on the functionality of States.
We instantiate a State with help of an [Agile Instance](../packages/core/features/agile-instance) here called `App`.
There are two ways to create a State. 
The first way is to use the `createState` function in the `Agile Instance`, 
where it automatically gets added to the `Agile Instance` it was created from.
```ts
const MY_STATE = App.createState("Hello World");
```
The second way is to use the `State Class` 
and pass the `Agile Instance`, to which it should get added, beside the initial Value into it.
```ts
const MY_STATE = new State(App, "Hello World");
```
After the instantiation the State can be dynamically and easily manipulated.
```ts
MY_STATE.set("Hello There"); // Set State Value to "Hello There"
MY_STATE.undo(); // Undo latest change
MY_STATE.is("Hello World"); // Check if State has a specific Value
MY_STATE.persist(); // Persist State Value into Storage
```
Most Methods to modify, mutate and access the State Value are chainable
```ts
MY_STATE.undo().set("Hello Hell").watch(() => {}).reset().invert().persist().type(String);
```

## 📭 Props

`State` takes, beside the initial value an optional configuration object.
```ts
const MY_STATE = App.createState("myInitialValue", {
    key: "myKey"
});
```
Here is a Typescript Interface for quick reference, however
each property will be explained in more detail below.
```ts
export interface StateConfigInterface {
    key?: StateKey;
    dependents?: Array<Observer>;
    isPlaceholder?: boolean;
}
```

### `key`

### `dependents`

### `isPlaceholder`


## 🟦 Typescript

`State` is almost 100% typesafe and takes an optional generic type for type safety.
```ts
const MY_STATE = App.createState<string>("Hello World");
```
This type defines the type of the State Value.
Javascript users can also get rudimentary typesafe, with the `type` function.
```ts
MY_STATE.type(String); // Now State only accept State Values
```
Be aware that currently only primitive types are supported.