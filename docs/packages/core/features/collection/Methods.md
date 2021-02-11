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
For creating groups in general we recommend using `createGroup`, 
because it binds the Group properly to the collection.
```ts {3}
App.createCollection((collection) => ({
    groups: {
        myGroup: collection.Group(["item1", "item2"])
    }
}))
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `initialItems` | Array<string \| number>                                                   | []         | Initial ItemKeys of the Group                         | No       |
| `config`       | [GroupConfig](../../../../Interfaces.md#groupconfig)                      | {}         | Configuration                                         | No       |

### 📄 Return
Returns a fresh [Group](./groups/Introduction.md).


