---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/state
---

:::warning

WIP docs!

:::

A State holds an Information that we need to remember at a later point in time.
It is the foundation of AgileTs, nearly everything is based or depends on the functionality of States.
We instantiate a State with help of an [Agile Instance](../agile-instance/Introduction.md) here called `App`.
By doing this the State gets automatically bound to the Agile Instance it was created from.
```ts
const MY_STATE = App.createState("Hello World");
```
There is also a way to use the plain `State Class`,
but there we have to pass the `Agile Instance`, to which the State should get bound, beside the initial Value and config.
```ts
const MY_STATE = new State(App, "Hello World");
```
Both instantiations lead to the same result, but we recommend using the former way.
After we have successfully created our State, we can work with it dynamically and easily.
```ts
MY_STATE.set("Hello There"); // Set State Value to "Hello There"
MY_STATE.undo(); // Undo latest change
MY_STATE.is("Hello World"); // Check if State has a specific Value
MY_STATE.persist(); // Persist State Value into a Storage
```
Most methods we use to modify, mutate and access the State are chainable.
```ts
MY_STATE.undo().set("Hello Hell").watch(() => {}).reset().invert().persist().type(String);
```

## 📭 Props

`State` takes, beside the initial value an optional configuration object.
```ts
const MY_STATE = App.createState("myInitialValue", {
    key: "myKey",
    dpendents: [MY_STATE_2]
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
The Key/Name is an optional property, that gets used to identify a State.
This is pretty useful during debug sessions or if we persist a State,
where it automatically uses the `key` as persist key.
We recommend giving each State an unique `key`. It as only advantages.
```ts
const MY_STATE = App.createState("myInitialValue", {
    key: "myKey"
});
```

### `dependents`

:::info

Gets mostly used internal and has properly no use for you.

:::

`Dependents` is used to detect States, that depend on this State.
This means if our State gets mutated and ingested into the Runtime,
the depending State gets also ingested into the Runtime.
```ts
const MY_STATE = App.createState("myInitialValue", {
    dependents: [MY_STATE_2]
});
```

### `isPlaceholder`

:::info

Gets mostly used internal and has properly no use for you.

:::

With `isPlaceholder` we define, that this State is a placeholder.
Mostly a State is a Placeholder if we want to hold a reference to a State that hasn't been instantiated yet.
```ts
const MY_STATE = App.createState("myInitialValue", {
    isPlaceholder: true
});

MY_STATE.exists(); // false
```

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
Be aware that the `type` function currently only supports primitive types.