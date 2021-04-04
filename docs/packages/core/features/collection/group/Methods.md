---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/collection/group/methods
---

:::info

Here are valuable methods of the `Group Class` listed,
which aren't directly related to the [`State Class`](../../state/Introduction.md).

The Group is an extension of the [`State Class`](../../state/Introduction.md)
and offers the same methods and properties as a normal State.
These State related methods aren't described in this Section.
To find out more about specific State methods, 
checkout the [State docs](../../state/Introduction.md).

:::

## `has()`

Checks if the Group value contains one specific Item at `itemKey`.
```ts {2,3}
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 2, 3]);
MY_GROUP.has(1); // Returns 'true'
MY_GROUP.has(99); // Returns 'false'
```

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `remove()`

With `remove()` we can remove a certain Item from the Group.
```ts {2}
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 2, 3]);
MY_GROUP.remove(1);
MY_GROUP.value; // Returns '[2, 3]'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKeys`           | number \| string | Array<number \| string\>                                       | undefined  | itemKey/s that get removed                                                                    | Yes      |
| `config`             | [StateIngestConfig](../../../../../Interfaces.md#stateingestconfig)               | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Group
```
Returns the [Group](./Introduction.md) it was called on.



<br />

---

<br />



## `add()`

We use the `add()` method to add `itemKey/s` to the Group.
```ts {2}
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 2, 3]);
MY_GROUP.add(7);
MY_GROUP.value; // Returns '[1, 2, 3, 7]'
```
By default, the `itemKey` will be added at the end of Group value array.
We can configure this behavior by changing the `method` property in the configuration object.
```ts 
MY_GROUP.add(9, {method: 'unshift'});
MY_GROUP.value; // Returns '[9, 1, 2, 3, 7]'
```

### 🌎 Existing itemKey
In case we add an already existing `itemKey`,
the existing `itemKey` won't be overwritten by default.
```ts {3}
MY_GROUP.add(2); 
MY_GROUP.value; // Returns '[9, 1, 2, 3, 7]'
MY_GROUP.add(2, {overwrite: true}); 
MY_GROUP.value; // Returns '[9, 1, 3, 7, 2]'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKeys`           | number \| string | Array<number \| string\>                                       | undefined  | itemKey/s that get added                                                                    | Yes      |
| `config`             | [GroupAddConfigInterface](../../../../../Interfaces.md#groupaddconfig)            | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Group
```
Returns the [Group](./Introduction.md) it was called on.



<br />

---

<br />



## `replace()`

Replaces existing `itemKey` with a new `itemKey`.
```ts {2}
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 2, 3]);
MY_GROUP.replace(2, 10);
MY_GROUP.value; // Returns '[1, 10, 3]'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `oldItemKey`         | number \| string                                                                  | undefined  | Old ItemKey                                                                                   | Yes      |
| `newItemKey`         | number \| string                                                                  | undefined  | Old ItemKey                                                                                   | Yes      |
| `config`             | [StateRuntimeJobConfig](../../../../../Interfaces.md#stateruntimejobconfig)       | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Group
```
Returns the [Group](./Introduction.md) it was called on.



<br />

---

<br />



## `rebuild()`

:::warning

This function is mainly thought for internal use.

:::

Rebuilds the `output` of the Group.

### 📄 Return

```ts
Group
```
Returns the [Group](./Introduction.md) it was called on.
