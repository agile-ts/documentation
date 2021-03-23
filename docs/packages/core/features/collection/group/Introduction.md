---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/collection/group
---

:::warning

WIP docs!

:::

A Group categorizes and preserves the ordering of structured data in a Collection.
They allow us to cluster together data from a Collection as an array of `primary Keys`.
A Group doesn't store the actual Items. It only keeps track of the `primary Keys`
and retrieves the fitting Items from the Collection later when needed.
```ts
// The actual Collection
Collection
data -> [Item('id1'), Item('id2'), Item('id10'), Item('id7'), Item('id5')]

// Group one which represetns the Collection in a specific order
Group1
value  ->  ['id1', 'id5', 'id7']
output ->  [Item('id1'), Item('id5'), Item('id7')]

// Group two which represetns the Collection in another specific order
Group2
value  ->  ['id7', 'id1', 'id10']
output ->  [Item('id7'), Item('id1'), Item('id10')]
```
We instantiate a Group with the help of an existing [Collection](../Introduction.md).
By doing so, the Group is automatically bound to the Collection it was created from
and has access to its data.
A Group can be created during the creation of a Collection in the configuration object.
```ts {3}
const MY_COLLECTION = new Collection((collection) =>({
    groups: {
        groupName: collection.Group([/*initial Items*/])
    }
}));

// or with the name
const MY_COLLECTION_2 = new Collection({
    groups: ['groupName']
})
```
Or dynamically, after the Collection has been defined.
```ts
const MY_GROUP = MY_COLLECTION.createGroup("groupName", [/*initial Items*/]);
```
The Collection can have as many Groups as we want and won't lose its redundant behavior.
This is due to the fact that each Item is stored in the Collection itself and not in the Group.
You can imagine a Group like an interface to the Collection Data.
```ts
MY_COLLECTION.createGroup("group1", [1, 2, 3]);
MY_COLLECTION.createGroup("group2", [2, 5, 8]);
MY_COLLECTION.createGroup("group5000", [1, 10, 500, 5]);
```
The cool thing about Groups is that they are an extension of the `State Class`
and offers the same powerful features.
```ts
MY_STATE.undo(); // Undo latest change
MY_GROUP.reset(); // Reset Group to its intial Value
MY_STATE.persist(); // Persist Group Value into Storage
```
But be aware that the `value` might not be the output you expect.
```ts
MY_GROUP.value; // Returns '[8, 5, 30, 1]'
```
In a Group, the `value` property manages the `primaryKeys` a Group represents.
To get the Item Value to each `primary Key`, we use the `output` property.
```ts
MY_GROUP.output; // Returns '[{ id: 8, name: 'jeff' }, ...]'
```


## 🔨 Use case
For instance, we can use a Group to cluster a Post Collection into User Posts of the logged-in user.
```ts
USERS.collect(user);
POSTS.collect(user.posts, user.id);
```
In the above code snippet, we have two Collections, one for users and another for posts.
We can collect posts specific to a user and group them automatically by the user's id.


## ⛳️ Sandbox
Test the Group yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-collection-uyi9g)
- Vue (coming soon)
- Angular (coming soon)


## 📭 Props

### `initialItems`
The first `itemKeys` assigned to the Group.
```ts {1}
const MY_GROUP = MY_COLLECTION.createGroup([1, 2, 3]);
MY_GROUP.value; // Returns '[1, 2, 3]'
```

### `config`

Beside the initial îtemKeys a `Collection` takes an optional configuration object.
```ts
const MY_GROUP = MY_COLLECTION.createGroup([1, 2, 3], {
    key: "myGroup",
});
```
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface GroupConfigInterface {
    key?: GroupKey;
    isPlaceholder?: boolean;
}
```

<br/>

#### `key`
The `key/name` is an optional property that is used to identify the Group later.
Such `key` is pretty useful during debug sessions or if we [persist](../../state/Methods.md#persist) our Group,
it automatically uses the Group `key` as persist key.
We recommend giving each Collection a unique `key`, since it has only advantages.
```ts
const MY_GROUP = MY_COLLECTION.createGroup([1, 2, 3], {
    key: "myKey"
});
```

<br/>

#### `isPlaceholder`

:::warning

This property is mainly thought for internal use.

:::

With `isPlaceholder` we tell our Group that it's a placeholder.
Often Groups are `placeholder` when AgileTs needs to hold a reference to it,
although the Group doesn't official exists and hasn't been instantiated yet.
```ts
const MY_STATE = App.createState("myInitialValue", {
    isPlaceholder: true
});

MY_STATE.exists(); // false
```


## 🟦 Typescript

The `Group Class` is almost 100% typesafe.
