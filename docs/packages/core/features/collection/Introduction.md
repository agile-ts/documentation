---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/collection
---

:::warning

WIP docs!

:::

A Collection holds a set of Information that we need to remember at a later point in time.
It is designed for arrays of data objects following the same pattern.
Be aware that each collected Data needs an **unique primaryKey** to get properly identified later.
We instantiate a Collection with help of an [Agile Instance](../agile-instance/Introduction.md) here called `App`.
By doing this the Collection gets automatically bound to the Agile Instance it was created from.
```ts
const MY_COLLECTION = App.createCollection();
```
There is also a way to use the plain `Collection Class`,
but there we have to pass the `Agile Instance`, to which the Collection should get bound, beside the config.
```ts
const MY_COLLECTION = new Collection(App);
```
Both instantiations lead to the same result, but we recommend using the former way.
After we have successfully created our Collection, we can work with it dynamically and easily.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Add Item to Collection
MY_COLLECTION.remove(1).everywhere(); // Remove Item from Collection
MY_COLLECTION.persist(); // Persists Collection Value into a Storage
```
Most methods we use to modify, mutate and access the Collection are chainable.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}).persist().removeGroup('myGroup').reset();
```

## 🔹 Item

Each Data Object we add to our Collection, for example with the `collect` method,
gets transformed to an Item. This Item than gets stored in our Collection.
We can simply access each Item with the `getItem` method and the correct primary Key.
```ts
MY_COLLECTION.getItem(/* primary Key */); // Returns Item at the primary Key
```
The cool thing about Items is, they are an extension of the `State Class`.
This means that they have the same powerful tools like a State.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Collect Data
const myItem = MY_COLLECTION.getItem(1); // Returns Item at primaryKey '1'
myItem.value; // Returns '{id: 1, name: "jeff"}'
myItem.patch({name: "frank"}); // Update property 'name' in Item
myItem.undo(); // Undo latest change
```

## 👨‍👧‍👦 [Group](./group/Introduction.md)

Often applications need to categorize and preserve ordering of structured data and
in AgileTs Groups are the right way to reach this goal. They allow us to
cluster together data from a Collection as an array of primary Keys.
```ts
MY_COLLECTION.createGroup("groupName", [/*initial Items*/]);
```
We might use a Group, if we want to have an array of 'Today Todos' from
a Todo Collection or Posts that belong to the logged-in User from the Post Collection.
```ts
USERS.collect(user);
POSTS.collect(user.posts, user.id);
```
Here we have two Collections, one for users and another for posts. 
We can collect posts specific to a user and group them automatically by the user's id.

In our Collection we are able to create as many Groups as we want, and the Collection won't lose
its redundant behaviour. This is due to the fact, that each Item gets stored in the Collection itself and not in the Group.
You can imagine a Group like an interface to the Collection Data.
```ts
MY_COLLECTION.createGroup("group1", [1, 2, 3]);
MY_COLLECTION.createGroup("group2", [2, 5, 8]);
MY_COLLECTION.createGroup("group5000", [1, 10, 500, 5]);
```
Also, a Group is an extension of the `State Class` and offers the same powerful features.
```ts
MY_STATE.undo(); // Undo latest change
MY_GROUP.reset(); // Reset Group to its intial Value
MY_STATE.persist(); // Persist Group Value into Storage
```
But be aware that the `value` might not be the output you expect.
```ts
MY_GROUP.value; // Returns '[8, 5, 30, 1]'
```
Because this property doesn't hold the Item Values, it contains the primary Keys the Group represents.
To get the Item Value to each primary Keys, just use the `output` property.
```ts
MY_GROUP.output; // Returns '[{ id: 8, name: 'jeff' }, ...]'
```

## 🔮 [Selector](./selector/Introduction.md)

Selectors allow us to _select_ one specific Item from our Collection.
```ts
MY_COLLECTION.createSelector("selectorName", /*to select Item Key*/);
```
We might use the Selector, if we want to select the 'current logged-in User' from our User Collection.
```ts
USERS.select(/* current logged-in userId */);
```
<br/>

A Selector is also able to select a not existing Item, then it holds
a reference to this Item. But be aware that the Value of the Selector is
`undefined` during this period of time, since AgileTs doesn't know your desired Item.
```ts
MY_SELECTOR.select("notExistingItem");
MY_SELECTOR.value; // Returns 'undefined' until it the Item got added to the Collection
```
A Selector is an extension of the State Class too and offers the same powerful features.
```ts
MY_SELECTOR.undo(); // Undo latest change
```
But be aware that by mutating the Selector Value we won't modify the
selected Item in the Collection. To do that we have to modify the Item directly.
```ts
MY_SELECTOR.item.set({id: 1, name: "jeff"});
```

## 📭 Props

There are two ways to configure our Collection:

- **1.** The plain _object_ way, where we configure everything in an object.
     Here we are limited in the creation of Groups and Selectors,
     because we can't create them on our own. The Collection takes care of it instead,
     which limits us in configuring these Instances.
     ```ts
     const Collection = App.createCollection({
     key: 'dummyCollection',
     group: ["dummyGroup"]
     })
     ```

- **2.** The _function_ way, where we configure everything in an object too.
     But this time the object has to be returned by a function, which has the collection as its only parameter.
     By approaching the collection, we are able to create Groups and Selectors on our own, which
     gives us more freedom in configuring these Instances.
     ```ts
     const Collection = App.createCollection((collection) => ({
     key: 'dummyCollection',
     group: {
        dummyGroup: collection.Group(["item1", "item2"])
      }
     }))
     ```

Here is a Typescript Interface of the configuration Object for quick reference, 
however each property will be explained in more detail below.
```ts
export interface CreateCollectionConfigInterface<DataType = DefaultItem> {
  groups?: { [key: string]: Group<any> } | string[];
  selectors?: { [key: string]: Selector<any> } | string[];
  key?: CollectionKey;
  primaryKey?: string;
  defaultGroupKey?: GroupKey;
  initialData?: Array<DataType>;
}
```


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