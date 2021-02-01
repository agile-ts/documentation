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
It is recommended that each State has its unique Key, 
because it helps us during debug sessions or if we persist our State,
we don't have to pass a separate Key.
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

## `reset`

## `patch`

## `watch`

## `removeWatcher`

## `hasWatcher`

## `onInaugurated`

## `persist`

## `onLoad`

## `copy`

## `exists`

## `is`

## `isNot`

## `isNot`

## `invert`

## `compute`

## `addSideEffect`

## `removeSideEffect`

## `hasSideEffect`

## `hasCorrectType`

## `getPublicValue`

## `getPersistableValue`