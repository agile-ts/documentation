---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/collection/selector/properties
---

:::info

Here are valuable properties of the `Selector Class` listed,
which aren't directly related to the [`State Class`](../../state/Introduction.md).

The Selector is an extension of the [`State Class`](../../state/Introduction.md)
and offers the same methods and properties as a normal State.
These State related methods aren't described in this Section.
To find out more about specific State methods, 
checkout the [State docs](../../state/Introduction.md).

:::

## `item`

The current selected Item.
```ts {6}
const MY_COLLECTION = App.Collection({
   initialData: [{id: 1, name: 'jeff'}, {id: 2, name: 'frank'}, {id: 5, name: 'hans'}]
});

const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.value; // Returns '{id: 1, name: 'jeff'}'
MY_SELECTOR.item; // Returns 'Item(1)'
```

### 📄 Return

```ts
Item
```



<br />

---

<br />



## `itemKey`

The `itemKey` to the current selected Item.
```ts {5}
const MY_COLLECTION = App.Collection({
   initialData: [{id: 1, name: 'jeff'}, {id: 2, name: 'frank'}, {id: 5, name: 'hans'}]
});

const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.itemKey; // Returns '1'
```

### 📄 Return

```ts
string | number
```
