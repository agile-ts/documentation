---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/state/methods
---

:::info

Here all methods of the `Agile Instance` are described.

:::

## `setKey`

Assigns a new Key/Name to the State.
It is recommended that each State has its own unique Key, 
because it helps us during debug sessions or if we persist our State,
we don't have to define a separate Key.
```ts
MY_STATE.setKey("newKey"); // ◀️
MY_STATE.key; // Returns 'newKey'
```

### 📭 Props

| Prop           | Type                             | Default    | Description                                           | Required |
|----------------|----------------------------------|------------|-------------------------------------------------------|----------|
| `value`        | string \| number \| undefined      | undefined  | New Key/Name of State                                 | Yes      |

### 📄 Return
Returns the [State](../state/Introduction.md) it was called on.



<br />

---

<br />



## `set`

Allows us to mutate the State Value.
```ts
MY_STATE.set("myNewValue"); // ◀️
MY_STATE.value; // Returns 'myNewValue'
```
After having called the `set` method, the State gets ingested into the Runtime.
Trough the Runtime the new Value gets applied to the State and ensured that each Component that has bound the State to itself rerender.

Beside the value that gets applied to the State, we are also able to pass a `config` object. <br />
To give you a taste what you can configure with it.. here are some examples:
- `force` <br />
  Forces State changes no matter what happens.
   ```ts
    // Doesn't get ingested into the Runtime, because the State Value hasn't changed
    MY_STATE.set("myNewValue");
    // Gets ingested into the Runtime
    MY_STATE.set("myNewValue", {force: true});
   ```

- `background` <br />
  Changes State Value in the background.
  So that it doesn't cause a rerender on Components that have bound the State to itself.
  ```ts
  // Causes rerender on Components it is bound to
  MY_STATE.set("myNewValue2");
  // Doesn't cause rerender on Comonents it is bound to
  MY_STATE.set("myNewValue3", {background: true});
  ```

- `overwrite` <br />
  Overwrites the whole State with the new Value.
   ```ts
   MY_STATE.set("finalValue", {overwrite: true});
   MY_STATE.value; // Returns 'finalValue'
   MY_STATE.previousStateValue; // Returns 'finalValue'
   MY_STATE.initialStateValue; // Returns 'finalValue'
   ```
  
- ...To find out more about `set` configuration options checkout the [StateRuntimeJobConfigInterface](../../../../Interfaces.md#stateruntimejobconfig).

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `value`        | ValueType = any                                                                     | undefined  | New State Value                                       | Yes      |
| `config`       | [StateRuntimeJobConfigInterface](../../../../Interfaces.md#stateruntimejobconfig)   | {}         | Configuration                                         | False    |

### 📄 Return
Returns the [State](../state/Introduction.md) it was called on.



<br />

---

<br />



## `ingest`

## `type`
Force State to only allow mutations of the provided type. 
This is different from Typescript as it enforces the type at runtime.
```ts
MY_STATE.type(String); // ◀️
MY_STATE.set(1); // Error
MY_STATE.set("hi"); // Success
```
The type function takes in the JS constructor for that type, possible options are:
```ts
Boolean, String, Object, Array, Number
```

## `undo`
Undoes latest State Value change.
```ts
MY_STATE.set("hi"); // State Value is 'hi'
MY_STATE.set("bye"); // State Value is 'bye'
MY_STATE.undo(); // ◀️ State Value is 'hi' 
```

## `reset`
Resets the State to it's initial Value.
```ts
const MY_STATE = App.createState("hi"); // State Value is 'hi'
MY_STATE.set("bye"); // State Value is 'bye'
MY_STATE.set("hello"); // State Value is 'hello'
MY_STATE.reset(); // ◀️ State Value is 'hi' 
```

## `patch`

:::info

Only relevant for States with an Object type Value!

:::

Merges passed Object into the State Value. 
This happens at the top-level.
```ts
const MY_STATE = App.createState({id: 1, name: "frank"}); // State Value is {id: 1, name: "frank"}
MY_STATE.patch({name: "jeff"}); // State Value is {id: 1, name: "jeff"}

const MY_STATE_2 = App.createState(1);
MY_STATE.patch({hello: "there"}); // Error
```

## `watch`

Callback Functions that will be fired if the State mutates.
```ts
MY_STATE.watch((value) => {
  // do something
});
```
We recommend giving each `watcher` callback a unique key to properly identify it later.
```ts
`MY_STATE.watch("myKey", (value) => {
  // do something
});`
```
For instance if we want to remove the `watcher` callback a key is required.

## `removeWatcher`

Removes `watcher` callback at a specific key.
```ts
MY_STATE.removeWatcher("myKey");
```

## `hasWatcher`

Checks if a `watcher` callback exists at a specific key
```
MY_STATE.watch("myKey", (value) => {
  // do something
});
MY_STATE.hasWatcher("myKey"); // true
```

## `onInaugurated`

Behaves like a watcher function that destroys itself,
after the State Value got for the first time assigned.
So it gets only called once, when the State got its value.

## `persist`

Persists value into a Storage.

## `onLoad`

Gets called whenever the persisted value got loaded into the State

## `copy`

Creates a fresh copy without any references from the State.
```ts
const MY_STATE = App.createState([1, 2, 3]);

MY_STATE.copy(); // Returns [1, 2, 3] without any reference to the orginal Value
```

## `exists`

Checks if the State exists. 

## `is`

Checks if the State Value is equal to a specific value.
Equivalent to `===`.
```ts
const MY_STATE = App.createState("hi");

MY_STATE.is("bye"); // Returns false
MY_STATE.is("hi"); // Returns true
```

## `isNot`

Checks if the State Value isn't equal to a specific value.
Equivalent to `!==`.
```ts
const MY_STATE = App.createState("hi");

MY_STATE.isNot("bye"); // Returns true
MY_STATE.isNot("hi"); // Returns false
```

## `invert`

## `compute`

## `addSideEffect`

## `removeSideEffect`

## `hasSideEffect`

## `hasCorrectType`

## `getPublicValue`

## `getPersistableValue`
