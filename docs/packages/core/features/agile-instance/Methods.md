---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/agile-instance/methods
---

:::info

Here all methods of the `Agile Instance` are described.

:::


## `createStorage`

With `createStorage` we create a new [Storage](../storage/Introduction.md).
To register a newly created Storage to an Agile Instance use the [register](#integrate) function.
```ts
const Storage = App.createStorage({
    key: 'dummyStorage',
    methods: {
        get: (key: string) => {},
        set: (key: string, value: any) => {},
        remove: (key: string) => {}
    }
})
```

### 📭 Props

| Prop        | Type                                                                         | Default   | Description                                       | Required |
|-------------|------------------------------------------------------------------------------|-----------|---------------------------------------------------|----------|
| `key`       | string                                                                       | undefined | Key/Name of Storage                               | Yes      |
| `methods`   | [StorageMethodsInterface](../../../../Interfaces.md#storagemethods)          | {}        | Methods with which the Storage get mutated        | Yes      |

### 📄 Return
Returns a fresh [Storage](../storage/Introduction.md).



<br />

---

<br />



## `createState`

With `createState` we create a new [State](../state/Introduction.md),
which gets automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts
const State = App.createState('jeff', {
    key: 'dummyState',
})
```

### 📭 Props

| Prop           | Type                                                                       | Default   | Description                                           | Required |
|----------------|----------------------------------------------------------------------------|-----------|-------------------------------------------------------|----------|
| `initialValue` | ValueType = any                                                            | undefined | Initial Value of State                                | Yes      |
| `config`       | [StateConfigInterface](../../../../Interfaces.md#stateconfig)              | {}        | Configuration                                         | No       |

### 📄 Return
Returns a fresh [State](../state/Introduction.md).



<br />

---

<br />



## `createCollection`

With `createCollection` we create a new [Collection](../collection/Introduction.md),
which gets automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts
const Collection = App.createCollection({
    key: 'dummyCollection',
   groups: ['myGroup']
})

// or 

const Collection2 = App.createCollection((collection) => ({
   key: 'dummyCollection',
   groups: {
       myGroup: collection.Group(['item1', 'item2'])
   }
}))
```

### 📭 Props

| Prop         | Type                                                                   | Default   | Description                                           | Required |
|--------------|------------------------------------------------------------------------|-----------|-------------------------------------------------------|----------|
| `config`     | [CollectionConfig](../../../../Interfaces.md#collectionconfig)         | {}        | Configuration                                         | No       |


### 📄 Return
Returns a fresh [Collection](../collection/Introduction.md).

<br />

---

<br />

## `createComputed`

With `createComputed` we create a new [Computed](../computed/Introduction.md),
which gets automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts
const Computed = App.createComputed(() => {/* Computed Method */}, [/* hard coded deps */])

// or

const ComputedWithConfig = App.createComputed(() => {/* Computed Method */}, {
   key: 'dummyComputed',
}, [/* hard coded deps */])

```

### 📭 Props

| Prop            | Type                                                              | Default   | Description                                        | Required |
|-----------------|-------------------------------------------------------------------|-----------|----------------------------------------------------|----------|
| computeFunction | () =>  ComputedValueType                                          | undefined | Function that recomputes the value of the Computed | Yes      |
| config          | [StateConfigInterface](../../../../Interfaces.md#stateconfig)     | {}        | Config                                             | No       |
| deps            | Array<Observer \| State \| Event \| Group\>                       | []        | Dependencies of Computed                           | No       |

### 📄 Return
Returns a fresh [Computed](../computed/Introduction.md).

<br />

---

<br />

## `createEvent`

With `createEvent` we create a new [Event](../event/Introduction.md),
which gets automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts
const Event = App.createEvent({
    key: 'dummyEvent',
})
```

### 📭 Props

### 📄 Return
Returns a fresh [Event](../event/Introduction.md).

<br />

---

<br />

## `integrate`

## `registerStorage`

## `hasIntegration`

## `hasStorage`