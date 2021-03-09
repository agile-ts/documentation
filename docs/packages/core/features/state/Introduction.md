---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/state
---

:::warning

WIP docs!

:::

A State holds Information we need to remember at a later point in time.
It is the foundation of AgileTs. Nearly everything is based or depends on the functionality of States.
For instance, a [Collection](../collection/Introduction.md) is a set of States.
We instantiate a State with help of an existing [Agile Instance](../agile-instance/Introduction.md) often called `App`.
By doing so, the State is automatically bound to the Agile Instance it was created from.
```ts
const MY_STATE = App.createState("Hello World");
```
The first property of `createState()` is the initial value of the State.
After a successful instantiation,
we can start working with the State.
```ts
MY_STATE.set("Hello There"); // Set State Value to "Hello There"
MY_STATE.undo(); // Undo latest change
MY_STATE.is("Hello World"); // Check if State has a specific Value
MY_STATE.persist(); // Persist State Value into a Storage
```
If you want to find out more about specific methods of the State, checkout the [Methods](./Methods.md) Section.
Most methods we use to modify, mutate and access the State are chainable.
```ts
MY_STATE.undo().set("Hello Hell").watch(() => {}).reset().invert().persist().type(String);
```

### 🔨 Usage
We might use a State, if we want to remember the active theme of our application,
or the userId of the  current logged-in User.
```ts
const THEME_TYPE = App.createState("dark");
// <- toggled theme switch
THEME_TYPE.set("light");
```
In the above example, we create a `THEME_TYPE` State with the initial value "dark".
After toggling the theme switch, we update the `THEME_TYPE` to "light".

### ⛳️ Sandbox
Test the State yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)

## 📭 Props

```ts
App.createState(initialValue, config);
```

### `initialValue`

The first Value of the State.
```ts {1}
const MY_STATE = App.createState("hello there");
MY_STATE.value; // Returns 'hello there'
MY_STATE.initialStateValue; // Returns 'hello there'
```
Later we can get access to that value with `.initialValue`
```ts
MY_STATE.intialValue;
```

### `config`

Beside the initial value a `State` takes an optional configuration object.
```ts
const MY_STATE = App.createState("myInitialValue", {
    key: "myKey",
    dpendents: [MY_STATE_2]
});
```
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface StateConfigInterface {
    key?: StateKey;
    dependents?: Array<Observer>;
    isPlaceholder?: boolean;
}
```

<br/>

#### `key`
The key/name is an optional property that serves to identify a State later.
A key is pretty useful during debug sessions or if we persist our State.
Then, it automatically uses the `key` as persist-key, and we don't have to pass a separate key.
We recommend giving each State a unique `key`, since it has only advantages.
```ts
const MY_STATE = App.createState("myInitialValue", {
    key: "myKey"
});
```

<br/>

#### `dependents`

:::info

Mainly used internally and has properly no use for you.

:::

It defines which States depend on our State.
This means if our State gets mutated and ingested into the `runtime`,
the depending States will also be ingested into the `runtime`.
```ts
const MY_STATE = App.createState("myInitialValue", {
    dependents: [MY_STATE_2]
});
```

<br/>

#### `isPlaceholder`

:::info

Mainly used internally and has properly no use for you.

:::

With `isPlaceholder` we tell our State that it's a placeholder.
Often States are placeholder when AgileTs needs to hold a reference to it, 
although the State hasn't been instantiated yet.
```ts
const MY_STATE = App.createState("myInitialValue", {
    isPlaceholder: true
});

MY_STATE.exists(); // false
```

## 🟦 Typescript

The `State Class` is almost 100% typesafe and takes an optional generic type for type safety of its `value`.
```ts {1}
const MY_STATE = App.createState<string>("Hello World");
MY_STATE.set(1); // Error
MY_STATE.set("hello space"); // Success
```
Javascript users can also get rudimentary type safety with the `type` function.
```ts
MY_STATE.type(String); // Now State only accept State Values
```
Be aware that the `type` function currently only supports primitive types and does its type check at `runtime`.
