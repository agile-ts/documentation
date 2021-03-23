---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/collection/selector
---

:::warning

WIP docs!

:::

A Selector is an extension of the `State Class` and can represent one specific, 
selected [Item](../Introduction.md#-item) from a Collection.
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
`undefined` during this period of time, since AgileTs doesn't know the desired Item value.
```ts
MY_SELECTOR.select("notExistingItem");
MY_SELECTOR.value; // Returns 'undefined' until the Item got added to the Collection
```
A Selector is an extension of the `State Class` and offers the same powerful features.
```ts
MY_SELECTOR.undo(); // Undo latest change
MY_STATE.persist(); // Persist Selecotr Value into Storage
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


## 🔨 Use case
We might use the Selector, if we want to select the current logged-in User from a User Collection.
```ts
const CURRENT_USER = USERS.select(/* current logged-in userId */);
```
And if the User logs out, and a new User logs in,
we can simply change the `primaryKey`, the Selector represents. 
```ts
CURRENT_USER.select(/* another userId */);
```


## ⛳️ Sandbox
Test the Selector yourself, it's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)


## 📭 Props

### `itemKey`
TODO

### `config`
TODO


## 🟦 Typescript

The `Selector Class` is almost 100% typesafe.



