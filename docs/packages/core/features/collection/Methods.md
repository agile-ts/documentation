---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/collection/methods
---

:::info

Here useful methods of the `State Class` are listed.

:::

## `setKey()`

Assigns a new Key/Name to our Collection.
```ts {1}
MY_COLLECTION.setKey("newKey");
MY_COLLECTION.key; // Returns 'newKey'
```

### ❓ Why a Key
We recommended giving each Collection an unique Key.
I promise you, it has only advantages.
- helps us during debug sessions
- makes it easier to identify a State
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

Creates a new Group, without binding it properly to the Collection.
This function is intended to be used in the `Collection Config`. 
```ts {3}
App.createCollection((collection) => ({
    groups: {
        myGroup: collection.Group(["item1", "item2"])
    }
}))
```
For creating groups in general we recommend using `createGroup`, 
because it binds the Group properly to the Collection.

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

Creates a new Selector, without binding it properly to the Collection.
This function is intended to be used in the `Collection Config`. 
```ts {3}
App.createCollection((collection) => ({
    selectors: {
        mySelector: collection.Selector("item1")
    }
}))
```
For creating selectors in general we recommend using `createSelector`, 
because it binds the Selector properly to the Collection.

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `initialKey`   | string \| number                                                          | undefined  | Key of Item that the Selector represents              | No       |
| `config`       | [SelectorConfig](../../../../Interfaces.md#selectorconfig)                | {}         | Configuration                                         | No       |

### 📄 Return
Returns a fresh [Selector](./selector/Introduction.md).



<br />

---

<br />



## `initSelectors()`

:::warning

No public function! Is public because of testing hehe..

:::



<br />

---

<br />



## `initGroups()`

:::warning

No public function! Is public because of testing hehe..

:::



<br />

---

<br />



## `collect()`

Allows us to collect Data and add it to our Collection.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Collect one Data
MY_COLLECTION.collect([{id: 9, name: "hans"}, {id: 22, name: "frank"}]); // Collect multiple Datas
```
**Each Data needs one `primaryKey` to properly be identified later.** 
In the above example, the `primaryKey` property is _'id'_, but we can change it in the `Collection Config`.
If one Data Object contains a `primaryKey` which already exists, 
the existing Data will be overwritten by default.

To quickly add Data to specific Groups, 
the collect method takes `groupKeys` beside the to collect Data.
A Group is like an interface to the Data of a Collection.
Each collected Data will be added to the _'default'_ Group by default.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}, ["group1", "group2"]);
```
For each not existing passed `groupKey`, a new Group will automatically be created.
For instance if the _'group1'_ from the above example doesn't exist, 
a Group with the initial itemKeys ('[1]'), and the key 'group1' gets created.

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `data`         | DataType \| Array<DataType\> (DataType = Object)                           | undefined  | Data which gets added to the Collection               | No       |
| `groupKeys`    | string \| number                                                          | []         | Keys of Groups to which the Data gets added           | No       |
| `config`       | [CollectConfig](../../../../Interfaces.md#collectconfig)                  | {}         | Configuration                                         | No       |

### 📄 Return
Returns the [Collection](./Introduction.md) it was called on.







