---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/collection
---

:::warning

WIP docs!

:::

A Collection holds a set of Information that you need to remember at a later point in time.
It is designed for arrays of data following the same structure.
We instantiate a Collection with help of an [Agile Instance](../packages/core/features/agile-instance) here called `App`.
By doing this the Collection gets automatically bound to the Agile Instance it was created from.
```ts
const MY_COLLECTION = App.createCollection();
```
There is also a way to use the plain `Collection Class`,
but there we have to pass the `Agile Instance`, to which the State should get bound, beside the initial Value and config.
```ts
const MY_COLLECTION = new Collection(App);
```
Both instantiations lead to the same result, but we recommend the former way.
After we have successfully created our Collection, we can dynamically manipulate and work with it.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Add Item to Collection
MY_COLLECTION.remove(1).everywhere(); // Remove Item from everywhere
MY_COLLECTION.persist(); // Persists Collection Value into the Storage
```
Each Item is an extension of the State, 
so we have the same powerful features like a State has here too.
```ts
const myItem = MY_COLLECTION.getItem(1); // Returns Item
myItem.patch({name: "frank"}); // Update property 'name' in Item
```
Most methods we use to modify, mutate and access the Collection are chainable.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}).persist().removeGroup('myGroup').reset();
```

## 👨‍👧‍👦 Group

Often applications need to categorize and preserve ordering of structured data and
in AgileTs Groups are the cleanest way to reach this goal. They allow us to
cluster together data from a Collection as an array of primary Keys.
We might use a Group, if we want to have an array of 'Today Todos' from
a Todo Collection or Posts that belong to the logged-in User from the Post Collection.
```ts
MY_COLLECTION.createGroup("groupName", [/*initial Items*/]);
```
We are able to create as many Groups as we want, and the Collection won't lose
its redundant behaviour, since the Items are still stored in the Collection, and
the Groups are only like an interface to it.
```ts
MY_COLLECTION.createGroup("group1", [1, 2, 3]);
MY_COLLECTION.createGroup("group2", [2, 5, 8]);
MY_COLLECTION.createGroup("group5000", [1, 10, 500, 5]);
```
A Group is an extension of the State and has the same powerful features.
```ts
MY_STATE.undo(); // Undo latest change
MY_GROUP.reset(); // Reset Group to its intial Value
MY_STATE.persist(); // Persist Group Value into Storage
```
But be aware that the `value` might not be the output you expect.
```ts
MY_GROUP.value; // Returns '[8, 5, 30, 1]'
```
It holds the primary Keys of the Items the Group represent.
To get the right value to the primary Keys just use `output` property.
```ts
MY_GROUP.output; // Returns '[{ id: 8, name: 'jeff' }, ...]'
```

## 🔮 Selector

Selectors allow us to _select_ an Item from a Collection. 
We might use the Selector, if we want to select a 'current User' from our User Collection or
the 'current viewing Post' from our Post Collection.
```ts
MY_COLLECTION.createGroup("selectorName", /*to select Item Key*/);
```
A Selector is an extension of the State and has the same powerful features.
```ts
MY_STATE.undo(); // Undo latest change
```
But be aware that by mutating the Selector we won't modify the
selected Item in the Collection. To do that we have to modify the Item directly.
```ts
MY_SELECTOR.item.set({id: 1, name: "jeff"});
```

## 📭 Props


## 🟦 Typescript

`Collection` is almost 100% typesafe and takes an optional generic type for type safety.
```ts
interface UserInterface {
    id: number,
    name: string
}
const MY_COLLECTION = App.createState<UserInterface>();
MY_COLLECTION.collect({id: "invalidType", animal: "Lion"}); // Error
MY_COLLECTION.collect({id: 1, name: "hans"}); // Success
```