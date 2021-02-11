---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core/collection/selector
---

:::warning

WIP docs!

:::

A Selector selects one specific [Item](../Introduction.md#-item) from a Collection.
This selected Item gets than represented by the Selector.
We instantiate a Selector with help of an [Collection](../Introduction.md) here called `MY_COLLECTION`.
By doing so the Selector gets automatically bound to the Collection it was created from 
and has access to its data.
```ts
MY_COLLECTION.createSelector("selectorName", /*to select Item Key*/);
```
There is also another a way to instantiate a Selector, but we recommend using `.Selector()` **only** in the creation Object of a Collection.
```ts {3}
const MY_COLLECTION = new Collection((collection) =>({
    groups: {
        groupName: collection.Group([/*initial Items*/])
    }
}))
```
Because outside the config object, the Selector doesn't get automatically bound to the Collection.

A Selector is also able to select a not existing Item, then it holds
a reference to this Item. But be aware that the Value of the Selector is
`undefined` during this period of time, since AgileTs doesn't know your desired Item.
```ts
MY_SELECTOR.select("notExistingItem");
MY_SELECTOR.value; // Returns 'undefined' until it the Item got added to the Collection
```
A Selector is an extension of the State Class and offers the same powerful features.
```ts
MY_SELECTOR.undo(); // Undo latest change
```
But be aware that by mutating the Selector Value we won't modify the
selected Item in the Collection directly. To do this we unfortunately have to take a small detour and
have to modify the Item directly.
```ts
MY_SELECTOR.item.set({id: 1, name: "jeff"});
```


### 🔨 Usage
We might use the Selector, if we want to select the 'current logged-in User' from our User Collection.
```ts
USERS.select(/* current logged-in userId */);
```


### ⛳️ Sandbox
Test the Selector yourself, it's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- Vue (coming soon)
- Angular (coming soon)



