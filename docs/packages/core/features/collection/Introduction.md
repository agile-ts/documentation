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
We instantiate a Collection with help of an existing [Agile Instance](../agile-instance/Introduction.md) here called `App`.
By doing so the Collection gets automatically bound to the Agile Instance it was created from.
```ts
const MY_COLLECTION = App.createCollection();
```
We can also use the plain `Collection Class` class, 
but we must also specify the `Agile Instance` to which the Collection belongs.
```ts
const MY_COLLECTION = new Collection(App);
```
Both instantiations lead to the same result, but we recommend using the former one.
After we have successfully created our first Collection, we can start using its powerful features.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Add Item to Collection
MY_COLLECTION.remove(1).everywhere(); // Remove Item from Collection
MY_COLLECTION.persist(); // Persists Collection Value into a Storage
```
Most methods we use to modify, mutate and access the Collection are chainable.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}).persist().removeGroup('myGroup').reset();
```

### 🔨 Usage

We might use a Collection, if we need a flexible array of Todo Objects.
```ts
const TODOS = App.createCollection();
TODOS.collect({id: 1, todo: "Clean bathroom"}, ["user1", "todayTodos"]);
TODOS.collect({id: 2, todo: "Write Agile docs"},  ["user1"]);
// <- cleand bathroom
TODOS.remove(1).everywhere();
```
Here we create a `TODO` Collection and add two todos to it, which both get stored in the `user1` [Group](./group/Introduction.md).
Beside the `user1` Group the todo with the id 1 gets also stored in the `todayTodos` Group.
After we have successfully cleaned our bathroom, we remove the todo related to the id 1.

### ⛳️ Sandbox
Test the Collection yourself, it's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)

## 🔹 Item

Each Data Object we add to our Collection, for example with the `collect` method,
gets transformed to an Item. This Item than gets stored in our Collection.
We can simply access each Item with the `getItem` method and the fitting `primary Key`.
```ts
MY_COLLECTION.getItem(/* primary Key */); // Returns Item at the primary Key
```
The cool thing about Items is, they are an extension of the `State Class`.
That means that we have the same powerful tools like a State here too.
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

## 🔮 [Selector](./selector/Introduction.md)

Selectors allow us to _select_ one specific Item from our Collection.
```ts
MY_COLLECTION.createSelector("selectorName", /*to select Item Key*/);
```
We might use the Selector, if we want to select the 'current logged-in User' from our User Collection.
```ts
USERS.select(/* current logged-in userId */);
```

## 📭 Props

Our `Collection` takes, an optional configuration object as its only property.
There are two different ways to configure our Collection with these object.

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
     gives us much more freedom in configuring these Instances.
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

### `groups`
Here we define the initial [Groups](#groups) of our Collection.
There are two ways of doing this.
The first one is to pass an Array of Group Names.
AgileTs will than take care of the creation for us.
```ts
const MY_COLLECTION = App.createCollection({
    groups: ["myGroup1", "myGroup2"]
});
```
The above mentioned way has some limitation, for instance we can't define any initial Items.
Luckily there is a second way, where we have access to the Collection which gets created.
```ts
const MY_COLLECTION = App.createCollection((collection) => ({
     key: 'dummyCollection',
     group: {
        myGroup1: collection.Group(["item1", "item2"]),
        myGroup2: collection.Group(["item5", "item2", "item6"])
      }
     }));
```
With help of the Collection, we are able to 'instantiate' the Groups on our own,
which gives us much more freedom configuring these.

### `selectors`
Here we define the initial [Selectors](#selectors) of our Collection.
As with the `groups` property, there are also 2 ways to define the Selector here.
The first one is to pass an Array of Selector Names.
AgileTs will than take care of the creation for us.
```ts
const MY_COLLECTION = App.createCollection({
    selectors: ["mySelector1", "mySelector2"]
});
```
The above mentioned way has some limitation, for instance we can't define the initial selected Item Key.
Luckily there is a second way, where we have access to the Collection which gets created.
```ts
const MY_COLLECTION = App.createCollection((collection) => ({
     key: 'dummyCollection',
     selectors: {
         mySelector1: collection.Selector("item1"),
         mySelector2: collection.Selector("item3")
      }
     }));
```
With help of the Collection, we are able to 'instantiate' the Selectors on our own,
which gives us much more freedom configuring these.

### `key`
The Key/Name is an optional property, that gets used to identify our Collection.
This is pretty useful during debug sessions or if we persist our Collection,
where it automatically uses the `key` as persist key.
We recommend giving each Collection an unique `key`. It has only advantages.
```ts
const MY_COLLECTION = App.createCollection({
    key: "myKey"
});
```

### `primaryKey`
The primaryKey is used to define which property in the collected Data gets used as primaryKey.
By default, it is `id`. Each collected Data needs one primaryKey otherwise, we are not able 
to properly identify this Data later.
```ts
const MY_COLLECTION = App.createCollection({
    primaryKey: "key"
});
MY_COLLECTION.collect({key: 1, name: "hans"});
//                      ^
//                      |
// primary Key ----------
```

### `defaultGroupKey`
The defaultGroupKey is used to define the name/key of the default Group.
The default Group represents all Items of the Collection.
By default, what a wonder is it `default`. 
```ts
const MY_COLLECTION = App.createCollection({
    defaultGroupKey: "allItemsOfCollection"
});
```

### `initialData`
The initial Data of our Collection.
```ts
const MY_COLLECTION = App.createCollection({
    initialData: [{id: 1, name: "hans"}, {id: 2, name: "frank"}]
});
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
This type defines the Value Type of the Collection Items.
