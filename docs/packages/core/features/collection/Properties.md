---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/collection/properties
---

:::info

Here useful properties of the `Collection Class` are listed.

:::

## `agileInstance`
Agile Instance to which the Collection belongs
```ts
MY_STATE.agileInstance(); // Returns a Agile Instance
```
Note that it is stored as a function in the Collection, to avoid endless deep classes.



<br />

---

<br />



## `key`
Current key/name of the Collection.
It is used to uniquely identify the Collection.
Besides getting the `key`, we can also assign a new `key` with help of this property.
```ts
MY_COLLECTION.key = "myCoolCollection";
MY_COLLECTION.key; // Returns 'myCoolCollection'
```



<br />

---

<br />



## `size`
How many Items are stored in the Collection right now.
```ts {3}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.collect({id: 5, name: "frank"});
MY_COLLECTION.size; // Returns 2
```
Be aware that placeholder Items doesn't get counted.



<br />

---

<br />



## `data`
All Items of the Collection are stored here.
```ts {3}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.collect({id: 5, name: "frank"});
MY_COLLECTION.data; // Returns (see below)
// {
//   1: Item({id: 1, name: "jeff"}),
//   5: Item({id: 5, name: "frank"})
// }
```
We recommend using the `getAllItems` function to get assess to all Items,
```ts {1}
MY_COLLECTION.getAllItems(); // Returns (see below)
// [
//   Item({id: 1, name: "jeff"}),
//   Item({id: 5, name: "frank"})
// ]
```
or the `default Group`.
```ts {1}
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).items; // Returns (see below)
// [
//   Item({id: 1, name: "jeff"}),
//   Item({id: 5, name: "frank"})
// ]
```
Because the `data` property isn't thought to be used in the outer world.



<br />

---

<br />



## `isPersisted`
If the State Value got successfully persisted into an external Storage like the [Local Storage](https://developer.mozilla.org/de/docs/Web/API/Window/localStorage).
```ts {1,3}
MY_COLLECTION.isPersisted; // Returns false
MY_COLLECTION.persist();
MY_COLLECTION.isPersisted; // Returns true (if the persisting was successfull)
```



<br />

---

<br />



## `groups`
Here all [Groups](./group/Introduction.md) of the Collection are stored.
```ts {3}
MY_COLLECTION.createGroup("group1", [1, 2, 3]);
MY_COLLECTION.createGroup("group2", [1, 7, 4]);
MY_COLLECTION.groups; // Returns (see below)
// {
//   group1: Group([1, 2, 3]),
//   group2: Group([1, 7, 4])
// }
```
If we want to get access to one specific Group, we should use
```ts
MY_COLLECTION.getGroup("group1");
```
instead of 
```ts
MY_COLLECTION.groups["group1"]
```



<br />

---

<br />



## `selectors`
Here all [Selectors](./selector/Introduction.md) of the Collection are stored.
```ts {3}
MY_COLLECTION.createGroup("selector1", 1);
MY_COLLECTION.createGroup("selector2", 7);
MY_COLLECTION.groups; // Returns (see below)
// {
//   selector1: Selector(1),
//   selector2: Selector(7)
// }
```
If we want to get access to one specific Selector, we should use
```ts
MY_COLLECTION.getSelector("selector1");
```
instead of
```ts
MY_COLLECTION.selectors["selector1"]
```

