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

Creates a new Group, **without binding** it to the Collection,
since we don't exactly know the key of the Group during the creation of the Collection.
This function is intended to be used in the `Collection Config`,
because there the `constructor()` will ensure that the Group gets bound to the Collection.
```ts {3}
App.createCollection((collection) => ({
    groups: {
        myGroup: collection.Group(["item1", "item2"])
    }
}));
```

:::info

For creating Groups in general we recommend using [`createGroup()`](#creategroup), 
because it directly binds the Group to the Collection, without further thinking.

:::

The object key will be used as key/name of the Group.
Incase we pass a separate key into the Group config,
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

Creates a new Selector, without binding it to the Collection,
since we don't exactly know the key of the Selector during the creation of the Collection.
This function is intended to be used in the `Collection Config`, 
because there the `constructor()` will ensure that the Selector gets bound to the Collection.
```ts {3}
App.createCollection((collection) => ({
    selectors: {
        mySelector: collection.Selector("item1")
    }
}));
```

:::info

For creating Selectors in general we recommend using [`createSelector()`](#createselector), because it binds the Selector
properly to the Collection without further thinking.

:::

The object key will be used as key/name of the Selector.
Incase we pass a separate key into the Selector config,
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

For each not existing passed `groupKey`, a new Group will automatically be created. For instance if the _'group1'_ from
the above example doesn't exist, a Group with the initial itemKeys ('[1]'), and the key 'group1' gets created. This
group can be returned later with for example `getGroup`.

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `data`         | DataType \| Array<DataType\> (DataType = Object)                          | []  | Data which gets added to the Collection               | No       |
| `groupKeys`    | Array<string \| number\>                                                          | []         | Keys of Groups to which the Data gets added           | No       |
| `config`       | [CollectConfig](../../../../Interfaces.md#collectconfig)                  | {}         | Configuration                                         | No       |

### 📄 Return

Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />

## `update()`

With this function we can update already collected Data.

```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.update(1, {name: "frank"});
```

Here the primary Key gets useful, which we have defined in the `collect` method before. As the first property `update`
takes the primaryKey and as second property the Data which gets merged into the current Data of the Item. Be aware that
the merge happens at the top level of the objects.

By default, new properties get added to the already collected Data, although they might not fit to the Interface (
Typescript)
defined before. In case you don't want to add new properties to the Item, just set `addNewProperties` to `false` in the
config object.

```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.update(1, {name: "hans", age: 12}, {addNewProperties: false}); // Item at '1' has value '{name: "hans"}'
MY_COLLECTION.update(1, {name: "frank", age: 10}); // Item at '1' has value '{name: "frank", age: 10}'
```

If you don't like the above described way of updating your Item Data, we can also `collect` the Data with an already
existing primaryKey again, and it will overwrite the old one.

```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.collect({id: 2, name: "frank"});
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

Creates a new [Group](./group/Introduction.md), with automatically binding it to the Collection.

```ts
MY_COLLECTION.createGroup('myNewGroup');
```






