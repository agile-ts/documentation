---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/collection/selector/methods
---

:::info

Here are valuable methods of the `Selector Class` listed,
which aren't directly related to the [`State Class`](../../state/Introduction.md).

The Selector is an extension of the [`State Class`](../../state/Introduction.md)
and offers the same methods and properties as a normal State.
These State related methods aren't described in this Section.
To find out more about specific State methods, 
checkout the [State docs](../../state/Introduction.md).

:::

## `select()`

With `select()` we can update the selected Item of Selector.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.select(2);
MY_SELECTOR.itemKey; // Returns '2'
MY_SELECTOR.item; // Returns 'Item(2)'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKey`            | number \| string                                                                  | undefined  | newly selected itemKey                                                                        | Yes      |
| `config`             | [StateRuntimeJobConfig](../../../../../Interfaces.md#stateruntimejobconfig)       | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Selector
```
Returns the [Selector](./Introduction.md) it was called on.



<br />

---

<br />



## `unselect()`

Unselects the current Item the Selector represents.
```ts {3}
const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.itemKey; // Returns '1'
MY_SELECTOR.item; // Returns 'Item(1)'
MY_SELECTOR.unselect();
MY_SELECTOR.itemKey; // Returns 'undefined'
MY_SELECTOR.item; // Retruns 'undefined'
```
Therefore, it does set the `itemKey` and `item` property to `undefined`
and doesn't represent any specific Item anymore.

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `config`             | [StateRuntimeJobConfig](../../../../../Interfaces.md#stateruntimejobconfig)       | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Selector
```
Returns the [Selector](./Introduction.md) it was called on.



<br />

---

<br />



## `hasSelected()`

Checks if the Selector represents one specific Item at the passed `itemKey`.
```ts {2,3}
const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.hasSelected(2); // Returns 'false'
MY_SELECTOR.hasSelected(1); // Returns 'true'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKey`            | number \| string                                                                  | undefined  | ItemKey                                                                                       | Yes      |

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `rebuild()`

:::warning

This function is mainly thought for internal use.

:::

Rebuilds the Selector `value`.

### 📄 Return

```ts
Group
```
Returns the [Group](./Introduction.md) it was called on.
