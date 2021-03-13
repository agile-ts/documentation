---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/collection/methods
---

:::info

Here are useful methods of the `Collection Class` listed.

:::

## `setKey()`

Use `setKey()` to assign a new key/name to a Collection.
```ts {1}
MY_COLLECTION.setKey("newKey");
MY_COLLECTION.key; // Returns 'newKey'
```

### ❓ Why a Key
We recommended giving each Collection a unique Key.
I promise you, it has only advantages.  <br/>
Some of them are listed below:
- helps us during debug sessions
- makes it easier to identify the Collection
- no need for separate persist Key

### 📭 Props

| Prop           | Type                             | Default    | Description                                           | Required |
|----------------|----------------------------------|------------|-------------------------------------------------------|----------|
| `value`        | string \| number \| undefined    | undefined  | New Key/Name of Collection                            | Yes      |

### 📄 Return
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `Group()`

With `Group()` we create a new [Group](./group/Introduction.md) **without binding** it to the Collection.
This function is intended to be used in the Collection `config`,
where the `constructor()` takes care of the binding.
```ts {3}
App.createCollection((collection) => ({
    groups: {
        myGroup: collection.Group(["item1", "item2"])
    }
}));
```
The object key will be used as `groupKey`,
if we don't pass a separate key into the Group `config`.
```ts {3,9}
App.createCollection((collection) => ({
    groups: {
        myGroup: collection.Group(["item1", "item2"], {key: "myCoolGroup"}) // Key === "myCoolGroup"
    }
}));

App.createCollection((collection) => ({
    groups: {
        myGroup: collection.Group(["item1", "item2"]) // Key === "myGroup"
    }
}));
```
For creating Groups in general (outside the `Collection Config`) we strongly recommend using the [`createGroup()`](#creategroup) method,
since it directly binds the Group to the Collection, without further thinking.
```ts
MY_COLLECTION.createGroup('myGroup', ['item1', 'item2']);
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `initialItems` | Array<string \| number>                                                   | []         | Initial ItemKeys of the Group                         | No       |
| `config`       | [GroupConfig](../../../../Interfaces.md#groupconfig)                      | {}         | Configuration                                         | No       |

### 📄 Return
Returns a fresh [Group](./group/Introduction.md).



<br />

---

<br />



## `Selector()`

With `Selector()` we create a new [Selector](./selector/Introduction.md) **without binding** it to the Collection.
This function is intended to be used in the Collection `Config`,
where the `constructor()` takes care of the binding.
```ts {3}
App.createCollection((collection) => ({
    selectors: {
        mySelector: collection.Selector("item1")
    }
}));
```
The object key will be used as `selectorKey`,
if we don't pass separate key into the Selector `config`.
```ts {3,9}
App.createCollection((collection) => ({
    selectors: {
        mySelector: collection.Selector("item1", {key: "myCoolSelector"}) // Key === "myCoolSelector"
    }
}));

App.createCollection((collection) => ({
    selectors: {
        mySelector: collection.Selector("item1") // Key === "mySelector"
    }
}));
```
For creating Selectors in general (outside the `Collection Config`) we strongly recommend using the [`createSelector()`](#createselector) method,
since it directly binds the Selector to the Collection, without further thinking.
```ts
MY_COLLECTION.createSelector('mySelector', 'toSelectKey');
```


### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `initialKey`   | string \| number                                                          | undefined  | Key of Item which the Selector represents             | No       |
| `config`       | [SelectorConfig](../../../../Interfaces.md#selectorconfig)                | {}         | Configuration                                         | No       |

### 📄 Return
Returns a fresh [Selector](./selector/Introduction.md).



<br />

---

<br />

## `initSelectors()`

:::warning

**No public function!** (only public for testing purpose) <br/>
`initSelectors()` creates in the Collection `config` defined Selectors if necessary 
and binds them to the Collection.

:::



<br />

---

<br />



## `initGroups()`

:::warning

**No public function!** (only public for testing purpose) <br/>
`initGroups()` creates in the Collection `config` defined Groups if necessary
and binds them to the Collection. It also takes care creating the `default` Group, 
which is like an interface to all collected data.


:::



<br />

---

<br />



## `collect()`

We use the `collect()` method to add object shaped data to the Collection.
Be aware, that each data needs one `primaryKey` to be properly identified later.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Collect one Data
```
In the above example, the `primaryKey` property is `id`,
so _'1'_ will be the unique identifier (`primaryKey`) of the collected data.
We can change the `primary Key` property in the Collection `config`.
```ts
App.createCollection({
    primaryKey: "key" // default 'id'
}); 
```
In case we collect a data object with an already existing `primary Key`,
the existing data will be overwritten by the new data.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Collect one Data
MY_COLLECTION.collect({id: 1, name: "benno"}); // Overwrites already collected Data
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: "benno"}'
```
We can also collect multiple data objects at once.
```ts
MY_COLLECTION.collect([{id: 9, name: "hans"}, {id: 22, name: "frank"}]);
```
Each collected Data will be transformed to an extension of the `State Class` called [`Item`](./Introduction.md/#-item).
All Items are directly stored in teh Collection.
```ts
{
    1: Item(1) // has value '{id: 1, name: "benno"}'
    9: Item(9)  // has value '{id: 9, name: "hans"}'
    22: Item(22) // has value '{id: 22, name: "frank"}'
}
```
Besides the data, the `collect()` methods takes an array of `groupKeys`.
So the keys of Groups, to which the collected Data will be added.
[Groups](./group/Introduction.md) are used to preserve the ordering of structured data
and are like an interface to the actual Collection Data.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}, ["group1", "group2"]);
```
If we pass a key which belongs to a not existing Group, 
the `collect()` method will take care of the creation.
For instance if we assume that the Group with the `groupKey` _'group1'_ doesn't exist yet.
Then a Group with the initial `itemKeys` '[1]', 
and the `groupKey` _'group1'_ will be created by the Collection.
```ts
// Groups of Collection
{
    group1: Group("group1"), // value [1] 
    group2: Group("group2"), // value [1]
    default: Group("default") // value [1, 9, 22]
}
```
By default, each collected Data will be added to the `default` Group.
As a conclusion we can draw that the `default` Group represents all [Items](./Introduction.md#-item) of the Collection.
But don't forget, that each Item is stored in the Collection itself and Groups are just possible interface to the stored Items.

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `data`         | DataType \| Array<DataType\> (DataType = Object)                          | []         | Data which gets added to the Collection               | No       |
| `groupKeys`    | Array<string \| number\>                                                  | []         | Keys of Groups to which the Data gets added           | No       |
| `config`       | [CollectConfig](../../../../Interfaces.md#collectconfig)                  | {}         | Configuration                                         | No       |

### 📄 Return

Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `update()`

You can use the `update()` method to update data at a specific `primaryKey`.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "hans"});
MY_COLLECTION.update(1, {name: "frank"}); // New Value of Item at 1 is (see below)
// {id: 1, name: "frank"}
```
As first parameter `update()` takes the `primaryKey` of the data we want to update.
Then we can define the update data object which has to be passed as second parameter. 
By default, the update data object will be merged into the found data at top level.
Unfortunately we don't support deep merges yet.
```ts
MY_COLLECTION.collect({id: 1, data: {name: "jeff"}});
MY_COLLECTION.update(1, {name: "frank"}); // new value is (see below)
// {id: 1, data: {name: "jeff"}, name: "frank"}
```
During the merge new properties might get added to the already collected data, 
although they might not fit into the typescript interface defined before.
In case this is no desired behavior set `addNewProperties` to `false` in the configuration object,
which can be passed as the third parameter.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.update(1, {name: "hans", age: 12}, {patch: {addNewProperties: false}}); // Item at '1' has value '{name: "hans"}'
MY_COLLECTION.update(1, {name: "frank", age: 10}); // Item at '1' has value '{name: "frank", age: 10}'
```
If you want to overwrite the whole Item data, set `patch` to `false`. 
But don't forget to define the `primaryKey` in the update data object too,
since the whole data will be overwritten.
```ts
MY_COLLECTION.update(1, {id: 1, name: 'hans'}, {patch: false});
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | Primary Key of Item which gets updated                | Yes      |
| `changes`      | object                                                                    | {}         | Data which gets merged into the current Item Value    | Yes      |
| `config`       | [UpdateConfig](../../../../Interfaces.md#updateconfig)                    | {}         | Configuration                                         | No       |

### 📄 Return

Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `createGroup()`

With `createGroup()` we create a new [Group](./group/Introduction.md), with **automatically binding** it to the Collection.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('myGroup'); 
```
At first, we have to define a unique `key/name` to identify the created Group later.
Such `key` is for instance required to remove or access the Group.
```ts
const MY_GROUP = MY_COLLECTION.getGroup('myGroup');
```
The `itemKeys` which the Group initially represents can be passes as second parameter in array shape.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 3, 7, 9]); 
```
It's not necessary to pass only existing `itemKeys`. But we strongly recommend it.
If a Group can't find an Item to an `itemKey` in the Collection, 
a waring will be printed, and the Item will be skipped in the Group `output`.
Let's assume the Item with the primaryKey '3' doesn't exist.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 3, 7]); 
MY_GROUP.output; // Returns (see below)
/*
[
  {id: 1, name: 'jeff'},
  // No Item(3) value, since it doesn't exist
  {id: 7, name: 'frank'}
]
 */
```
To each not existing Items a reference will be hold. 
This reference allows AgileTs to add the Item to the Group `output` 
and trigger a rerender on all subscribed UI-Components whenever the missing Item get collected.

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |
| `initialItems` | Array<string \| number\>                                                  | []         | Initial ItemKeys of Group                             | No       |

### 📄 Return

Returns a fresh [Group](./group/Introduction.md).



<br />

---

<br />



## `hasGroup()`

With `hasGroup()` we can check if a specific Group exists in the Collection.
```ts {1,3}
MY_COLLECTION.hasGroup('group5'); // Returns false
MY_COLLECTION.createGroup('group6');
MY_COLLECTION.hasGroup('group6'); // Returns true
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

`true` if the Group exists and `false` if the Group doesn't exist.



<br />

---

<br />



## `getGroup()`

`getGroup()` returns the Group at a specific `groupKey`.
```ts 
const MY_GROUP = MY_COLLECTION.getGroup('myGroup');
```
If a Group can't be found it returns `undefined`.

:::info

The `getGroup()` method is perfect to access a Group in our business logic.
But it's not that good to get a Group which should be subscribed to a UI-Component for instance with the `useAgiele()` hook.
The reason is, that it returns `undefined` whenever the Group doesn't exist.
In this case we should use [`getGroupWithReference()`](#getgroupwithreference) instead,
because it returns a reference to the not existing Group. 
Such reference allows AgileTs to rerender the UI-Component, whenever the missing Group gets created.

:::

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

A Group fitting to the passed `groupKey` or `undefined`.



<br />

---

<br />



## `getGroupWithReference()`

`getGroupWithReference()` returns like [`getGroup()`](#getgroup) the Group at a specific `groupKey`.
```ts 
const MY_GROUP = MY_COLLECTION.getGroupWithReference('myGroup');
```
But it differs in one key area, since it doesn't return `undefined` whenever it couldn't find a Group.
If this case occurs it returns a `placeholder` Group to hold a reference to the not existing Group.
Such reference is for instance useful, to reliably subscribe a not existing Group to a UI-Component with the `useAgile()` hook.
```ts
// Doesn't cause rerender, whenever Group gets created and returns undefined
const myGroup = useAgile(MY_COLLECTION.getGroup('myGroup'));

// Does cause rerender, whenever Group gets created and returns an empty array
const myGroupWithReference = useAgile(MY_COLLECTION.getGroupWithReferenece('myGroup'));
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |

### 📄 Return

A Group fitting to the passed `groupKey` or a `placeholder` Group.



<br />

---

<br />



## `removeGroup()`

With `removeGroup()` we can remove a [Group](./group/Introduction.md) at a specific `groupKey`.
```ts 
MY_COLLECTION.removeGroup('myGroup');
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |

### 📄 Return

Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `createSelector()`

With `createSelector()` we create a new [Selector](./selector/Introduction.md), with **automatically binding** it to the Collection.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector('mySelector', 'itemKey'); 
```
At first, we have to define a unique `key/name` to identify the created Selector later.
Such `key` is for instance required to remove or access the Selector.
```ts
const MY_SELECTOR = MY_COLLECTION.getSelector('mySelector');
```
The `itemKey` to the Item which the Selector initially represents can be passes as second parameter.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector('currentUser', 1); 
```

:::info

Often we name the `selectorKey` like the `itemKey` it selects.
If that is the case, we can use the [`select()`](#select) method,
which does the same as `createSelector()` and automatically sets the `selectorKey` to the passes `itemKey`.
```ts
const MY_SELECTOR = MY_COLLECTION.select('itemKey'); 
```

:::

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Selector                                  | Yes      |
| `itemKey`      | number \| string                                                          | undefined  | Key of Item which the Selector represents             | Yes      |

### 📄 Return

Returns a fresh [Selector](./selector/Introduction.md).



<br />

---

<br />



## `select()`

The `select()` method does the same as the `createSelector()` method.
It creates a new [Selector](./selector/Introduction.md), with **automatically binding** it to the Collection.
The key difference is that we don't have to define a specific `selectorKey`.
```ts
const MY_SELECTOR = MY_COLLECTION.select('itemKey'); 
```
As `selectorKey` the passed `itemKey` will be used.
```ts
const MY_SELECTOR = MY_COLLECTION.select('itemKey'); 
MY_SELECOTR.key; // Returns 'itemKey'
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | Key of Item which the Selector represents             | Yes      |

### 📄 Return

Returns a fresh [Selector](./selector/Introduction.md).



<br />

---

<br />



## `hasSelector()`

With `hasSelector()` we can check if a specific Selector exists in the Collection.
```ts {1,3}
MY_COLLECTION.hasSelector('selector4'); // Returns false
MY_COLLECTION.createSelector('selector8', 'itemKey');
MY_COLLECTION.hasSelector('selector8'); // Returns true
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `selectorKey`  | number \| string                                                          | undefined  | Key/Name of Selector                                  | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

`true` if the Selector exists and `false` if the Selector doesn't exist.



<br />

---

<br />



## `getSelector()`

`getSelector()` returns the Selector at a specific `selectorKey`.
```ts 
const MY_SELECTOR = MY_COLLECTION.getSelector('mySelector');
```
If a Selector can't be found it returns `undefined`.

:::info

The `getSelector()` method is perfect to access a Selector in our business logic.
But it's not that good to get a Selector which should be subscribed to a UI-Component for instance with the `useAgiele()` hook.
The reason is, that it returns `undefined` whenever the Selector doesn't exist.
In this case we should use [`getSelectorWithReference()`](#getselectorwithreference) instead,
because it returns a reference to the not existing Selector.
Such reference allows AgileTs to rerender the UI-Component, whenever the missing Selector gets created.

:::

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `selectorKey`  | number \| string                                                          | undefined  | Key/Name of Selector                                  | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

A Selector fitting to the passed `selectorKey` or `undefined`.



<br />

---

<br />



## `getSelectorWithReference()`

`getSelectorWithReference()` returns like [`getSelector()`](#getselector) the Selector at a specific `selectorKey`.
```ts 
const MY_SELECTOR = MY_COLLECTION.getSelectorWithReference('mySelector');
```
But it differs in one key area, since it doesn't return `undefined` whenever it couldn't find a Selector.
If this case occurs it returns a `placeholder` Selector to hold a reference to the not existing Selector.
Such reference is for instance useful, to reliably subscribe a not existing Selector to a UI-Component with the `useAgile()` hook.
```ts
// Doesn't cause rerender, whenever Selector gets created and returns undefined
const mySelector = useAgile(MY_COLLECTION.getSelector('mySelector'));

// Does cause rerender, whenever Selector gets created and returns an empty array
const mySelectorWithReference = useAgile(MY_COLLECTION.getSelectorWithReferenece('mySelector'));
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `selectorKey`  | number \| string                                                          | undefined  | Key/Name of Selector                                  | Yes      |

### 📄 Return

A Selector fitting to the passed `selectorKey` or a `placeholder` Selector.



<br />

---

<br />



## `removeSelector()`

With `removeSelector()` we can remove a [Selector](./selector/Introduction.md) at a specific `selectorKey`.
```ts 
MY_COLLECTION.removeSelector('mySelector');
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `selectorKey`  | number \| string                                                          | undefined  | Key/Name of Selector                                  | Yes      |

### 📄 Return

Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `hasItem()`

With `hasItem()` we can check if a specific Item exists in the Collection.
```ts {1,3}
MY_COLLECTION.hasItem(3); // Returns false
MY_COLLECTION.collect({id: 1, name: 'frank'});
MY_COLLECTION.hasItem(1); // Returns true
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | Key/Name of Item                                      | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

`true` if the Item exists and `false` if the Item doesn't exist.



<br />

---

<br />



## `getItem()`

`getItem()` returns the Item at a specific `itemKey`.
```ts 
const MY_ITEM = MY_COLLECTION.getItem('myItem');
```
If an Item can't be found it returns `undefined`.

:::info

The `getItem()` method is perfect to access an Item in our business logic.
But it's not that good to get an Item which should be subscribed to a UI-Component for instance with the `useAgiele()` hook.
The reason is, that it returns `undefined` whenever the Item doesn't exist.
In this case we should use [`getItemWithReference()`](#getitemwithreference) instead,
because it returns a reference to the not existing Item.
Such reference allows AgileTs to rerender the UI-Component, whenever the missing Item gets created.

:::

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | Key/Name of Item                                      | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

An Item fitting to the passed `itemKey` or `undefined`.



<br />

---

<br />



## `getItemWithReference()`

`getItemWithReference()` returns like [`getItem()`](#getitem) the Item at a specific `itemKey`.
```ts 
const MY_ITEM = MY_COLLECTION.getItemWithReference('myItem');
```
But it differs in one key area, since it doesn't return `undefined` whenever it couldn't find an Item.
If this case occurs it returns a `placeholder` Item to hold a reference to the not existing Item.
Such reference is for instance useful, to reliably subscribe a not existing Item to a UI-Component with the `useAgile()` hook.
```ts
// Doesn't cause rerender, whenever Item gets created and returns undefined
const myItem = useAgile(MY_COLLECTION.getItem('myItem'));

// Does cause rerender, whenever Item gets created and returns an empty array
const myItemWithReference = useAgile(MY_COLLECTION.getItemWithReferenece('myItem'));
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | Key/Name of Item                                      | Yes      |

### 📄 Return

An Item fitting to the passed `itemKey` or a `placeholder` Item.



<br />

---

<br />



## `getAllItems()`

`getAllItems()` returns all [Items](./Introduction.md#-item) of the Collection
```ts {1}
MY_COLLECTION.getAllItems(); // Returns something like (see below)
/*
 [
    Item(1),
    Item(10),
    Item(23)
 ]
 */
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

All Items of the Collection.



<br />

---

<br />



## `getAllItemValues()`

With `getAllItemValues()` we can get all Item `values` of the Collection
```ts {1} 
MY_COLLECTION.getAllItemValues(); // Returns something like (see below)
/*
 [
    {id: 1, name: "frank"},
    {id: 10, name: "hans"},
    {id: 23, name: "jeff"},
 ]
 */
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

All Item `values` of the Collection.



<br />

---

<br />



## `persist()`

With `persist()` we preserve the State Value in the appropriate local storage for the current environment.
No matter if Mobile or Web environment as long as we have configured our [Storage](../storage/Introduction.md) correctly.
```ts
MY_COLLECTION.perist("myPersistKey");
```

### 💻 Web
I guess the most people persisting something on the web, will use the [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp).
Luckily AgileTs has already set up it by default, as long as you haven't disabled it.
```ts {2}
const App = new Agile({
  localStorage: true
})
```
So there is noting to setup here.

### 📱 Mobile
In the mobile environment the Local Storage unfortunately doesn't exist,
so we might use the [Async Storage](https://reactnative.dev/docs/asyncstorage).
The Async Storage isn't configured by default, so we have to do it on our own.
```ts {3-9}
App.registerStorage(
  new Storage({
    key: "AsyncStorage",
    async: true,
    methods: {
      get: AsyncStorage.getItem,
      set: AsyncStorage.setItem,
      remove: AsyncStorage.removeItem,
    },
  }), {default: true}
);
```

### 🔑 Local Storage Key
To persist our Collection,
we have two options to provide the `persist` function the **required** Storage Key.

- **1.** Assign a unique Key to our Collection,
  because if no key was given to the `persist` function,
  it tries to use the Collection Key as Storage Key.
  ```ts {2}
  MY_COLLECTION.key = "myCoolKey";
  MY_STATE.persist(); // Success
  ```
- **2.** Pass the Storage Key directly into the `persist` function.
  ```ts {1}
  MY_COLLECTION.persist("myCoolKey"); // Success
  ```

If AgileTs couldn't find any key, it drops an error and doesn't persist the Collection Value.
```ts {2}
MY_STATE.key = undefined;
MY_STATE.persist(); // Error
```

### 📝 Multiple Storages
If our Application for whatever reason has more than one registered Storages that get actively used.
We can define with help of the `storageKeys` in which Storage the `persist` function stores the Collection Value.
```ts {2}
MY_STATE.persist({
storageKeys: ["myCustomStorage"]
})
```
By default, it gets stored in the `default` Storage.

### 📭 Props

| Prop                 | Type                                                                       | Default    | Description                                                                     | Required |
|----------------------|----------------------------------------------------------------------------|------------|---------------------------------------------------------------------------------|----------|
| `key`                | string \| number                                                           | undefined  | Key/Name of created Persistent (Note: Key required if State has no set Key!)    | No       |
| `config`             | [StatePersistentConfig](../../../../Interfaces.md#statepersistentconfig)   | {}         | Configuration                                                                   | No       |

### 📄 Return
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `onLoad()`

`onLoad()` allows us to register a callback which gets called whenever our [persisted](#persist) Collection Value got loaded into the Collection.
```ts
MY_COLLECTION.onLoad((success) => {
console.log(`Value '${MY_STATE.value}' got loaded into the Collection! Success? ${success}`)
});
```
For instance this might be useful, to show a loading indicator until
the persisted Value got loaded.

### 📭 Props

| Prop                 | Type                                                     | Default    | Description                                                                                   | Required |
|----------------------|----------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `callback`           | (success: boolean) => void                               | undefined  | Callback Function that gets called once, when the Storage Value got loaded into the Collection| Yes      |

### 📄 Return
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `getGroupCount()`

`getGroupCount()` returns how many Groups the Collection has. 
```ts
MY_COLLECTION.getGroupCount(); // Returns 1
```
It should always return a greater number that `1`,
since each Collection has a `default` Group.

### 📄 Return
`number`



<br />

---

<br />



## `getSelectorCount()`

`getSelectorCount()` returns how many Selectors the Collection has.
```ts
MY_COLLECTION.getGroupCount(); // Returns 0
```

### 📄 Return
`number`



<br />

---

<br />



## `reset()`

With the `reset()` method we can reset the Collection.
A reset includes:
- removing all Items 
- resetting each [Group](./group/Introduction.md)
- resetting each [Selector](./selector/Introduction.md)

### 📄 Return
Returns the [Collection](./Introduction.md) it was called on.
