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
Such a key is useful when debugging or persisting the State.
```ts
MY_STATE.setKey("newKey");
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
After having called the `set` method, the State gets ingested into the Runtime. 
Trough the Runtime the new Value gets applied to the State and it ensures that each Component that has bound the State to itself rerender.

```ts
MY_STATE.set("myNewValue");
MY_STATE.value; // Returns 'myNewValue'
```
Some `config` examples 🔽
```ts
// Doesn't get ingested into the Runtime, because State Value hasn't changed
MY_STATE.set("myNewValue");
// Gets ingested into the Runtime
MY_STATE.set("myNewValue", {force: true});

// Causes rerender on Components it is bound to
MY_STATE.set("myNewValue2");
// Doesn't cause rerender on Comonents it is bound to
MY_STATE.set("myNewValue3", {background: true});

// Overwrites whole State with new Value
MY_STATE.set("finalValue", {overwrite: true});
MY_STATE.value; // Returns 'finalValue'
MY_STATE.previousStateValue; // Returns 'finalValue'
MY_STATE.initialStateValue; // Returns 'finalValue'
```

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