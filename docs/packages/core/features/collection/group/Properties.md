---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/collection/group/properties
---

:::info

Here are valuable properties of the `Group Class` listed,
which aren't directly related to the [`State Class`](../../state/Introduction.md).

The Group is an extension of the [`State Class`](../../state/Introduction.md)
and offers the same methods and properties as a normal State.
These State related methods aren't described in this Section.
To find out more about specific State methods, 
checkout the [State docs](../../state/Introduction.md).

:::

## `output`

The `output` of a Group are the Item `values` to the primary Keys in the `value` property.
```ts {7,8}
const MY_COLLECTION = App.Collection({
   initialData: [{id: 1, name: 'jeff'}, {id: 2, name: 'frank'}, {id: 5, name: 'hans'}]
});

const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 5, 8]);
MY_GROUP.value; // Returns [1, 5, 8]
MY_GROUP.output; // Returns (see below)
// [{id: 1, name: 'jeff'}, {id: 5, name: 'hans'}]
```
Items that doesn't exist in the Collection, won't appear in the Group `output`.
:::warning

We don't recommend mutating the `output` property directly,
because the value change might be overwritten as soon as a related
Collection Item value mutates.

:::



<br />

---

<br />



## `items`

The `items` of a Group are the Items to the primary Keys in the `value` property.
```ts {7,8}
const MY_COLLECTION = App.Collection({
   initialData: [{id: 1, name: 'jeff'}, {id: 2, name: 'frank'}, {id: 5, name: 'hans'}]
});

const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 5, 8]);
MY_GROUP.value; // Returns [1, 5, 8]
MY_GROUP.items; // Returns (see below)
// [Item(1), Item(5)]
```
Items that doesn't exist in the Collection, won't appear in the Group `output`.
:::warning

We don't recommend mutating the `items` property directly,
because the Item change might be overwritten as soon as a related
Collection Item mutates.

:::



<br />

---

<br />



## `size`

Returns how many Items the Group represents.
```ts {3}
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 2, 3]);
MY_GROUP.size; // Returns '3'
```
