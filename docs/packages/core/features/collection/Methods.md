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

Assigns a new Key/Name to our Collection.
```ts {1}
MY_COLLECTION.setKey("newKey");
MY_COLLECTION.key; // Returns 'newKey'
```

### ❓ Why a Key
We recommended giving each Collection a unique Key.
I promise you, it has only advantages.
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

Creates a new Group, **without binding** it to the Collection.
This function is intended to be used in the `Collection Config`,
where the `constructor()` takes care of the binding.
```ts {3}
App.createCollection((collection) => ({
    groups: {
        myGroup: collection.Group(["item1", "item2"])
    }
}));
```
The object key will be used as `groupKey`.
In case we pass a separate key into the Group `config`,
the object key will be ignored.
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
For creating Groups in general we recommend using the [`createGroup()`](#creategroup) method,
because it directly binds the Group to the Collection, without further thinking.
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

Creates a new Selector, **without binding** it to the Collection.
This function is intended to be used in the `Collection Config`,
where the `constructor()` takes care of the binding.
```ts {3}
App.createCollection((collection) => ({
    selectors: {
        mySelector: collection.Selector("item1")
    }
}));
```
The object key will be used as `selectorKey`.
In case we pass a separate key into the Selector `config`,
the object key will be ignored.
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
For creating Selectors in general we recommend using the [`createSelector()`](#createselector) method,
because it directly binds the Selector to the Collection, without further thinking.
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

No public function! Is public because of testing hehe.. It creates the default Selector and binds the Selectors created
in the Collection Config to the Collection.

:::



<br />

---

<br />



## `initGroups()`

:::warning

No public function! Is public because of testing hehe.. It creates the default Group and binds the Groups created in the
Collection Config to the Collection.

:::



<br />

---

<br />



## `collect()`

Add object shaped data to a Collection.
Be aware, that each data needs one `primaryKey` to be properly identified later.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Collect one Data
```
In the above example, the `primaryKey` property is `id`,
so '1' will be the unique identifier (primaryKey) of the collected data.
We can change the `primary Key` property in the `Collection Config`.
```ts
App.createCollection({
    primaryKey: "key" // default 'id'
}); 
```
In case we collected data with an already existing `primary Key`,
the existing data will be overwritten with the new data.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Collect one Data
MY_COLLECTION.collect({id: 1, name: "benno"}); // Overwrites already collected Data
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: "benno"}'
```
We can also collect multiple data objects at once.
```ts
MY_COLLECTION.collect([{id: 9, name: "hans"}, {id: 22, name: "frank"}]);
```
Besides the data, the `collect()` methods takes an array of group keys.
[Groups](./group/Introduction.md) are used to preserve the ordering of structured data
and are like an interface to the actual Collection Data.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}, ["group1", "group2"]);
```
The `collect()` method will take care of crating non-existing Groups.
For instance if we assume that the Group with the `groupKey` _'group1'_ doesn't exist yet.
Then a Group with the initial itemKeys '[1]', 
and the `groupkey` 'group1' will be created by the Collection.
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

Update data at specific `primaryKey`.
```ts {2}
MY_COLLECTION.update(1, {name: "frank"});
```
The first parameter is the `primaryKey`, so the key where the data object to be updated is located.
As second parameter it takes an object that will be merged into the data found at the `primaryKey`.
Be aware that the merge happens at the top level of the objects.
```ts
MY_COLLECTION.collect({id: 1,data: {name: "jeff"}});
MY_COLLECTION.update(1, {name: "frank"}); // new value is (see below)
// {id: 1, data: {name: "jeff"}, name: "frank"}
```
By default, new properties are added to the already collected data, although they might not fit into the typescript interface defined before.
In case you don't want to add new properties, set `addNewProperties` to `false` in the configuration object,
which can be passed as the third parameter.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.update(1, {name: "hans", age: 12}, {addNewProperties: false}); // Item at '1' has value '{name: "hans"}'
MY_COLLECTION.update(1, {name: "frank", age: 10}); // Item at '1' has value '{name: "frank", age: 10}'
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

Creates a new [Group](./group/Introduction.md), with **automatically binding** it to the Collection.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('myGroup'); 
```
As first parameter `createGroup()` takes a `key/name`, to properly identify the created Group.
Such `key` is for instance required to remove or access the Group later.
```ts
const MY_GROUP = MY_COLLECTION.getGroup('myGroup');
```
The initial `itemKeys` can be passed as second parameter in array shape.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 3, 7, 9]); 
```
It's not necessary to pass only existing `itemKeys`. But we strongly recommend it.
If a Group can't find a specific Item in the Collection, 
a waring will be printed, and the Item will be skipped in the Group `output`.
```ts
// Let's assume the Item with the primaryKey '3' doesn't exist
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
A reference is hold to not existing Items, which 
allows AgileTs to immediately add new collected Item to the Group `output` and rerender subscribed UI-Components.

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

Checks if a specific Group at `groupKey` exists.
```ts {1,3}
MY_COLLECTION.hasGroup('group5'); // Returns false
MY_COLLECTION.createGroup('group6');
MY_COLLECTION.hasGroup('group6'); // Returns true
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                      | {}         | Configuration                                         | No       |

### 📄 Return

`boolean`



<br />

---

<br />



## `getGroup()`

Get Group at specific `groupKey`.
```ts 
const MY_GROUP = MY_COLLECTION.getGroup('myGroup');
```

:::info

The problem with `getGroup()`, is that it does return `undefined` if the Group doesn't exist.
This is totally fine, if we don't need to hold a reference to the Group.
But if we do need a reference, for instance to subscribe the Group to a UI-Component with the `useAgile()` hook, 
we should use [`getGroupWithReference()`](#getgroupwithreference) instead.
The reason is, that it returns a `placeholder` Group, which holds reference to the actual Group. 
Such reference is necessary to cause a rerender on subscribed UI-Components, whenever the Group gets created.

:::

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

`undefined` or the `Group` at passed `groupKey`



<br />

---

<br />



## `getGroupWithReference()`

Get Group at specific `groupKey`, or a `placeholder` Group to hold a reference to the not existing Group.
```ts 
const MY_GROUP = MY_COLLECTION.getGroup('myGroup');
```
Such reference might get useful, for instance to subscribe the Group to a UI-Component with the `useAgile()` hook.
```ts
// Doesn't cause rerender, whenever Group gets created and returns undefined
const myGroup = useAgile(MY_COLLECTION.getGroup('myGroup'));

// Does cause rerender, whenever Group gets created and returns an empty array
const myGroupWithReference = useAgile(MY_COLLECTION.getGroupWithReferenece('myGroup'));
```
Such reference is necessary to cause a rerender on subscribed UI-Components, whenever the Group gets created.

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

Removes Group at specific `groupKey`.
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

Creates a new [Selector](./selector/Introduction.md), with **automatically binding** it to the Collection.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector('mySelector', 'itemKey'); 
```
As first parameter `createSelctor()` takes a `key/name`, to properly identify the created Selector.
Such `key` is for instance required to remove or access the Selector later.
```ts
const MY_SELECTOR = MY_COLLECTION.getSelector('mySelector');
```
The Selector takes the to select `itemKey` as second parameter.

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

Creates a new [Selector](./selector/Introduction.md), with **automatically binding** it to the Collection.
```ts
const MY_SELECTOR = MY_COLLECTION.select('itemKey'); 
```
As first parameter `select()` takes the to select `itemKey`.
The `selectorKey` will be the selected `itemKey`.
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
