---
id: introduction
title: Group
sidebar_label: Introduction
slug: /core/collection/group
---

A `Group` categorizes and preserves the ordering of structured data.
They allow us to cluster together data from a Collection as an array of `primary Keys`.
Note that a Group doesn't store the actual Items. It only keeps track of the `primary Keys`
and retrieves the fitting Items when needed.
```ts
// The actual Collection
Collection
data -> [Item('id1'), Item('id2'), Item('id10'), Item('id7'), Item('id5')]

// Group1 which represetns the Collection in a specific order
Group1
value  ->  ['id1', 'id5', 'id7']
output ->  [Item('id1'), Item('id5'), Item('id7')]

// Group2 which represetns the Collection in another specific order
Group2
value  ->  ['id7', 'id1', 'id10', 'id99']
output ->  [Item('id7'), Item('id1'), Item('id10'), Item('id99')]
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
});
```
Or dynamically, after the Collection has been instantiated.
```ts
const MY_GROUP = MY_COLLECTION.createGroup("groupName", [/*initial Items*/]);
```
A Collection can have as many Groups as we need and won't lose its redundant behavior.
This is due to the fact that each Item is stored in the Collection itself and not in the Group.
You can imagine a Group like an interface to the Collection Data.
```ts
MY_COLLECTION.createGroup("group1", [1, 2, 3]);
MY_COLLECTION.createGroup("group2", [2, 5, 8]);
MY_COLLECTION.createGroup("group5000", [1, 10, 500, 5]);
```
A Group is an extension of the `State Class` and offers the same powerful functionalities.
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
If you want to find out more about the Group's specific methods, check out the [Methods](./Methods.md) Section.
Most methods we use to modify, mutate and access the Group are chainable.
```ts
MY_GROUP.undo().add(1).watch(() => {}).reset().persist().undo().remove(1).replace(2, 3);
```

## 🍪 `default` Group
todo

## 🔨 Use case
For instance, we can use a Group to cluster a Post Collection into 'User Posts' of the different users.
```ts
USERS.collect([userA, userB]); // Add userA and userB to USERS Collection
POSTS.collect(userA.posts, userA.id); // Add userA Posts and cluster them by the UserA id
POSTS.collect(userB.posts, userB.id); // Add userB Posts and cluster them by the UserB id
POSTS.getGroup(userA.id).value; // Returns '[1, 2, 6]' (UserA Posts)
POSTS.getGroup(userB.id).value; // Returns '[3, 10, 20]' (UserB Posts)
POSTS.getGroup('default').value; // Returns '[1, 2, 3, 4, 5, 6, 10, ..]' (All Posts)
```
In the above code snippet, we have two Collections, one for users and another for posts.
We can collect posts specific to a user and automatically group them by the user's id.


## ⛳️ Sandbox
Test the Group yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-group-z5cnk)
- Vue (coming soon)
- Angular (coming soon)


## 📭 Props

### `initialItems`
The `itemKeys` of the Items that the Group represents.
```ts {1}
const MY_GROUP = MY_COLLECTION.createGroup([1, 2, 3]);
MY_GROUP.value; // Returns '[1, 2, 3]'
```

### `config`

Beside the initial `îtemKeys` a `Group` takes an optional configuration object.
```ts
MY_COLLECTION.createGroup([1, 2, 3], {
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
The optional property `key/name` should be a unique `string/number` to identify the Group later.
```ts
MY_COLLECTION.createGroup([1, 2, 3], {
    key: "myKey"
});
```
We recommend giving each Group a unique `key` since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Group
- no need for separate persist Key

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | No       |

<br/>

#### `isPlaceholder`

:::warning

This property is mainly thought for the internal use.

:::

Defines whether the Group is a `placeholder`.
```ts
const MY_GROUP = App.createGroup([1, 2, 3], {
    isPlaceholder: true
});

MY_GROUP.exists(); // false
```
Groups are `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.
This can be the case if we use the `getGroupWithReference()` method,
which returns a `placeholder` Group if the Group we are looking for doesn't exist yet.
```ts
const myGroup = useAgile(MY_COLLECTION.getGroupWithReference("group1")); // Causes rerender if Group got created
const myGroup2 = useAgile(MY_COLLECTION.getGroup("group2")); // Doesn't causes rerender if Group got created
```
This reference is essential to rerender the Component,
whenever the Group got instantiated.

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | false       | No       |


## 🟦 Typescript

The `Group Class` is almost 100% typesafe.