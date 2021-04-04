---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/computed/methods
---

:::info

Here are valuable methods of the `Computed Class` listed,
which aren't directly related to the [`State Class`](../state/Introduction.md).

The Computed is an extension of the [`State Class`](../state/Introduction.md)
and offers the same methods and properties as a normal State.
These State related methods aren't described in this Section.
To find out more about specific State methods,
checkout the [State docs](../state/Introduction.md).

:::

## `recompute()`

Recomputes the value of the `Computed Class`.
```ts {2}
const MY_COMPUTED = App.createComputed(() => {
    console.log('Called Recompute');
});
MY_COMPUTED.recompute(); // console: Called Recompute
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `config`             | [RecomputeConfigInterface](../../../../Interfaces.md#recomputeconfig)             | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Computed
```
Returns the [Computed](./Introduction.md) it was called on.



<br />

---

<br />



## `updateComputeFunction()`

Updates the `computeFunction` of the Computed Class. 
```ts {6-7}
const MY_COMPUTED = App.createComputed(() => {
    return `I am '${MY_NAME.value}'`;
});
MY_COMPUTED.value; // Returns "I am 'jeff'"
MY_COMPUTED.updateComputeFunction(() => {
    return `Hello there, I am '${MY_NAME.value}'`;
});
MY_COMPUTED.value; // Returns "Hello there, I am 'jeff'"
```
Besides, updating the `computeFunction`, 
it automatically detects the new dependencies of the `computeFunction` and updates them in the Computed Class.
Therefore, we can also pass a new array of hard coded dependencies, which overwrites the old hard coded deps by default.
```ts {3}
const MY_COMPUTED = App.createComputed(() => {
    return `I am '${MY_NAME.value}'`;
}, [/* hard coded deps */]);
```

### 📭 Props

| Prop                 | Type                                                                                  | Default    | Description                                                                                   | Required |
|----------------------|---------------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `computeFunction`    | () => ComputedValueType                                                               | undefined  | New function for computing the value                                                          | Yes      |
| `deps`               | Array<State \| Collection \| Observer>                                                | []         | New hard coded dependencies of the Computed Class                                             | Yes      |
| `config`             | [UpdateComputeFunctionConfig](../../../../Interfaces.md#updatecomputefunctionconfig)  | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Computed
```
Returns the [Computed](./Introduction.md) it was called on.



<br />

---

<br />



## `updateComputeFunction()`

Computes the `value` of the Computed Class with help of the `computeFunction`.
```ts {2}
MY_COMPUTED.computeFunction = () => `My name is '${MY_NAME.value}'`;
MY_COMPUTED.compute(); // Returns "My name is 'jeff'"
MY_COMPUTED.deps; // Returns '[Observer(MY_NAME)]'
```
Besides computing the `value`, it takes care of the automatic detection of dependencies.

### 📭 Props

| Prop                 | Type                                                                                  | Default    | Description                                                                                   | Required |
|----------------------|---------------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `config`             | [UpdateComputeFunctionConfig](../../../../Interfaces.md#updatecomputefunctionconfig)  | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
ComputedValueType
```