---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/collection
---

:::warning

WIP docs!

:::

A Collection holds a set of Information we need to remember at a later point in time.
It is designed for arrays of data objects following the same pattern.
Each of these objects must have a **unique primaryKey** to be properly identified later.
We instantiate a Collection with help of an existing [Agile Instance](../agile-instance/Introduction.md) often called `App`.
By doing so, the Collection is automatically bound to the Agile Instance it was created from.
```ts
const MY_COLLECTION = App.createCollection();
```
After we have successfully instantiated our Collection, 
we can start mutating it.
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

For instance a Collection can be used to remember a flexible array of Todo objects.
```ts
const TODOS = App.createCollection();
TODOS.collect({id: 1, todo: "Clean bathroom"}, ["user1"]);
TODOS.collect({id: 2, todo: "Write Agile docs"},  ["user1"]);
// <- cleand bathroom
TODOS.remove(1).everywhere();
```
In the example above, we create a simple `TODO` Collection. 
After the instantiation, we add two todos to it 
and specify that both todos remain to the `user1` [Group](./group/Introduction.md). 
We do that to keep track which todo relates to which user.
Now that we cleaned our bathroom, 
we remove the todo related to the id `1` from the Collection and all Groups.

### ⛳️ Sandbox
Test the Collection yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)

## 🔹 Item

Each Data Object we add to our Collection (for example, with the `collect` method) 
automatically becomes an Item, stored in our Collection.
We can access each Item with the `getItem()` method and the fitting `primary Key`.
```ts
MY_COLLECTION.getItem(/* primary Key */); // Returns Item at the primary Key
```
The cool thing about Items is that they are an extension of the `State Class`, 
which means they provide the same powerful tools.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Collect Data
const myItem = MY_COLLECTION.getItem(1); // Returns Item at primaryKey '1'
myItem.value; // Returns '{id: 1, name: "jeff"}'
myItem.patch({name: "frank"}); // Update property 'name' in Item
myItem.undo(); // Undo latest change
```

## 👨‍👧‍👦 [Group](./group/Introduction.md)

Often applications need to categorize and preserve the ordering of structured data.
In AgileTs, Groups are the right way to do that. They allow us to
cluster data from a Collection as an array of primary keys.
```ts
MY_COLLECTION.createGroup("groupName", [/*initial Items*/]);
```
We might use a Group if we want to have an array of 'Today Todos' from
a Todo Collection or posts that belong to the current logged-in user from a post Collection.
```ts
USERS.collect(user);
POSTS.collect(user.posts, user.id);
```
Here we have two Collections, one for users and another for posts.
We can collect posts specific to a user and group them automatically by the user's id.

## 🔮 [Selector](./selector/Introduction.md)

Selectors allow us to _select_ one specific Item from a Collection.
```ts
MY_COLLECTION.createSelector("selectorName", /*to select Item Key*/);
```
A Selector is an extension of the State and offers the same powerful tools.
```ts
const mySelector = MY_COLLECTION.createSelector(1); // Returns Item at primaryKey '1'
myItem.patch({name: "frank"}); // Update property 'name' in Item
```
It can be used to select the current logged-in user from a User Collection.
```ts
USERS.select(/* current logged-in userId */);
```

## 📭 Props

```ts
App.createCollection(config);
```

### `config`

A `Collection` takes an optional configuration object as its only property.
There are two different ways to configure a Collection, and both have their own advantages.

- **1.** The plain _object_ way, which is notorious for its ease of use. 
  Everything is configured in a simple object.
  But this gives us some limitation in the creation of Groups and Selectors because  
  we can't create and configure them on our own. The Collection takes care of it
  instead.
     ```ts
     const Collection = App.createCollection({
     key: 'dummyCollection',
     group: ["dummyGroup"]
     })
     ```

- **2.** The _function_ way, which gives us more configuration opportunities.
  The object is returned by a function, which has an Instance of the Collection as its only parameter.
  By approaching the Collection, we are able to create Groups and Selectors on our own. 
  This gives us much more freedom in configuring these Instances.
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

<br/>

#### `groups`
The initial [Groups](#groups) of our Collection are defined with this property's help.
There are two ways of doing this.
The first one is to pass an Array of Group Names.
AgileTs will than take care of the Group's creation and calls them after the previously passed names.
```ts
const MY_COLLECTION = App.createCollection({
    groups: ["myGroup1", "myGroup2"]
});
```
The way mentioned above has some limitations. For instance, we can't define any initial Items.
Luckily there is a second way, where we have access to the Collection itself.
```ts
const MY_COLLECTION = App.createCollection((collection) => ({
     key: 'dummyCollection',
     group: {
        myGroup1: collection.Group(["item1", "item2"]),
        myGroup2: collection.Group(["item5", "item2", "item6"])
      }
     }));
```
With the help of the Collection, we can 'instantiate' the Groups on our own,
which gives us much more freedom configuring these Instances.

<br/>

#### `selectors`
The initial [Selectors](#selectors) of our Collection are defined with this property's help.
As with the `groups` property, there are two ways of doing that.
The first one is to pass an Array of Selector Names.
AgileTs will than take care of the Selector's creation and calls them after the previously passed names.
```ts
const MY_COLLECTION = App.createCollection({
    selectors: ["mySelector1", "mySelector2"]
});
```
The way mentioned above has some limitations. For instance, we can't define the initial selected Item Key.
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
With the help of the Collection, we can 'instantiate' the Selectors on our own,
which gives us much more freedom configuring these Instances.

<br/>

#### `key`
The Key/Name is an optional property that is used to identify our Collection.
Such key is pretty useful during debug sessions or if we persist our Collection,
it automatically uses the `key` as persist key.
We recommend giving each Collection an unique `key`. It has only advantages.
```ts
const MY_COLLECTION = App.createCollection({
    key: "myKey"
});
```

<br/>

#### `primaryKey`
The primaryKey defines which property in the collected data should be used as primaryKey.
By default, it is `id`. A primaryKey identifies a specific Item, and has to be part of each collected data.
```ts
const MY_COLLECTION = App.createCollection({
    primaryKey: "key"
});
MY_COLLECTION.collect({key: 1, name: "hans"});
//                      ^
//                      |
// primary Key ----------
```

<br/>

#### `defaultGroupKey`
The defaultGroupKey describes the name/key of the default Group.
The default Group represents all Items of the Collection.
By default, its is `default`.
```ts
const MY_COLLECTION = App.createCollection({
    defaultGroupKey: "allItemsOfCollection"
});
```

<br/>

#### `initialData`
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