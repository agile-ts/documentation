---
id: introduction
title: Collection
sidebar_label: Introduction
slug: /core/collection
---

A `Collection` provides a reactive _set_ of Information that we need to remember globally at a later point in time.
While providing a toolkit to use and mutate this _set_ of Information.
It is designed for arrays of `data objects` following the same pattern.
Each of these objects must have a **unique `primaryKey`** to be correctly identified later.
We instantiate a Collection with help of an existing [Agile Instance](../agile-instance/Introduction.md) often called `App`.
By doing so, the Collection is automatically bound to the Agile Instance it was created from.
```ts
const MY_COLLECTION = App.createCollection();
```
After a successful instantiation, we can dynamically and easily manipulate its value.
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


### 👾 Advantages over Array State
- reactive
- each `Item` is an actual reactive [State](../state/Introduction.md)
- efficient persisting in any Storage 
- neat api (`undo()`, `reset()`, `patch()`)
- categorize data with help of [Groups](#-groupgroupintroductionmd)
- select specific Item with help of [Selector](#-selectorselectorintroductionmd)



### 🔨 Use case
For instance a Collection can be used to remember a flexible array of Todo objects.
```ts
const TODOS = App.createCollection();
TODOS.collect({id: 1, todo: "Clean bathroom"}, ["user1"]);
TODOS.collect({id: 2, todo: "Write Agile docs"},  ["user1"]);
// <- cleaned bathroom
TODOS.remove(1).everywhere();
```
In the example above, we create a simple `TODO` Collection.
After the instantiation, we add two todos to it
and specify that both todos remain to the `user1` [Group](#-groupgroupintroductionmd).
We do that to keep track of which todo relates to which user.
Now that we `cleaned our bathroom`,
we remove the todo related to the id `1` from the Collection and all Groups (-> everywhere).


### ⛳️ Sandbox
Test the Collection yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-collection-uyi9g)
- Vue (coming soon)
- Angular (coming soon)


## 🗂 Collection Classes

A Collection consists of several classes, all of which play an essential role.


### 🔹 Item

Each Data Object we add to our Collection (for example, with the `collect()` method)
automatically becomes an `Item` and is directly stored in a so-called `data` object.
```ts title="data object"
{
  99: Item(99) // has value '{id: 99, name: "frank"}'
  1: Item(1)  // has value '{id: 1, name: "jeff"}'
  2: Item(2) // has value '{id: 2, name: "hans"}'
}
```
It is best not to touch the `data` object at all
and use the functions provided by the Collection to mutate and get access to it instead.
The most remarkable thing about `Items` is that they are an extension of the `State Class`,
which means they provide the same powerful functionalities.
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
By default, each collected data object will be added to the `default` Group, representing the default Collection pattern.
Keep in mind, that a Group doesn't store the Item itself. It only holds an array of primaryKeys like a keymap of the data it represents.
```ts
MY_COLLECTION.getGroup('default').output; // Returns '[{id: 1, name: 'jeff'}]'
// Returns the same as:
MY_COLLECTION.getAllItemValues(); // Returns '[{id: 1, name: 'jeff'}]'
```
A Group is an extension of the `State Class` and offers the same powerful functionalities.
```ts
MY_STATE.undo(); // Undo latest change
MY_GROUP.reset(); // Reset Group to its intial Value
MY_STATE.persist(); // Persist Group Value into Storage
```
But be aware, that we access the Group output with help of the `output` property,
since the `value` property is used to store the `primaryKeys` the Group represents.
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
For instance, we can use a Group to cluster a Post Collection into 'User Posts' of the different users.
```ts
USERS.collect([userA, userB]); // Add userA, userB to USERS Collection
POSTS.collect(userA.posts, userA.id); // Add userA Posts and cluster it by the UserA id
POSTS.collect(userB.posts, userB.id); // Add userB Posts and cluster it by the UserB id
POSTS.getGroup(userA.id).value; // Returns '[1, 2, 6]' (UserA Posts)
POSTS.getGroup(userB.id).value; // Returns '[3, 10, 20]' (UserB Posts)
POSTS.getGroup('default').value; // Returns '[1, 2, 3, 4, 5, 6, 10, ..]' (All Posts)
```
In the above code snippet, we have two Collections, one for users and another for posts.
We can collect posts specific to a user and automatically group them by the user's id.


### 🔮 [Selector](./selector/Introduction.md)

Sometimes we need access to one specific `Item` of a Collection in the long term.
Therefore, AgileTs offers the Selector, which allows us to select one specific Item from the Collection.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector(/* to select primary Key */);
```
A Selector is an extension of the `State Class` and offers the same powerful functionalities.
```ts
MY_SELECTOR.patch({name: "frank"}); // Update property 'name' in Item
```
For instance, a Selector finds its use, to select the currently logged-in user of a User Collection.
```ts
const CURRENT_USER = USERS.select(/* current logged-in userId */);
```
If the currently logged-in user logs out and logs in with another user,
we can easily update the `Item` (User) that the Selector represents.
```ts
CURRENT_USER.select(/* new logged-in userId */);
```


## 📭 Props

```ts
App.createCollection(config);
```

### `config`

A `Collection` takes an optional configuration object as its only parameter.
There are two different ways of configuring a Collection. Both have their advantages.

- **1.** The plain _object_ way, which is notorious for its ease of use.
  Here, we configure everything in a specific object. For instance, this makes the creation of Instances like Groups pretty straightforward.
  But on the other hand, it gives us some limitations, since we aren't creating and configuring the Groups and Selectors on our own.
  The Collection takes care of it instead.
     ```ts
     App.createCollection({
       key: 'dummyCollection',
       group: ["dummyGroup"]
     })
     ```

- **2.** The _function_ way, where a function, which has the Collection as the first parameter, returns the configuration object.
  This gives us more freedom in configuring Instances like Groups,
  because we have access to the Collection and can create them on our own.
     ```ts
     App.createCollection((collection) => ({
       key: 'dummyCollection',
       group: {
          dummyGroup: collection.Group(["item1", "item2"])
        }
     }))
     ```

Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
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
Our Collection's initial [Groups](#-groupgroupintroductionmd) are defined with this property's help.
There are two different ways of doing so.
The first one is to pass an Array of Group keys/names,
where AgileTs takes care of the Group's creation and names them according to the passed keys.
```ts
App.createCollection({
  groups: ["myGroup1", "myGroup2"]
});
```
The way mentioned above has some limitations, since we can't configure the Groups ourselves.
Fortunately, there is a second way where we have access to the Collection itself,
and can define and configure the Groups on our own.
```ts
App.createCollection((collection) => ({
  key: 'dummyCollection',
  group: {
    myGroup1: collection.Group(["item1", "item2"], {/* some configuration */}),
    myGroup2: collection.Group(["item5", "item2", "item6"])
  }
}));
```

| Type                                                 | Default     | Required |
|------------------------------------------------------|-------------|----------|
| `{ [key: string]: Group<DataType> }  \| string[]`    | {}          | No       |

<br/>

#### `selectors`
Our Collection's initial [Selectors](#-selectorselectorintroductionmd) are defined with this property's help.
As with the `groups` property, there are two different ways of doing so.
The first one is to pass an Array of Selector keys/names,
where AgileTs takes care of the Selector's creation and names them according to the passed keys.
```ts
App.createCollection({
  selectors: ["mySelector1", "mySelector2"]
});
```
The way mentioned above has some limitations, since we can't configure the Selectors ourselves.
Fortunately, there is a second way where we have access to the Collection itself,
and can define and configure the Selectors on our own.
```ts
App.createCollection((collection) => ({
  key: 'dummyCollection',
  selectors: {
    mySelector1: collection.Selector("item1", {/* some configuration */}),
    mySelector2: collection.Selector("item3")
  }
}));
```

| Type                                                 | Default     | Required |
|------------------------------------------------------|-------------|----------|
| `{ [key: string]: Selector<DataType> }  \| string[]` | {}          | No       |

<br/>

#### `key`
The optional property `key/name` should be a unique `string/number` to identify the Collection later.
```ts
App.createCollection({
  key: "myKey"
});
```
We recommend giving each Collection a unique `key`, since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Collection
- no need for separate persist Key

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | No       |

<br/>

#### `primaryKey`
Defines which property's value in collected data is selected as `primaryKey`.
By default, it is `id`. A `primaryKey` identifies a specific Item and has to be part of each collected data.
```ts
const MY_COLLECTION = App.createCollection({
  primaryKey: "key"
});
MY_COLLECTION.collect({key: 1, name: "hans"});
//                      ^
//                      |
// primary Key ----------
```

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | 'id'        | No       |

<br/>

#### `defaultGroupKey`
Describes the `key/name` of the default [Group](#-groupgroupintroductionmd).
By default, it is `default`.
```ts
App.createCollection({
  defaultGroupKey: "allItemsOfCollectionKey"
});
```
The default Group represents all Items of the Collection.

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | 'default'   | No       |

<br/>

#### `initialData`
Here we can set the initial Data of our Collection.
```ts
App.createCollection({
  initialData: [{id: 1, name: "hans"}, {id: 2, name: "frank"}]
});
```

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `Array<DataType>`  | []          | No       |


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