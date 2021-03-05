---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/collection/group
---

:::warning

WIP docs!

:::

A Group categorizes and preserves ordering of structured data in a Collection.
They allow us to cluster together data from a Collection as an array of `primary Keys`.
A Group doesn't store the actual Items. It only keeps track of the `primary Keys`
and retrieves the fitting Items from the Collection later when needed.
This makes it extremely easy to organize Collection Data according to our need.
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
Groups are dependent on a [Collection Instance](../Introduction.md), 
and so we have to instantiate them with help of one.
By doing so the Group gets automatically bound to the Collection it was created from
and has access to its data.
On the one hand we can define our Groups in the configuration object of the Collection.
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
Or on the other hand we create them dynamically. This means after the Collection has been defined.
```ts
const MY_GROUP = MY_COLLECTION.createGroup("groupName", [/*initial Items*/]);
```
We can add as many Groups as we want, and the Collection won't lose
its redundant behaviour. This is due to the fact, that each Item is stored in the Collection itself and not in the Group.
You can imagine a Group like an interface to the Collection Data.
```ts
MY_COLLECTION.createGroup("group1", [1, 2, 3]);
MY_COLLECTION.createGroup("group2", [2, 5, 8]);
MY_COLLECTION.createGroup("group5000", [1, 10, 500, 5]);
```
A Group is an extension of the `State Class` and offers the same powerful features.
```ts
MY_STATE.undo(); // Undo latest change
MY_GROUP.reset(); // Reset Group to its intial Value
MY_STATE.persist(); // Persist Group Value into Storage
```
But be aware that the `value` might not be the output you expect.
```ts
MY_GROUP.value; // Returns '[8, 5, 30, 1]'
```
In a Group the `value` property doesn't hold the Item Values, 
it contains the `primary Keys` the Group represents.
To get the Item Value to each `primary Keys`, we use the `output` property.
```ts
MY_GROUP.output; // Returns '[{ id: 8, name: 'jeff' }, ...]'
```

### 🔨 Usage
For instance, we can use a Group to cluster a Post Collection into User Posts of the logged-in user.
```ts
USERS.collect(user);
POSTS.collect(user.posts, user.id);
```
In the above code snippet, we have two Collections, one for users and another for posts. 
We can collect posts specific to a user and group them automatically by the user's id.


### ⛳️ Sandbox
Test the Group yourself, it's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-collection-uyi9g)
- Vue (coming soon)
- Angular (coming soon)
