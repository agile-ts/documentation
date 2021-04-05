---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/agile-instance/methods
---

:::info

Here are valuable methods of the `Agile Instance` listed.

:::


## `createState()`

Creates a new [State](../state/Introduction.md),
which is automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts
const State = App.createState('jeff', {
    key: 'dummyState',
})
```

### 📭 Props

| Prop           | Type                                                                       | Default   | Description                                           | Required |
|----------------|----------------------------------------------------------------------------|-----------|-------------------------------------------------------|----------|
| `initialValue` | ValueType = any                                                            | undefined | Initial Value of State                                | Yes      |
| `config`       | [StateConfigInterface](../state/Introduction.md#-props)                    | {}        | Configuration                                         | No       |

### 📄 Return

```ts
State
```
Returns a fresh [State](../state/Introduction.md).



<br />

---

<br />



## `createCollection()`

Creates a new [Collection](../collection/Introduction.md),
which is automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts {1-4,8-13}
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
| `config`     | [CollectionConfig](../collection/Introduction.md#-props)               | {}        | Configuration                                         | No       |


### 📄 Return

```ts
Collection
```
Returns a fresh [Collection](../collection/Introduction.md).



<br />

---

<br />



## `createComputed()`

Creates a new [Computed](../computed/Introduction.md),
which is automatically bound to the [Agile Instance](../agile-instance/Introduction.md) it was created from.
```ts {1,5-7}
const Computed = App.createComputed(() => {/* Computed Method */}, [/* hard coded deps */])

// or

const ComputedWithConfig = App.createComputed(() => {/* Computed Method */}, {
    key: 'dummyComputed',
}, [/* hard coded deps */])
```

### 📭 Props

| Prop              | Type                                                              | Default   | Description                                        | Required |
|-------------------|-------------------------------------------------------------------|-----------|----------------------------------------------------|----------|
| `computeFunction` | () =>  ComputedValueType                                          | undefined | Function that recomputes the value of the Computed | Yes      |
| `config`          | [ComputedConfigInterface](../computed/Introduction.md#-props)     | {}        | Configuration                                      | No       |
| `deps`            | Array<Observer \| State \| Event \| Group\>                       | []        | Dependencies of Computed                           | No       |

### 📄 Return

```ts
Computed
```
Returns a fresh [Computed](../computed/Introduction.md).



<br />

---

<br />



## `integrate()`

Integrates Framework [Integration](../integration/Introduction.md) into AgileTs.
An Integration simply tells AgileTs, howto mutates a particular Component
whenever a State changes. To bind States to Components and thus be reactive,
any Framework using AgileTs needs an Integration for AgileTs.
For example, to use AgileTs in a [React](https://reactjs.org/) environment,
we have to register a React Integration to AgileTs.
```ts
App.integrate(reactIntegration);
```

### 📭 Props

| Prop            | Type                                                              | Default   | Description                                                 | Required |
|-----------------|-------------------------------------------------------------------|-----------|-------------------------------------------------------------|----------|
| `integration`   | [Integration](../integration/Introduction.md)                     | undefined | Integration that gets registered/integrated into AgileTs    | Yes      |

### 📄 Return

```ts
Agile
```
Returns the [Agile Instance](./Introduction.md) it was called from



<br />

---

<br />



## `hasIntegration()`

Checks if AgileTs has any registered [Integration](../integration/Introduction.md).

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `createStorage()`

Creates a new [Storage](../storage/Introduction.md) Interface for AgileTs,
which allows AgileTs to work with the Storage the Interface represents.
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
Such Storage can be registered in AgileTs with the [registerStorage()](#registerstorage) method.
After a successful registration we can store/[persist](../state/Methods.md#persist) any State in the Storage.

### 📭 Props

| Prop        | Type                                                                         | Default   | Description                                       | Required |
|-------------|------------------------------------------------------------------------------|-----------|---------------------------------------------------|----------|
| `config`    | [CreateStorageConfigInterface](../storage/Introduction.md#-props)            | {}        | Configuration                                     | Yes      |

### 📄 Return

```ts
Storage
```
Returns a fresh [Storage](../storage/Introduction.md).



<br />

---

<br />



## `registerStorage()`

Registers a new [Storage](../storage/Introduction.md) Interface to AgileTs.
It is used to permanently store persisted Instances ([`.persist()`](../state/Methods.md)) in the Storage that the Interface represents.
The [Local Storage](https://developer.mozilla.org/de/docs/Web/API/Window/localStorage) is registered by default.
Below you can see how the `localStorage` is registered internally.
```ts {13}
// create localStorage Interface with help of the Agile Storage
const _localStorage = App.createStorage({
    key: 'localStorage',
    async: false,
    methods: {
       get: localStorage.getItem.bind(localStorage),
       set: localStorage.setItem.bind(localStorage),
       remove: localStorage.removeItem.bind(localStorage),
    },
});

// Register Storage to current Agile Instance (App)
App.register(_localStorage, { default: true }); 
```

### 📭 Props

| Prop            | Type                                                              | Default   | Description                                                 | Required |
|-----------------|-------------------------------------------------------------------|-----------|-------------------------------------------------------------|----------|
| `integration`   | [Integration](../integration/Introduction.md)                     | undefined | Integration that gets registered/integrated into AgileTs    | Yes      |

### 📄 Return

```ts
Agile
```
Returns the [Agile Instance](./Introduction.md) it was called from



<br />

---

<br />



## `hasStorage()`

Checks if AgileTs has any registered [Storage](../storage/Introduction.md).
If AgileTs couldn't find any Storage, the `.persist()` method can not store any value permanently.

### 📄 Return

```ts
boolean
```