---
id: introduction
title: State
sidebar_label: Introduction
slug: /core/state
---

A `State` provides a _piece_ of Information that we need to remember globally at a later point in time.
While providing a toolkit to use and mutate this Information.
States are the foundation of AgileTs. Almost everything depends on States or extends its functionalities.
For example, a [Collection](../collection/Introduction.md) is a dynamic set of States.
We instantiate a State with help of an instantiated [Agile Instance](../agile-instance/Introduction.md) often called `App`.
By doing so, the State is automatically bound to the Agile Instance it was created from.
```ts
const MY_STATE = App.createState("Hello World");
```
After a successful instantiation, we can dynamically and easily manipulate its value.
```ts
MY_STATE.set("Hello There"); // Set State Value to "Hello There"
MY_STATE.undo(); // Undo latest change (-> Value is now "Hello World" again)
MY_STATE.is("Hello World"); // Check if State has a specific Value
MY_STATE.persist(); // Persist State Value into any Storage
```
If you want to find out more about the State's specific methods, check out the [Methods](./Methods.md) Section.
Most methods we use to modify, mutate and access the State are chainable.
```ts
MY_STATE.undo().set("Hello Hell").watch(() => {}).reset().invert().persist().type(String);
```


### 🔨 Use case
We might use a State to remember the active theme of our application,
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

The first `value` assigned to the State.
```ts {1}
const MY_STATE = App.createState("hello there");
MY_STATE.value; // Returns 'hello there'
```
Later we can access the initial value with the `initialStateValue` property.
```ts
MY_STATE.initialStateValue; // Returns 'hello there'
```

### `config`

Beside the initial value a `State` takes an optional configuration object.
```ts
App.createState("myInitialValue", {
    key: "myKey",
    dependents: [MY_STATE_2]
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

The optional property `key/name` should be a unique `string/number` to identify the State later.
```ts
App.createState("myInitialValue", {
    key: "myKey"
});
```
We recommend giving each State a unique `key` since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the State
- no need for separate persist Key

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | No       |

<br/>

#### `dependents`

:::warning

This property is mainly thought for the internal use.

:::

Specifies which States depend on this State.
```ts
App.createState("myInitialValue", {
    dependents: [MY_STATE_2]
});
```
So if this State mutes and is ingested into the `runtime`,
the depending States are ingested into the `runtime` too.

| Type              | Default     | Required |
|-------------------|-------------|----------|
| `Array<Observer>` | []          | No       |

<br/>

#### `isPlaceholder`

:::warning

This property is mainly thought for the internal use.

:::

Defines whether the State is a `placeholder`.
```ts
const MY_STATE = App.createState("myInitialValue", {
    isPlaceholder: true
});

MY_STATE.exists(); // false
```
States are, for example, `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | false       | No       |


## 🟦 Typescript

The `State Class` is almost 100% typesafe and takes an optional generic type for type safety of its `value`.
```ts {1}
const MY_STATE = App.createState<string>("Hello World");
MY_STATE.set(1); // Error
MY_STATE.set("hello space"); // Success
```
Javascript users can also get rudimentary type safety with the `type()` method.
```ts
MY_STATE.type(String); // Now State only accept State Values
```
Be aware that the `type()` method currently only supports primitive types and does its type check at `runtime`.