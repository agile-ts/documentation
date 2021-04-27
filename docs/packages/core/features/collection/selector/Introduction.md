---
id: introduction
title: Selector
sidebar_label: Introduction
slug: /core/collection/selector
---

A `Selector` represents one specific [Item](../Introduction.md#-item) from a Collection in the long term.
It can be mutated dynamically and remains in sync with the Collection.
We instantiate a Selector with the help of an existing [Collection](../Introduction.md).
By doing so, the Selector is automatically bound to the Collection it was created from
and has access to its data.
A Selector can be created during the creation of a Collection in the configuration object.
```ts {3}
const MY_COLLECTION = new Collection((collection) =>({
    selectors: {
        selectorName: collection.Selector('item1')
    }
}));
```
Or dynamically, after the Collection has been instantiated.
```ts
MY_COLLECTION.createSelector("selectorName", /*to select Item Key*/);
```
We can select not only existing Items. It is also possible to select non-existing Items.
Then the Selector holds a reference to that Item until it is collected (`collect()`).
But don't forget that the `value` of the Selector will be `undefined` during this time period
since AgileTs doesn't know the desired Item value.
```ts
MY_SELECTOR.select("notExistingItem");
MY_SELECTOR.value; // Returns 'undefined' until the Item got added to the Collection
```
A Selector is an extension of the `State Class` and offers the same powerful functionalities.
```ts
MY_SELECTOR.undo(); // Undo latest change
MY_SELECTOR.persist(); // Persist Selector Value into Storage
```
Therefore, we can mutate the Selector with the provided set of State functions,
and the changes are automatically applied to the Collection.
```ts
MY_COLLECTION.collect({id: 1, name: 'hans'});
const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.patch({name: "jeff"});
MY_ITEM.value; // Returns '{id: 1, name: 'jeff'}'
```
Furthermore, we can dynamically change the Item that the Selector represents.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector(1); // Represents Item 1
MY_SELECTOR.select(2); // Represents Item 2
```
If you want to find out more about the Selector's specific methods, check out the [Methods](./Methods.md) Section.
Most methods we use to modify, mutate and access the Selector are chainable.
```ts
MY_SELECTOR.undo().select(1).watch(() => {}).reset().persist().undo();
```


## 🔨 Use case
For instance, we can use a Selector to select the current logged-in User from a User Collection.
```ts
const CURRENT_USER = USERS.select(/* current logged-in userId */);
```
If the currently logged-in user logs out and logs in with another user,
we can easily update the `Item` (User) that the Selector represents.
```ts
CURRENT_USER.select(/* another userId */);
```


## ⛳️ Sandbox
Test the Selector yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-selector-rmrxf)
- Vue (coming soon)
- Angular (coming soon)


## 📭 Props

### `itemKey`
The `itemKey` of the Item the Selector represents.
```ts {2}
MY_COLLECTION.collect({id: 1, name: 'hans'});
const MY_SELECTOR = MY_COLLECTION.select(1);
MY_SELECTOR.value; // Returns '{id: 1, name: 'hans'}'
```

### `config`

Beside the initial `itemKey` a `Selector` takes an optional configuration object.
```ts
MY_COLLECTION.createSelector(1, {
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
MY_COLLECTION.createSelector(1, {
    key: "myKey"
});
```
We recommend giving each Selector a unique `key` since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Selector
- no need for separate persist Key

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | No       |

<br/>

#### `isPlaceholder`

:::warning

This property is mainly thought for internal use.

:::

Defines whether the Selector is a `placeholder`.
```ts
const MY_SELECTOR = App.creaateSelector(1, {
    isPlaceholder: true
});

MY_SELECTOR.exists(); // false
```
Selectors are `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.
This can be the case if we use the `getSelectorWithReference()` method,
which returns a `placeholder` Selector if the Selector we are looking for doesn't exist yet.
```ts
const mySeleector = useAgile(MY_COLLECTION.getSelectorWithReference("selector1")); // Causes rerender if Selector got created
const mySeleector2 = useAgile(MY_COLLECTION.getSelector("selector2")); // Doesn't causes rerender if Selector got created
```
This reference is essential to rerender the Component,
whenever the Selector got instantiated.

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | false       | No       |


## 🟦 Typescript

The `Selector Class` is almost 100% typesafe.