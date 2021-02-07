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
It allows us to cluster together data from a Collection as an array of primaryKeys.
We instantiate a Group with help of an [Collection](../Introduction.md) here called `MY_COLLECTION`.
By doing this the Group gets automatically bound to the Collection it was created from and
has access to its data.
```ts
const MY_GROUP = MY_COLLECTION.createGroup("groupName", [/*initial Items*/]);
```
There is also another a way to instantiate a Group, but we recommend using `.Group()` **only** in the creation Object of a Collection.
```ts {3}
const MY_COLLECTION = new Collection((collection) =>({
    groups: {
        groupName: collection.Group([/*initial Items*/])
    }
}))
```
Because outside the config object, the Group doesn't get automatically bound to the Collection.

In our Collection we are able to create as many Groups as we want, and the Collection won't lose
its redundant behaviour. This is due to the fact, that each Item gets stored in the Collection itself and not in the Group.
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
Because this property doesn't hold the Item Values, it contains the primary Keys the Group represents.
To get the Item Value to each primary Keys, just use the `output` property.
```ts
MY_GROUP.output; // Returns '[{ id: 8, name: 'jeff' }, ...]'
```


### 🔨 Usage
We might use a Group, if we want to have an array of 'Today Todos' from
a Todo Collection or Posts that belong to the logged-in User from the Post Collection.
```ts
USERS.collect(user);
POSTS.collect(user.posts, user.id);
```
Here we have two Collections, one for Users and another for Posts.
We can collect posts specific to a user and group them automatically by the user's id.


### ⛳️ Sandbox
Test the Group yourself, it's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)