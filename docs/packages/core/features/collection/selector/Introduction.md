---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/collection/selector
---

A Selector represent one specific, selected [Item](../Introduction.md#-item) from a Collection.
We instantiate a Selector with the help of an existing [Collection](../Introduction.md).
By doing so, the Selector is automatically bound to the Collection it was created from
and has access to its data.
A Selector can be created during the creation of a Collection in the configuration object.
```ts {3}
const MY_COLLECTION = new Collection((collection) =>({
    selectors: {
        selectorName: collection.Selector('item1')
    }
}))
```
Or dynamically, after the Collection has been defined.
```ts
MY_COLLECTION.createSelector("selectorName", /*to select Item Key*/);
```
It is also possible to select a not existing Item. Then the Selector will hold
a reference to this Item until it got collected. Be aware that the `value` of the Selector is
`undefined` during this period since AgileTs doesn't know the desired Item value.
```ts
MY_SELECTOR.select("notExistingItem");
MY_SELECTOR.value; // Returns 'undefined' until the Item got added to the Collection
```
A Selector is an extension of the `State Class` and offers the same powerful features.
```ts
MY_SELECTOR.undo(); // Undo latest change
MY_SELECTOR.persist(); // Persist Selector Value into Storage
```
Mutating the Selector, also automatically mutates the Item in the Collection.
```ts
MY_COLLECTION.collect({id: 1, name: 'hans'});
const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.patch({name: "jeff"});
MY_ITEM.value; // Returns '{id: 1, name: 'jeff'}'
```
Furthermore, we can dynamically change the Item, the Selector represents.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector(1); // Represents Item 1
MY_SELECTOR.select(2); // Represents Item 2
```
If you want to find out more about specific methods of the Selector, checkout the [Methods](./Methods.md) Section.
Most methods we use to modify, mutate and access the Selector are chainable.
```ts
MY_SELECTOR.undo().select(1).watch(() => {}).reset().persist().undo();
```


## 🔨 Use case
We might use the Selector, if we want to select the current logged-in User from a User Collection.
```ts
const CURRENT_USER = USERS.select(/* current logged-in userId */);
```
And if the user logs out and a new user logs in,
we can simply change the `primaryKey`, the Selector represents.
```ts
CURRENT_USER.select(/* another userId */);
```


## ⛳️ Sandbox
Test the Selector yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)


## 📭 Props

### `itemKey`
The `itemKey` of the Item the Selector represents.
```ts {2}
MY_COLLECTION.collect({id: 1, name: 'hans'});
const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.value; // Returns '{id: 1, name: 'hans'}'
```

### `config`

Beside the initial itemKey a `Selector` takes an optional configuration object.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector(1, {
    key: "mySelector",
});
```
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface SelectorConfigInterface {
    key?: SelectorKey;
    isPlaceholder?: boolean;
}
```

<br/>

#### `key`
The optional property `key/name` should be a unique `string/number` to identify the Selector later.
```ts
const MY_GROUP = MY_COLLECTION.createGroup([1, 2, 3], {
    key: "myKey"
});
```
We recommend giving each Selector a unique `key`, since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Collection
- no need for separate persist Key

<br/>

#### `isPlaceholder`

:::warning

This property is mainly thought for internal use.

:::

Defines whether the Selector is an `placeholder` or not.
```ts
const MY_SELECTOR = App.creaateSelector(1, {
    isPlaceholder: true
});

MY_SELECTOR.exists(); // false
```
Selectors are, for example, `placeholder` when AgileTs needs to hold a reference to them,
although they aren't instantiated yet.
This might be the case by using `getSelectorWithReference()`,
which returns a `placeholder` Selector, if the Selector doesn't exist,
to hold a reference to it.
```ts
const mySeleector = useAgile(MY_COLLECTION.getSelectorWithReference("selector1")); // Causes rerender if Selector got created
const mySeleector2 = useAgile(MY_COLLECTION.getSelector("selector2")); // Doesn't Causes rerender if Selector got created
```

This reference is essential to rerender the Component,
whenever the Selector got instantiated.


## 🟦 Typescript

The `Selector Class` is almost 100% typesafe.