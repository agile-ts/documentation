---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/collection/properties
---

:::info

Here useful properties of the `State` are listed.

:::

## `agileInstance`
Returns the Agile Instance to which the Collection belongs.
Be aware that it gets in function share returned.
```ts
MY_STATE.agileInstance(); // Returns a Agile Instance
```
The reason for that is to avoid endless deep classes.

## `key`
Returns the current Key/Name of the Collection.
A Key is used to uniquely identify the Collection. 
Besides getting the key, we can also assign a new Key with this property.
```ts
MY_COLLECTION.key = "myCoolCollection";
MY_COLLECTION.key; // Returns 'myCoolCollection'
```

## `size`
Returns the current size of the Collection, 
so how many Items are stored in the Collection 
to this point in time.
```ts {3}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.collect({id: 5, name: "frank"});
MY_COLLECTION.size; // Returns 2
```

## `data`
Here all Items of the Collection are stored.
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
or the `default Group`,
```ts
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).items; // Returns (see below)
// [
//   Item({id: 1, name: "jeff"}),
//   Item({id: 5, name: "frank"})
// ]
```
because the `data` property should only be used internal!
