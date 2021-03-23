---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/collection
---

:::warning

WIP docs!

:::

A Collection is a _set_ of Information we need to remember at a later point in time.
It is designed for arrays of `data objects` following the same pattern.
Each of these objects must have a **unique `primaryKey`** to be correctly identified later.
We instantiate a Collection with help of an existing [Agile Instance](../agile-instance/Introduction.md) often called `App`.
By doing so, the Collection is automatically bound to the Agile Instance it was created from.
```ts
const MY_COLLECTION = App.createCollection();
```
After we have successfully instantiated our Collection,
we can start working with it.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Add Item to Collection
MY_COLLECTION.remove(1).everywhere(); // Remove Item from Collection
MY_COLLECTION.persist(); // Persists Collection Value into a Storage
MY_COLLECTION.reset(); // Reset Collection
```
If you want to find out more about the Collection's specific methods, check out the [Methods](./Methods.md) Section.
Most methods we use to modify, mutate and access the Collection are chainable.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}).persist().removeGroup('myGroup').reset();
```


### 🔨 Use case
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
and specify that both todos remain to the `user1` [Group](#groups).
We do that to keep track of which todo relates to which user.
Now that we `cleaned our bathroom`,
we remove the todo related to the id `1` from the Collection and all Groups (-> everywhere).


### ⛳️ Sandbox
Test the Collection yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-collection-uyi9g)
- Vue (coming soon)
- Angular (coming soon)


## 🗂 Collection Classes

A Collection consists of several classes, all of which play an important role.


### 🔹 Item

Each Data Object we add to our Collection (for example, with the `collect()` method)
automatically becomes an `Item` and gets directly stored in a so-called `data` object in the Collection.
```ts
{
  99: Item(99) // has value '{id: 99, name: "frank"}'
  1: Item(1)  // has value '{id: 1, name: "jeff"}'
  2: Item(2) // has value '{id: 2, name: "hans"}'
}
```
It is best not to touch the `data` object at all
and use the functions provided by the Collection to mutate and get access to it instead.
For instance, there are many ways to access our collected Items.

- #### [`getItem()`](./Methods.md#getitem)
  Returns an Item at a specific `primary Key`
  ```ts
   MY_COLLECTION.getItem(/* primary Key */); // Returns Item at the primary Key
  ```

- #### [`getAllItems()`](./Methods.md#getallitems)
  Returns all Items
  ```ts
   MY_COLLECTION.getAllItems(); // Returns '[Item(99), Item(1), Item(2)]'
  ```

- #### [`getAllItemValues()`](./Methods.md#getallitemvalues)
  Returns the values of all Items
  ```ts
   MY_COLLECTION.getAllItemValues(); // Returns (see below)
   /* [
        {id: 99, name: "frank"}, 
        {id: 1, name: "jeff"}, 
        {id: 2, name: "hans"}
      ]
   */
  ```

The most remarkable thing about `Items` is that they are an extension of the `State Class`,
which means they provide the same powerful features.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Collect Data
const myItem = MY_COLLECTION.getItem(1); // Returns Item at primaryKey '1'
myItem.value; // Returns '{id: 1, name: "jeff"}'
myItem.patch({name: "frank"}); // Update property 'name' in Item
myItem.undo(); // Undo latest change
```


### 👨‍👧‍👦 [Group](./group/Introduction.md)

Often applications need to categorize and preserve the ordering of structured data.
In AgileTs, Groups are the cleanest way to do so.
They allow us to cluster together data from a Collection as an array of `primary Keys`.
```ts
const MY_GROUP = MY_COLLECTION.createGroup("groupName", [/* initial Items */]);
```
A Group is an extension of the `State Class` and offers the same powerful features.
```ts
MY_STATE.undo(); // Undo latest change
MY_GROUP.reset(); // Reset Group to its intial Value
MY_STATE.persist(); // Persist Group Value into Storage
```
We access the Group output with help of the `output` property,
since the `value` property is used to hold the `primaryKeys`.
```ts
MY_GROUP.value; // Returns [1, 20, 5]
MY_GROUP.output; // Returns (see below)
/* [
     {id: 1, name: "frank"}, 
     {id: 20, name: "jeff"}, 
     {id: 5, name: "hans"}
    ]
*/
```
For instance, we can use a Group to cluster a Post Collection into User Posts of the logged-in user.
```ts
USERS.collect(user);
POSTS.collect(user.posts, user.id);
```
In the above code snippet, we have two Collections, one for users and another for posts.
We can collect posts specific to a user and group them automatically by the user's id.


### 🔮 [Selector](./selector/Introduction.md)

Sometimes we need access to one specific Item of a Collection in the long term.
Therefore, AgileTs offers the Selector.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector("Selector name",  /* to select primary Key */);
```
A Selector is an extension of the `State Class`,
which represents one specific Item of the Collection until the Item gets deleted, or we select another one.
```ts
const mySelector = MY_COLLECTION.select(1); // Returns extension of the Item at primaryKey '1'
mySelector.patch({name: "frank"}); // Update property 'name' in Item
```
For instance, a Selector finds its use, to select the currently logged-in user from a User Collection.
```ts
const CURRENT_USER = USERS.select(/* current logged-in userId */);
```


## 📭 Props

```ts
App.createCollection(config);
```

### `config`

A `Collection` takes an optional configuration object as its only parameter.
There are two different ways of configuring a Collection. Both have their advantages.

- **1.** The plain _object_ way, which is notorious for its ease of use.
  Here, we configure everything in a specific object. For instance, this makes the creation of Groups pretty straightforward. 
  But on the other hand, it gives us some limitations since we aren't creating and configuring the Groups and Selectors on our own. 
  The Collection takes care of it instead.
     ```ts
     const Collection = App.createCollection({
     key: 'dummyCollection',
     group: ["dummyGroup"]
     })
     ```

- **2.** The _function_ way, where a function, which has the Collection as  first parameter, returns the configuration object. 
  This gives us more freedom in configuring Instances like Groups, 
  since we have access to the Collection and can create them on our own.
     ```ts
     const Collection = App.createCollection((collection) => ({
     key: 'dummyCollection',
     group: {
        dummyGroup: collection.Group(["item1", "item2"])
      }
     }))
     ```

Here is a Typescript Interface of the configuration object for quick reference,
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
There are two different ways of doing so.
The first one is to pass an Array of Group names/keys,
where AgileTs takes care of the Group's creation and names them after the previously passed names.
```ts
const MY_COLLECTION = App.createCollection({
  groups: ["myGroup1", "myGroup2"]
});
```
The way mentioned above has some limitations, since we can't configure the Groups on our own.
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
which gives us much more freedom in configuring them.

<br/>

#### `selectors`
The initial [Selectors](#selectors) of our Collection are defined with this property's help.
As with the `groups` property, there are two different ways of doing so.
The first one is to pass an Array of Selector names/keys,
where AgileTs takes care of the Selector's creation and names them after the previously passed names.
```ts
const MY_COLLECTION = App.createCollection({
  selectors: ["mySelector1", "mySelector2"]
});
```
The way mentioned above has some limitations, since we can't configure the Selectors on our own.
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
which gives us much more freedom in configuring them.

<br/>

#### `key`
The name/key is an optional property that is used to identify a specific Collection.
Such key is pretty useful during debug sessions or if we persist our Collection,
it automatically uses the Collection `key` as persist key.
We recommend giving each Collection a unique `key`, since it has only advantages.
```ts
const MY_COLLECTION = App.createCollection({
  key: "myKey"
});
```

<br/>

#### `primaryKey`
Defines which property's value in collected data will be selected as `primaryKey`.
By default, it is `id`. A `primaryKey` identifies a specific Item, and has to be part of each collected data.
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
Describes the name/key of the default [Group](#group).
The default Group represents all Items of the Collection.
By default, it is `default`.
```ts
const MY_COLLECTION = App.createCollection({
  defaultGroupKey: "allItemsOfCollectionKey"
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

A `Collection` is almost 100% typesafe and takes an optional generic type for type safety 
that has to be followed by each collected data object.
```ts {6}
interface UserInterface {
  id: number,
  name: string
}

const MY_COLLECTION = App.createState<UserInterface>();
MY_COLLECTION.collect({id: "invalidType", animal: "Lion"}); // type Error
MY_COLLECTION.collect({id: 1, name: "hans"}); // Success
```
