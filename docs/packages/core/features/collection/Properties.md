---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/collection/properties
---

:::info

Here are valuable properties of the `Collection Class` listed.

:::

## `agileInstance`

The [`agileInstance`](../agile-instance/Introduction.md) to which the Collection belongs.
```ts
MY_COLLECTION.agileInstance(); // Returns a Agile Instance
```
Be aware that the `agileInstance` property is of the type function,
to avoid endless deep classes.



<br />

---

<br />



## `key`

The current `key/name` of the Collection,
which is used to uniquely identify it.
```ts {2}
const MY_COLLECTION = App.createCollection({key: 'jeffKey'});
MY_COLLECTION.key; // Returns 'jeffKey'
```
Besides, accessing the `key`, we can also assign a new `key` through this property.
```ts {1}
MY_STATE.key = "myCoolState";
MY_STATE.key; // Returns 'myCoolState'
```



<br />

---

<br />



## `size`

Represents how many Items are currently stored in the Collection.
```ts {3}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.collect({id: 5, name: "frank"});
MY_COLLECTION.size; // Returns 2
```
Placeholder Items doesn't get counted.



<br />

---

<br />



## `data`

The `data` object holds all Items of the Collection.
```ts {3}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.collect({id: 5, name: "frank"});
MY_COLLECTION.data; // Returns (see below)
// {
//   1: Item({id: 1, name: "jeff"}),
//   5: Item({id: 5, name: "frank"})
// }
```
We do not recommend accessing the `data` object directly in your code,
as it is intended for internal use and shouldn't be used outside the AgileTs codebase.
The Collection provides all the methods to access the `data` object without further thinking.
For example, to get one specific Item, we should use the `getItem()` method.
```ts {1}
MY_COLLECTION.getItem(1); // Good pattern
MY_COLLECTION.data[1]; // Bad pattern
```



<br />

---

<br />



## `isPersisted`

If the Collection `value` is stored in an external Storage like the [Local Storage](https://developer.mozilla.org/de/docs/Web/API/Window/localStorage).
```ts {1,3}
MY_COLLECTION.isPersisted; // Returns 'false'
MY_COLLECTION.persist();
MY_COLLECTION.isPersisted; // Returns 'true' if the persist was successful
```



<br />

---

<br />



## `groups`

All [Groups](./group/Introduction.md) of the Collection are stored in the `groups` property.
```ts {3}
MY_COLLECTION.createGroup("group1", [1, 2, 3]);
MY_COLLECTION.createGroup("group2", [1, 7, 4]);
MY_COLLECTION.groups; // Returns (see below)
// {
//   group1: Group([1, 2, 3]),
//   group2: Group([1, 7, 4])
// }
```
We do not recommend accessing the `groups` object directly in your code,
as it is intended for internal use and shouldn't be used outside the AgileTs codebase.
The Collection provides all the methods to access the `groups` object without further thinking.
For example, to get one specific Group, we should use the `getGroup()` method.
```ts {1}
MY_COLLECTION.getGroup(1); // Good pattern
MY_COLLECTION.groups[1]; // Bad pattern
```



<br />

---

<br />



## `selectors`

All [Selectors](./selector/Introduction.md)  of the Collection are stored in the `selectors` property.
```ts {3}
MY_COLLECTION.createSelector("selector1", 1);
MY_COLLECTION.createSelector("selector2", 7);
MY_COLLECTION.selectors; // Returns (see below)
// {
//   selector1: Selector(1),
//   selector2: Selector(7)
// }
```
We do not recommend accessing the `selectors` object directly in your code,
as it is intended for internal use and shouldn't be used outside the AgileTs codebase.
The Collection provides all the methods to access the `selectors` object without further thinking.
For example, to get one specific Selector, we should use the `getSelector()` method.
```ts {1}
MY_COLLECTION.getSelector(1); // Good pattern
MY_COLLECTION.selector[1]; // Bad pattern
```

