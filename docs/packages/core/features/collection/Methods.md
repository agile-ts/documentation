---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/collection/methods
---

:::info

Here are valuable methods of the `Collection Class` listed.

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

```ts
Collection
```
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
For creating Groups in general (outside the `Collection Config`), we strongly recommend using the [`createGroup()`](#creategroup) method
since it directly binds the Group to the Collection without further thinking.
```ts
MY_COLLECTION.createGroup('myGroup', ['item1', 'item2']);
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `initialItems` | Array<string \| number>                                                   | []         | Initial ItemKeys of the Group                         | No       |
| `config`       | [GroupConfig](../../../../Interfaces.md#groupconfig)                      | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Group
```
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
For creating Selectors in general (outside the `Collection Config`), we strongly recommend using the [`createSelector()`](#createselector) method
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

```ts
Selector
```
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

We use the `collect()` method to add object-shaped data to the Collection.
Be aware that each data needs one `primaryKey` to be properly identified later.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}); // Collect one Data
```
In the above example, the `primaryKey` property is `id`,
so '1' will be the unique identifier (`primaryKey`) of the collected data.
We can also collect multiple data objects at once.
```ts
MY_COLLECTION.collect([{id: 9, name: "hans"}, {id: 22, name: "frank"}]);
```
Each collected Data will be transformed to an extension of the `State Class` called [`Item`](./Introduction.md/#-Item).
All Items are directly stored in the Collection.
```ts
{
    1: Item(1) // has value '{id: 1, name: "benno"}'
    9: Item(9)  // has value '{id: 9, name: "hans"}'
    22: Item(22) // has value '{id: 22, name: "frank"}'
}
```

### 👨‍👩‍👧 Add Data to Group
Besides the data, the `collect()` methods can take an array of `groupKeys`.
So the keys of Groups to which the collected data will be added.
[Groups](./group/Introduction.md) are used to preserve the ordering of structured data
and are like an interface to the actual Collection data.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}, ["group1", "group2"]);
```
In case we pass a key that belongs to a not existing Group,
the `collect()` method will take care of the creation.
For instance, if we assume that the Group with the `groupKey` 'group1' doesn't exist yet.
Then a Group with the initial `itemKeys` '[1]',
and the `groupKey` 'group1' will be created by the Collection.
```ts
// Groups of Collection
{
    group1: Group("group1"), // value [1] 
    group2: Group("group2"), // value [1]
    default: Group("default") // value [1, 9, 22]
}
```
By default, each collected Data will be added to the `default` Group.
In conclusion, we can draw that the `default` Group represents all [Items](./Introduction.md#-item) of the Collection.
But don't forget that each Item is stored in the Collection itself, and Groups are just possible interfaces to the stored Items.

### 🌎 Existing primaryKey
In case we collect a data object which contains an already existing `primary Key`,
the new data will overwrite the existing data.
```ts {3}
MY_COLLECTION.collect({id: 1, name: "jeff"}); 
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: "jeff"}'
MY_COLLECTION.collect({id: 1, name: "benno"}); // Overwrites already collected Data
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: "benno"}'
```

### 🔑 Change primaryKey property
If our data object shouldn't be identified by the property `id`,
we can change the `primary Key` property in the Collection `config`.
```ts
App.createCollection({
    primaryKey: "key" // default 'id'
}); 
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `data`         | DataType \| Array<DataType\> (DataType = Object)                          | []         | Data which gets added to the Collection               | No       |
| `groupKeys`    | Array<string \| number\>                                                  | []         | Keys of Groups to which the Data gets added           | No       |
| `config`       | [CollectConfig](../../../../Interfaces.md#collectconfig)                  | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Collection
```
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
As the first parameter `update()` takes the `primaryKey` of the Item it should update.
Then we have to pass the `update data object` as the second parameter.
By default, the `update data object` will be merged into the found Item data at the top-level.

### 🌪 Overwrite Data
If we want to overwrite the whole Item data, we can set `patch` to `false` in the configuration object.
But don't forget to define the `primaryKey` in the `update data object`
since the whole Item, data will be overwritten.
```ts
MY_COLLECTION.update(1, {id: 1, name: 'hans'}, {patch: false});
```

### ❓ Deepmerge
Unfortunately the `update()` function doesn't support `deep merges` yet.
In conclusion, the merge only happens at the top-level of the objects.
If AgileTs can't find a particular property, it will add it at the top-level of the Item data object.
```ts
MY_COLLECTION.collect({id: 1, data: {name: "jeff"}});
MY_COLLECTION.update(1, {name: "frank"}); // new value is (see below)
// {id: 1, data: {name: "jeff"}, name: "frank"}
```
In case we don't want to add not existing properties to the Item data object,
we can set `addNewProperties` to `false` in the configuration object.
```ts {2}
MY_COLLECTION.collect({id: 1, data: {name: "jeff"}});
MY_COLLECTION.update(1, {name: "frank"}, {patch: {addNewProperties: false}}); // new value is (see below)
// {id: 1, data: {name: "jeff"}}
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | Primary Key of Item which gets updated                | Yes      |
| `changes`      | object                                                                    | {}         | Data which gets merged into the current Item Value    | Yes      |
| `config`       | [UpdateConfig](../../../../Interfaces.md#updateconfig)                    | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `createGroup()`

With `createGroup()` we create a new [Group](./group/Introduction.md), with **automatically binding** it to the Collection.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('myGroup'); 
```
First, we have to define a unique `key/name` to identify the created Group later.
Such `key` is, for instance, required to remove or access the Group.
```ts
const MY_GROUP = MY_COLLECTION.getGroup('myGroup');
```
The `itemKeys` which the Group initially represents can be passed as a second parameter in an array shape.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 3, 7, 9]); 
```
It's not necessary to pass only existing `itemKeys`. But we strongly recommend it.
If a Group can't find an Item to an `itemKey` in the Collection,
a warning will be printed, and the Item will be skipped in the Group `output`.
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
To each not existing Items, a reference will be held.
This reference allows AgileTs to add the Item to the Group `output`
and trigger a rerender on all subscribed UI-Components whenever the missing Item gets collected.

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |
| `initialItems` | Array<string \| number\>                                                  | []         | Initial ItemKeys of Group                             | No       |

### 📄 Return

```ts
Group
```
Returns a fresh [Group](./group/Introduction.md).



<br />

---

<br />



## `hasGroup()`

With `hasGroup()`, we can check if a specific Group exists in the Collection.
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

```ts
boolean
```
`true` if the Group exists and `false` if the Group doesn't exist.



<br />

---

<br />



## `getGroup()`

`getGroup()` returns the Group at a specific `groupKey`.
```ts 
const MY_GROUP = MY_COLLECTION.getGroup('myGroup');
```
If it can't find a Group, it returns `undefined`.

:::info

The `getGroup()` method is perfect for accessing a Group in our business logic.
But it's not that good to get a Group that should be subscribed to a UI-Component, for instance, with the `useAgiele()` hook.
The reason is that it returns `undefined` whenever the Group doesn't exist.
In this case, we should use [`getGroupWithReference()`](#getgroupwithreference) instead
because it returns a reference to the not existing Group.
Such reference allows AgileTs to rerender the UI-Component, whenever the missing Group gets created.

:::

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Group | undefined
```
A [Group](./group/Introduction.md) fitting to the passed `groupKey` or `undefined`.



<br />

---

<br />



## `getGroupWithReference()`

`getGroupWithReference()` returns like [`getGroup()`](#getgroup) the Group at a specific `groupKey`.
```ts 
const MY_GROUP = MY_COLLECTION.getGroupWithReference('myGroup');
```
But it differs in one key area since it doesn't return `undefined` whenever it couldn't find a Group.
If this case occurs, it returns a `placeholder` Group to hold a reference to the not existing Group.
For instance, such a reference is helpful to reliably subscribe a not existing Group to a UI-Component with the `useAgile()` hook.
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

```ts
Group
```
A [Group](./group/Introduction.md) fitting to the passed `groupKey` or a `placeholder` Group.



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

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `createSelector()`

With `createSelector()` we create a new [Selector](./selector/Introduction.md), with **automatically binding** it to the Collection.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector('mySelector', 'itemKey'); 
```
First, we have to define a unique `key/name` to identify the created Selector later.
Such `key` is, for instance, required to remove or access the Selector.
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

```ts
Selector
```
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

```ts
Selector
```
Returns a fresh [Selector](./selector/Introduction.md).



<br />

---

<br />



## `hasSelector()`

With `hasSelector()`, we can check if a specific Selector exists in the Collection.
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

```ts
boolean
```
Returns `true` if the Selector exists and `false` if the Selector doesn't exist.



<br />

---

<br />



## `getSelector()`

`getSelector()` returns the Selector at a specific `selectorKey`.
```ts 
const MY_SELECTOR = MY_COLLECTION.getSelector('mySelector');
```
If a Selector can't be found, it returns `undefined`.

:::info

The `getSelector()` method is perfect for accessing a Selector in our business logic.
But it's not that good to get a Selector, which should be subscribed to a UI-Component, for instance, with the `useAgiele()` hook.
The reason is that it returns `undefined` whenever the Selector doesn't exist.
In this case, we should use [`getSelectorWithReference()`](#getselectorwithreference) instead
because it returns a reference to the not existing Selector.
Such reference allows AgileTs to rerender the UI-Component, whenever the missing Selector gets created.

:::

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `selectorKey`  | number \| string                                                          | undefined  | Key/Name of Selector                                  | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Selector | undefined
```
A [Selector](./selector/Introduction.md) fitting to the passed `selectorKey` or `undefined`.



<br />

---

<br />



## `getSelectorWithReference()`

`getSelectorWithReference()` returns like [`getSelector()`](#getselector) the Selector at a specific `selectorKey`.
```ts 
const MY_SELECTOR = MY_COLLECTION.getSelectorWithReference('mySelector');
```
But it differs in one key area since it doesn't return `undefined` whenever it couldn't find a Selector.
If this case occurs, it returns a `placeholder` Selector to reference the not existing Selector.
For instance, such a reference is helpful to reliably subscribe a not existing Selector to a UI-Component with the `useAgile()` hook.
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

```ts
Selector
```
A [Selector](./selector/Introduction.md) fitting to the passed `selectorKey` or a `placeholder` Selector.



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

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `hasItem()`

With `hasItem()`, we can check if a specific Item exists in the Collection.
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

```ts
boolean
```
`true` if the Item exists and `false` if the Item doesn't exist.



<br />

---

<br />



## `getItem()`

`getItem()` returns the Item at a specific `itemKey`.
```ts 
const MY_ITEM = MY_COLLECTION.getItem('myItem');
```
If an Item can't be found, it returns `undefined`.

:::info

The `getItem()` method is perfect for accessing an Item in our business logic.
But it's not that good to get an Item that should be subscribed to a UI-Component, for instance, with the `useAgiele()` hook.
The reason is that it returns `undefined` whenever the Item doesn't exist.
In this case, we should use [`getItemWithReference()`](#getitemwithreference) instead
because it returns a reference to the not existing Item.
Such reference allows AgileTs to rerender the UI-Component, whenever the missing Item gets created.

:::

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | Key/Name of Item                                      | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Item | undefined
```
An [Item](./Introduction.md#-item) fitting to the passed `itemKey` or `undefined`.



<br />

---

<br />



## `getItemWithReference()`

`getItemWithReference()` returns like [`getItem()`](#getitem) the Item at a specific `itemKey`.
```ts 
const MY_ITEM = MY_COLLECTION.getItemWithReference('myItem');
```
But it differs in one key area since it doesn't return `undefined` whenever it couldn't find an Item.
If this case occurs, it returns a `placeholder` Item to reference the not existing Item.
For instance, such a reference is helpful to reliably subscribe a not existing Item to a UI-Component with the `useAgile()` hook.
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

```ts
Item
```
An [Item](./Introduction.md#-item) fitting to the passed `itemKey` or a `placeholder` Item.



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

```ts
Array<Item>
```
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

```ts
Array<DataType> // DataType is by default '{[key: string]: any}'
```
All Item `values` of the Collection.



<br />

---

<br />



## `persist()`

Preserves Collection Value in the appropriate local Storage for the current environment.
No matter if Mobile or Web environment as long as the [Storage](../storage/Introduction.md) Interface is configured correctly.
```ts
MY_COLLECTION.perist("myPersistKey");
```

### 💻 Web
In a web environment it is common to use the [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp) to permanently store a specific value
Luckily AgileTs has already set up the Local Storage by default.
```ts {2}
const App = new Agile({
  localStorage: true
})
```
So we can use the `persist()` method out of the box.

### 📱 Mobile
In a mobile environment the Local Storage doesn't exist,
so we need an alternative like the [Async Storage](https://reactnative.dev/docs/asyncstorage).
The Async Storage isn't setup by default, so we need create a [Storage](../storage/Introduction.md) Interface
and register it to AgileTs on our own.
```ts {3-9}
App.registerStorage(
  App.createStorage({
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
To persist a Collection, we need a `storage key`, which is used to identify the stored value later.
There are two ways to provide such required `storage key` to the `persist()` method.

- **1.** Assign a unique key to the Collection itself.
  Because if no key is given to the `persist()` function,
  it takes the Collection key as `storage key`.
  ```ts {2}
  MY_COLLECTION.key = "myCoolKey";
  MY_COLLECTION.persist(); // Success
  ```
- **2.** Pass the `storage key` directly into the `persist()` function.
  ```ts {1}
  MY_COLLECTION.persist("myCoolKey"); // Success
  ```

If AgileTs couldn't find any key that could be used as a `storage key`,
it throws an error and doesn't persist the Collection value.
```ts {2}
MY_COLLECTION.key = undefined;
MY_COLLECTION.persist(); // Error
```

### 📝 Multiple Storages
Sometimes we may store Collections in different Storages.
For example, Collection A should be stored in Storage B, and Collection B should be stored in Storage A.
Therefore, we can use `storageKeys` to define in which specific Storage the Collection value should be persisted.
```ts {2}
MY_COLLECTION.persist({
  storageKeys: ["myCustomStorage"]
})
```
By `default`, it will be stored in the `default` Storage.


### 📭 Props

| Prop                 | Type                                                                       | Default    | Description                                                                      | Required |
|----------------------|----------------------------------------------------------------------------|------------|----------------------------------------------------------------------------------|----------|
| `key`                | string \| number                                                           | undefined  | Key/Name of created Persistent (Note: Key required if Collection has no set Key!)| No       |
| `config`             | [StatePersistentConfig](../../../../Interfaces.md#statepersistentconfig)   | {}         | Configuration                                                                    | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `onLoad()`

`onLoad()` allows us to register a callback which gets called whenever our [persisted](#persist) Collection value got loaded into the Collection.
```ts
MY_COLLECTION.onLoad((success) => {
console.log(`Value '${MY_COLLECTION.value}' got loaded into the Collection! Success? ${success}`)
});
```
For instance, this might be useful to show a loading indicator until
the persisted value got loaded.

### 📭 Props

| Prop                 | Type                                                     | Default    | Description                                                                                   | Required |
|----------------------|----------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `callback`           | (success: boolean) => void                               | undefined  | Callback Function that gets called once, when the Storage Value got loaded into the Collection| Yes      |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `getGroupCount()`

`getGroupCount()` returns how many Groups the Collection has.
```ts
MY_COLLECTION.createGroup('group1');
MY_COLLECTION.getGroupCount(); // Returns 2
```
It should always return a larger number than `0`,
since each Collection has a `default` Group.

### 📄 Return

```ts
number
```



<br />

---

<br />



## `getSelectorCount()`

`getSelectorCount()` returns how many Selectors the Collection has.
```ts {2}
MY_COLLECTION.select(1);
MY_COLLECTION.getSelectorCount(); // Returns 1
```

### 📄 Return

```ts
number
```



<br />

---

<br />



## `reset()`

With the `reset()` method we can reset the Collection.
A reset includes:
- removing all Items
- resetting each [Group](./group/Introduction.md)
- resetting each [Selector](./selector/Introduction.md)
```ts {4}
const MY_COLLECTION = App.createCollection();
MY_COLLECTION.collect({id: 1, name: 'frank'}); // Collection Data includes Item(1)
MY_COLLECTION.collect({id: 8, name: 'frank'}); // Collection Data includes Item(1) and Item(8)
MY_COLLECTION.reset(); //️ Collection Data is empty
```

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `put()`

With `put()`, we can quickly add specific `itemKeys` to particular Groups.
```ts
MY_COLLECTION.put('itemKey1', 'groupKey1');
```
In the above example, the `itemKey1` will be added to the Group at `groupKey1`.
We can also add multiple `itemKeys` to multiple Groups at once.
```ts
MY_COLLECTION.put(['itemKey1', 'itemKey2', 'itemKey3'], ['groupKey1', 'groupKey2']);
```
Now `itemKey1`, `itemKey2`, `itemKey3` will be added to the Groups at `groupKey1` and `groupKey2`.

### 📭 Props

| Prop                 | Type                                                                  | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKeys`           | number \| string | Array<number \| string \>                          | []         | ItemKey/s that get added to the provided Group/s                                              | Yes      |
| `groupKeys`          | number \| string | Array<number \| string \>                          | []         | Group/s to which the provided ItemKey/s get added                                             | Yes      |
| `config`             | [GroupAddConfigInterface](../../../../Interfaces.md#groupaddconfig)   | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `updateItemKey()`

:::warning

This function is mainly thought for internal use.

:::

With `updateItemKey()`, we can properly change the `itemKey` of an already collected Item.
It takes care of:
- updating `itemKey` in Collection (replacing old itemKey with a new one)
- updating `itemKey` in Groups (replacing old itemKey with a new one)
- updating `itemKey` in Selector (unselecting old itemKey and selecting a new one)

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `oldItemKey`         | number \| string                                                                  | undefined  | Old ItemKey                                                                                   | Yes      |
| `newItemKey`         | number \| string                                                                  | undefined  | New ItemKey                                                                                   | Yes      |
| `config`             | [UpdateItemKeyConfigInterface](../../../../Interfaces.md#updateitemkeyconfig)     | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `getGroupKeysThatHaveItemKey()`

To get all `groupKeys` which include a specific `itemKey` we can use `getGroupKeysThatHaveItemKey()`,
which simply returns an Array of `groupKeys` that contain the specific `itemKey`.
```ts {1,3}
MY_COLLECTION.getGroupKeysThatHaveItemKey('itemKey1'); // Returns '[]'
MY_COLLECTION.createGroup('group1', ['itemKey1', 'itemKey2']);
MY_COLLECTION.getGroupKeysThatHaveItemKey('itemKey1'); // Returns '['group1']'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKey`            | number \| string                                                                  | undefined  | itemKey which gets searched in the Groups of a specific Collection                            | Yes      |

### 📄 Return

Returns an Array of `itemKeys`, and if it couldn't find any `itemKey`, it returns an empty Array.
```ts
Array<number | string>
```



<br />

---

<br />



## `remove()`

With `remove()`, we are able to remove Item/s from

- ### `everywhere()`
  Removes Item/s at `itemKey/s` from the entire Collection and all [Groups](./group/Introduction.md) / [Selectors](./selector/Introduction.md),
  i.e. from everywhere.
  ```ts
  MY_COLLECTION.remove('item1').everywhere();
  ```
  Synonym to [`removeItems()`](#removeitems).

- ### `fromGroups()`
  Removes Item/s at `itemKey/s` only from specific [Groups](./group/Introduction.md).
  ```ts
  MY_COLLECTION.remove('item1').fromGroups(['group1', 'group2']);
  ```
  Synonym to [`removeFromGroups()`](#removefromgroups).

:::info

Note that a standalone `remove()` doesn't do anything,
so we must always add `.everywhere()` or `.fromGroups()`.

:::

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKeys`           | number \| string | Array<number \| string\>                                       | undefined  | itemKey/s that get removed                                                                    | Yes      |

### 📄 Return

```ts
{
    fromGroups: (groups: Array<ItemKey> | ItemKey) => Collection<DataType>;
    everywhere: () => Collection<DataType>;
}
```



<br />

---

<br />



## `removeFromGroups()`

Removes Item at `itemKey` from specific [Group](./group/Introduction.md) at `groupKey`.
```ts
MY_COLLECTION.removeFromGroups('item1', 'group1');
```
It is also possible to remove multiple Items from multiple Groups at once.
```ts
MY_COLLECTION.removeFromGroups(['item1', 'item2'], ['group1', 'group5']);
```
In the above example, the Items at `item1` and `item2` will be removed from the Groups at `group1` and `group5`.

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKeys`           | number \| string | Array<number \| string\>                                       | undefined  | itemKey/s of Items that that get removed from Group/s                                         | Yes      |
| `groupKeys`           | number \| string | Array<number \| string\>                                      | undefined  | groupKey/s of Group/s from which the Item/s will be removed                                   | Yes      |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `removeItems()`

Removes Item at `itemKey` from the entire Collection and all [Groups](./group/Introduction.md) / [Selectors](./selector/Introduction.md)
```ts
MY_COLLECTION.removeItems('item1');
```
It is also possible to remove multiple Items at once.
```ts
MY_COLLECTION.removeItems(['item1', 'item2']);
```

### ⚠️ Remove includes?

- remove Item/s from the entire Collection
- remove Item/s from all Groups
- remove Item/s from all Selectors
- remove Item value/s from Storage

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKeys`           | number \| string | Array<number \| string\>                                       | undefined  | itemKey/s of Item/s that get removed                                                          | Yes      |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `setData()`

:::warning

**No public function!** (only public for testing purpose) <br/>
`setData()` applies newly set data (for instance from the [`collect()`](#collect) method) to the Collection.

:::



<br />

---

<br />



## `rebuildGroupsThatIncludeItemKey()`

:::warning

This function is mainly thought for internal use.

:::

Rebuilds all [Groups](./group/Introduction.md) that include the provided `itemKey`.
```ts
MY_COLLECTION.rebuildGroupsThatIncludeItemKey('item1');
```
Such rebuild does recompute the `output` of the Group.
```ts
// group value '[1, 2, 3]'
// group output '[{id: 1, name: 'jeff'}, {id: 3, name: 'hans'}]'

// Item gets added to Collection -> Collection rebuilds all Groups that include the 'itemKey'
MY_COLLECTION.collect({id: 2, name: 'jeff'});
// Exectues internally: 'MY_COLLECTION.rebuildGroupsThatIncludeItemKey(2)'

// group output '[{id: 1, name: 'jeff'}, {id: 2, name: 'jeff'}, {id: 3, name: 'hans'}]'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKey`            | number \| string                                                                  | undefined  | itemKey                                                                                       | Yes      |
| `config`             | RebuildGroupsThatIncludeItemKeyConfigInterface                                    | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.